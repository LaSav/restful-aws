const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const Event = require('./eventModel');

const UserEvents = sequelize.define('userEvents', {
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isAttending: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.belongsToMany(Event, { through: UserEvents });
Event.belongsToMany(User, { through: UserEvents });
Event.belongsTo(
  User,
  { as: 'admin', foreignKey: 'adminId' },
  { as: 'attending', foreignKey: 'isAttending' }
);

module.exports = UserEvents;
