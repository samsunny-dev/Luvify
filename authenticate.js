
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT
    req.user = decoded;  // Add the decoded user to the request object
    next();  // Continue to the next middleware/controller
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
