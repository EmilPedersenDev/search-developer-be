const {
  verifySignup,
  validate,
  userSigninValidation,
  userSignupValidation,
} = require("../middleware");
const { setToken } = require("../controllers/auth.controller");
let bcrypt = require("bcryptjs");

const db = require("../models");
const User = db.user;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    userSignupValidation(),
    validate,
    [verifySignup.checkDuplicateEmail],
    (req, res) => {
      User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      })
        .then(() => {
          res.status(200).send({
            message: "User was created",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    }
  );

  app.post("/api/auth/signin", userSigninValidation(), validate, (req, res) => {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found.",
          });
        }
        let token = setToken(req.body, user);

        res.status(200).send({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          accessToken: token,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  });
};
