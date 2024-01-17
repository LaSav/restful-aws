require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');

const express = require('express');
const sequelize = require('./config/db');

require('./models/userModel');
require('./models/eventModel');
require('./models/userEventsModel');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log(sequelize.models);

sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created!');
});

app.use('/api/events', require('./routes/EventsRoutes'));

app.use(errorHandler);

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
