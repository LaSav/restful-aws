const Event = require('../models/eventModel');

// @desc Get Events
// @route GET /api/events
// @access Private
const getEvents = async (req, res) => {};

// @desc Get Group
// @route GET /api/events/:id
// @access Private

const getEvent = (req, res) => {
  res.json({ message: 'Get Event' });
};

// @desc Create Event
// @route POST /api/events
// @access Private
const createEvent = async (req, res) => {
  const { name, description, deadline, availableSpaces, isAdmin } = req.body;
  try {
    const newEvent = await Event.create({
      name: name,
      description: description,
      deadline: deadline,
      availableSpaces: availableSpaces,
      isAdmin: isAdmin,
    });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Update Event
// @route PUT /api/events/:id
// @access Private
const updateEvent = (req, res) => {
  res.json({ message: 'Update Event' });
};

// @desc Delete Event
// @route DELETE /api/events/:id
// @access Private
const deleteEvent = (req, res) => {
  res.json({ message: 'Delete Event' });
};

module.exports = { getEvents, getEvent, createEvent, updateEvent, deleteEvent };
