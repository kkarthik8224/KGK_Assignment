const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    console.log(token);
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error });
  }
};
