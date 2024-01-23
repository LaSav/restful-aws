const express = require('express');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  adminUpdateEvent,
  deleteEvent,
} = require('../controllers/eventsController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getEvents).post(createEvent);

router.route('/:id').get(getEvent).put(adminUpdateEvent).delete(deleteEvent);

router.route('/:id/attend').put(updateEvent);

module.exports = router;
