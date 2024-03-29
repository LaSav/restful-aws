//TODO: RemoveUsersFromEvent, LeaveEvent, check for existing users in inviteUsersToEvent, admin middleware

const Event = require('../models/eventModel');
const User = require('../models/userModel');
const UserEvents = require('../models/userEventsModel');
const { getEventsForUser } = require('../services/userService');

// -- General Functions --

// @desc Get Events
// @route GET /api/events
// @access Private
const getEvents = async (req, res) => {
  const userId = req.user.id;
  try {
    const userEvents = await getEventsForUser(userId);
    res.json(userEvents);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// @desc Get Group
// @route GET /api/events/:id
// @access Private

const getEvent = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findByPk(userId);
    const event = await Event.findByPk(req.params.id);
    const userEvent = await UserEvents.findOne({
      where: { userId: userId, eventId: req.params.id },
    });
    const isMember = await event.hasUser(user);

    if (!user || !event || !isMember) {
      return res.status(404).json({ error: 'User or event not found' });
    }

    if (isMember) {
      const eventUsers = await event.getUsers();
      const admin = await event.getAdmin();
      const attendees = await event.getUsers({
        attributes: ['username'],
        through: { where: { isAttending: true } },
      });

      const eventDetails = {
        id: event.id,
        name: event.name,
        description: event.description,
        deadline: event.deadline,
        totalSpaces: event.totalSpaces,
        availableSpaces: event.availableSpaces,
        admin: admin.username,
        members: eventUsers.map((user) => user.username),
        attendees: attendees.map((user) => user.username),
        isAttending: userEvent.isAttending,
        isAdmin: userEvent.isAdmin,
      };
      res.json(eventDetails);
    } else {
      res.status(401).json({ error: 'You are not a member of this group' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// @desc Create Event
// @route POST /api/events
// @access Private
const createEvent = async (req, res) => {
  const { name, description, deadline, availableSpaces, invitedUsernames } =
    req.body;
  const userId = req.user.id;

  if (!name || !description || !deadline || !availableSpaces) {
    res.status(400).json({ error: 'Please add all fields' });
  }

  try {
    const user = await User.findByPk(userId);
    console.log(user.__proto__);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check deadline hasn't passed
    const today = new Date();
    const eventDeadline = new Date(deadline);
    today.setHours(0, 0, 0, 0);
    eventDeadline.setHours(0, 0, 0, 0);

    if (eventDeadline < today) {
      return res
        .status(400)
        .json({ error: 'Deadline must be greater than or equal to today' });
    }

    // Check available spaces is positive number

    if (Math.sign(availableSpaces) < 1) {
      return res
        .status(400)
        .json({ error: 'Availabile spaces must be greater than 0' });
    }

    // Set total spaces as initial available spaces for reference
    const newEvent = await Event.create({
      name: name,
      description: description,
      deadline: deadline,
      totalSpaces: availableSpaces,
      availableSpaces: availableSpaces,
      adminId: userId,
    });

    // Adds creator of event as admin in userEvents junction table
    await newEvent.addUser(user, {
      through: { isAdmin: true, isAttending: true },
    });

    // Decrease available spaces by 1
    await newEvent.increment('availableSpaces', { by: -1 });

    const invitedUsernamesArray = invitedUsernames.split(',');

    // Adds invited Users from request body to userEvents junction table
    if (invitedUsernamesArray && invitedUsernamesArray.length > 0) {
      const invitedUsers = await User.findAll({
        where: { username: invitedUsernamesArray },
      });
      await newEvent.addUsers(invitedUsers);
    }
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc attend an Event
// @route PUT /api/events/:id/attend
// @access Private
const attendEvent = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findByPk(userId);
    const event = await Event.findByPk(req.params.id);
    const isMember = await event.hasUser(user);

    if (!user || !event || !isMember) {
      return res.status(404).json({ error: 'User or event not found' });
    }
    await UserEvents.update(
      { isAttending: true },
      { where: { userId: user.id, eventId: event.id } }
    );

    if (event.availableSpaces > 0) {
      await event.increment('availableSpaces', { by: -1 });
    } else {
      res.status(400).json({ error: 'This event has been filled.' });
    }

    res.status(201).json({
      message: `You've been marked as attending this event for ${event.deadline}`,
      updatedEvent: {
        id: event.id,
        name: event.name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// @desc Leave an event
// @route DELETE /api/events/:id/leave
// @access Private

const leaveEvent = async (req, res) => {
  const userId = req.user.id;
  try {
    const event = await Event.findByPk(req.params.id);
    const user = await User.findByPk(userId);
    if (!user || !event) {
      return res.status(404).json({ error: 'User or event not found' });
    }
    const result = await UserEvents.destroy({
      where: { EventId: event.id, UserId: userId },
    });
    if (result > 0) {
      res
        .status(200)
        .json({ message: 'User removed from the event successfully.' });
    } else {
      res.status(404).json({ message: 'User was not part of the event.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// -- ADMIN FUNCTIONS --

// @desc Admin Update Event
// @route PUT /api/events/:id
// @access Private
const adminUpdateEvent = async (req, res) => {
  const { name, description, deadline, availableSpaces } = req.body;
  const userId = req.user.id;
  try {
    const user = await User.findByPk(userId);
    const event = await Event.findByPk(req.params.id);
    const admin = await event.getAdmin();

    if (!user || !event) {
      return res.status(404).json({ error: 'User or event not found' });
    }

    if (admin.id === user.id) {
      event.update({
        name: name,
        description: description,
        deadline: deadline,
        availableSpaces: availableSpaces,
      });
      res.status(201).json(event);
    } else {
      return res
        .status(401)
        .json({ error: 'You must be the admin to make these changes' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// @desc Invite a User to an event
// @route PUT /api/events/:id/invite
// @access Private

const inviteUsersToEvent = async (req, res) => {
  const { invitedUsernames } = req.body;
  const userId = req.user.id;
  try {
    const user = await User.findByPk(userId);
    const event = await Event.findByPk(req.params.id);
    const admin = await event.getAdmin();

    if (!user || !event) {
      return res.status(404).json({ error: 'User or event not found' });
    }

    if (admin.id === user.id) {
      if (invitedUsernames && invitedUsernames.length > 0) {
        const invitedUsers = await User.findAll({
          where: { username: invitedUsernames },
        });
        await event.addUsers(invitedUsers);
      }
    }
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// @desc Delete Event
// @route DELETE /api/events/:id
// @access Private
const deleteEvent = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    const event = await Event.findByPk(req.params.id);
    const admin = await event.getAdmin();

    if (!user || !event) {
      return res.status(404).json({ error: 'User or event not found' });
    }

    if (admin.id === user.id) {
      event.destroy();
      res.status(201).json(event.id);
    } else {
      return res
        .status(401)
        .json({ error: 'You must be the admin to make these changes' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  attendEvent,
  leaveEvent,
  inviteUsersToEvent,
  adminUpdateEvent,
  deleteEvent,
};
