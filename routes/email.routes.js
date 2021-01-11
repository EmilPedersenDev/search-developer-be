const { sendEmail } = require("../controllers/email.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/email", (req, res) => {
    sendEmail()
      .then((result) => {
        res.status(200).send({
          message: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err,
        });
      });
  });
};
