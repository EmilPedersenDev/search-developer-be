// const { verifySignup } = require("../middleware");
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

  app.get("/api/user/:id", (req, res) => {
    User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found",
          });
        }
        res.status(200).send({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message,
        });
      });
  });
};
