const express = require('express');
const {
  getEvents,
  getEvent,
  createEvent,
  attendEvent,
  adminUpdateEvent,
  deleteEvent,
  inviteUsersToEvent,
} = require('../controllers/eventsController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getEvents).post(protect, createEvent);

router
  .route('/:id')
  .get(protect, getEvent)
  .put(protect, adminUpdateEvent)
  .delete(protect, deleteEvent);

router.route('/:id/attend').put(protect, attendEvent);
router.route('/:id/invite').put(protect, inviteUsersToEvent);

module.exports = router;
