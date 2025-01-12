const { verifyToken } = require("../utils/jwtUtils");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = verifyToken(token);
    console.log(decoded);
    req.body.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token." });
  }
};

module.exports = authenticate;
