const { errorHandler } = require("./errorHandler.js");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(errorHandler(401, "Please login to your account!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    req.user = user;
    next();
  });
};

module.exports = verifyToken;
