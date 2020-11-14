const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function Auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(403).json({
      AuthError: "No user logged In",
    });
  }
  try {
    const decode = jwt.verify(token, config.get("jwtSECRET"));
    req.user = decode;
    next();
  } catch {
    res.status(500).json({
      AuthError: "Ooops Session expired ^_*",
    });
  }
};
