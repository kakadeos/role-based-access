const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'PROJECT_LOGIN');
    next();
  } catch (error) {
    res.status(400).json({message: 'Authorization Failed'})
  }

};
