
const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
    const token = req.cookies.AuthToken;
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, "your-secret-key", (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };
  module.exports = authenticateToken;