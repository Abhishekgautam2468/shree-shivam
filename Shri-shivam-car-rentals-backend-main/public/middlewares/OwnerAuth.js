const jwt = require('jsonwebtoken');
const ownerSecret = process.env.OWNER_JWT_SECRET ; // Ensure this is set in your environment variables for security

const authenticateOwnerToken = (req, res, next) => {
  // console.log(req.body.token)
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
    const verified = jwt.verify(token, ownerSecret);
    req.owner = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = authenticateOwnerToken;