const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// @desc Register new User
// @route POST /api/users
// @access Public

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  try {
    const userExists = await User.findOne({ where: { email: email } });

    if (userExists) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser };
