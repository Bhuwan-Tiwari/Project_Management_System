const jwt = require("jsonwebtoken");

// Secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
// Generate a JWT token
const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

// Verify a JWT token
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
