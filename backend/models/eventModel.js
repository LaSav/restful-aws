const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Event = sequelize.define('event', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  deadline: {
    type: Sequelize.DATEONLY,
  },
  availableSpaces: {
    type: Sequelize.INTEGER,
  },
  // creatorId: {}
});

module.exports = Event;
