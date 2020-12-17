const config = require("../config/auth.config");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.setToken = (reqBody, user) => {
  let passwordIsValid = bcrypt.compareSync(reqBody.password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({
      acessToken: null,
      message: "Invalid Password",
    });
  }

  let token = jwt.sign({ id: user.id, email: user.email }, config.secret, {
    expiresIn: 86400, // 24 hrs
  });

  return token;
};
