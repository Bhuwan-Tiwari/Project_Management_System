const { verifyToken } = require("../utils/jwtUtils");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token." });
  }
};

module.exports = authenticate