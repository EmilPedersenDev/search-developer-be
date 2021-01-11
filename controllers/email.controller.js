const nodemailer = require("nodemailer");
const ejs = require("ejs");

exports.sendEmail = (res, options) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let senderName = options.firstname + " " + options.lastname;

  ejs.renderFile(
    __dirname + "/../emailTemplate" + "/email.ejs",
    {
      name: options.developer,
      senderName: senderName,
      message: options.message,
      senderEmail: options.email,
    },
    function (err, data) {
      console.log(__dirname);
      if (err) {
        console.error(err);
      } else {
        let mainOptions = {
          to: options.developerEmail,
          subject: `You have a message from ${senderName}`,
          html: data,
        };

        transporter.sendMail(mainOptions, (err, info) => {
          if (err) {
            res.status(500).send({
              message: err,
            });
          } else {
            res.status(200).send({
              message: info,
            });
          }
        });
      }
    }
  );
};
