const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log('decoded:', decoded);

        // Get user from the token
        req.user = await User.findByPk(decoded.id, {
          attributes: {
            exclude: ['password'],
          },
        });

        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('Not Authorized');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { protect };
