const db = require("../models");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      return res.status(400).send({
        message: "Failed! Email is already in use!",
      });
    }
    next();
  });
};

const verifySignup = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignup;
