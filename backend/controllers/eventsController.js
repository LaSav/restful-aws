const Event = require('../models/eventModel');
const User = require('../models/userModel');
const UserEvents = require('../models/userEventsModel');
const { getEventsForUser } = require('../services/userService');

// -- General Functions --

// -- userId will be retrieved from req.user.id in authmiddleware, hardcoding userId from req.body for now. --

// @desc Get Events
// @route GET /api/events
// @access Private
const getEvents = async (req, res) => {
  const { userId } = req.body;

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

const getEvent = (req, res) => {
  // Gets all details of event: current members, attendees, admin information etc.
  res.json({ message: 'Get Event' });
};

// @desc Create Event
// @route POST /api/events
// @access Private
const createEvent = async (req, res) => {
  const {
    name,
    description,
    deadline,
    availableSpaces,
    userId,
    invitedUsernames,
  } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newEvent = await Event.create({
      name: name,
      description: description,
      deadline: deadline,
      availableSpaces: availableSpaces,
      adminId: userId,
    });

    // Adds creator of event as admin in userEvents junction table
    await newEvent.addUser(user, {
      through: { isAdmin: true, isAttending: true },
    });

    // Adds invited Users from body request to userEvents junction table
    if (invitedUsernames && invitedUsernames.length > 0) {
      const invitedUsers = await User.findAll({
        where: { username: invitedUsernames },
      });
      await newEvent.addUsers(invitedUsers);
    }
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Update Event
// @route PUT /api/events/:id/attend
// @access Private
const updateEvent = async (req, res) => {
  const { userId } = req.body;
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
    res.status(201).json(user);
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
  const { name, description, deadline, availableSpaces, userId } = req.body;
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

// @desc Delete Event
// @route DELETE /api/events/:id
// @access Private
const deleteEvent = (req, res) => {
  res.json({ message: 'Delete Event' });
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  adminUpdateEvent,
  deleteEvent,
};
