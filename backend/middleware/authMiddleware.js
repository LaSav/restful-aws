const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  const token = req.cookies.token;
  console.log('req', req);
  console.log(token);

  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('decoded:', decoded);

    // Assign req.user to user from db
    req.user = await User.findByPk(decoded.id, {
      attributes: {
        exclude: ['password'],
      },
    });

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Not authorized' });
  }
};

module.exports = { protect };
