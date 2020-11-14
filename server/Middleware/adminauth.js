const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function adminAuth(req, res, next) {
  const user = req.user.id;
  User.findById({ _id: req.user.id })
    .then((doc) => {
      if (doc.role === 0)
        return res.status(501).json({
          error: "user not allwed",
        });
      next();
    })
    .catch((err) => {
      return res.status(500).json({
        error: "catch block",
      });
    });
};
