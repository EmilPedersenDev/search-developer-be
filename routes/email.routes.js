const { sendEmail } = require("../controllers/email.controller");
const { validate, sendEmailValidation } = require("../middleware/");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/email", sendEmailValidation(), validate, (req, res) => {
    sendEmail(res, req.body);
  });
};
