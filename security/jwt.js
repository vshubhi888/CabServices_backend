const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization'];
  
  // Expect header: Authorization: Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user; // Attach user info from token payload
    next();
  });
}

module.exports = authenticateToken;