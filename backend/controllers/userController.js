const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// @desc Register new User
// @route POST /api/users
// @access Public

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: 'Please add all fields' });
  }

  try {
    const userExists = await User.findOne({ where: { email: email } });

    if (userExists) {
      res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id, res),
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user.id, res),
      });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Generate JWT
const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

const logoutUser = async (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
};

module.exports = { registerUser, loginUser, logoutUser };
