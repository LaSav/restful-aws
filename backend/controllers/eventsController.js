const Event = require('../models/eventModel');

// @desc Get Events
// @route GET /api/events
// @access Private
const getEvents = (req, res) => {
  res.json({ message: 'Get Events' });
};

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
  try {
    const newEvent = await Event.create({
      name: 'event 1',
      description: 'this is a description',
      deadline: '2024-02-16',
      availableSpaces: 3,
    });
    res.status(201).json(newEvent);
  } catch {
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
