const Event = require('../models/eventModel');

const getUsersInEvent = async (eventId) => {
  try {
    const event = await Event.findByPk(eventId);

    if (!event) {
      return [];
    }

    const usersInEvent = await event.getUsers();

    return usersInEvent;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

module.exports = { getUsersInEvent };
