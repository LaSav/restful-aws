require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
require('./models/eventModel');

const app = express();

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

app.use('/api/events', require('./routes/EventsRoutes'));

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
