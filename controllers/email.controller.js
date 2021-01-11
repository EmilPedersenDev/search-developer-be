const nodemailer = require("nodemailer");

let sendEmailPromise = (transporter, message) => {
  return new Promise((res, rej) => {
    transporter.sendMail(message, (err, info) => {
      if (err) {
        rej(err);
      } else {
        res(info);
      }
    });
  });
};

exports.sendEmail = (/* options */) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ecba7517b052f7",
      pass: "48573cf1b2115a",
    },
  });

  let messsage = {
    from: "nissetest@mailinator.com", // sender address
    to: "emiltesting1@mailinator.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  return sendEmailPromise(transporter, messsage)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};
