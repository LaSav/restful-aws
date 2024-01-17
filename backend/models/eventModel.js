const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Event = sequelize.define('event', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  deadline: {
    type: DataTypes.DATEONLY,
  },
  availableSpaces: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Event;
