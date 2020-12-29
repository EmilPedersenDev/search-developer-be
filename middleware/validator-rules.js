const { body, query, validationResult, check } = require("express-validator");

const userSigninValidation = () => {
  return [body("email").isEmail(), body("password").isLength({ min: 8 })];
};

const userSignupValidation = () => {
  return [
    body("firstname")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Firstname cannot be empty"),
    body("lastname")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Lastname cannot be empty"),
    body("email").isEmail().withMessage("Not a valid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password needs to contain at least 8 digits"),
  ];
};

const developerEditValidation = () => {
  return [
    body("firstname")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Firstname cannot be empty"),
    body("lastname")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Lastname cannot be empty"),
    body("information")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Information cannot be empty"),
  ];
};

const experienceEditValidation = () => {
  return [
    body("company")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Company cannot be empty"),
    check("date").isISO8601().toDate().withMessage("Date is invalid"),
    body("title").not().isEmpty().trim().withMessage("Title cannot be empty"),
  ];
};

const projectEditvalidation = () => {
  return [
    body("name").not().isEmpty().trim().withMessage("Name cannot be empty"),
    body("link").not().isEmpty().trim().withMessage("Link cannot be empty"),
    body("imgLink")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Image link cannot be empty"),
    body("description")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Description cannot be empty"),
  ];
};

const skillsValidation = () => {
  return [query("query").not().isEmpty()];
};

module.exports = {
  userSigninValidation,
  userSignupValidation,
  developerEditValidation,
  skillsValidation,
  experienceEditValidation,
  projectEditvalidation,
};
