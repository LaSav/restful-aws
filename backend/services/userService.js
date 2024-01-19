const User = require('../models/userModel');

const getEventsForUser = async (userId) => {
  try {
    console.log(userId);
    const user = await User.findByPk(userId);

    if (!user) {
      return [];
    }

    const userEvents = await user.getEvents();

    return userEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

module.exports = { getEventsForUser };
