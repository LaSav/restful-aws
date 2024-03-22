require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const express = require('express');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/db');
const cors = require('cors');

require('./models/userModel');
require('./models/eventModel');
require('./models/userEventsModel');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

console.log(sequelize.models);

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

app.use('/api/events', require('./routes/eventsRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
