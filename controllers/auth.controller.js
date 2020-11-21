const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
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
};

exports.signin = (req, res) => {
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
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          acessToken: null,
          message: "Invalid Password",
        });
      }

      let token = jwt.sign({ id: user.id, email: user.email }, config.secret, {
        expiresIn: 86400, // 24 hrs
      });

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
};
