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
    body("socialLink.github")
      .optional({ checkFalsy: true })
      .isAlpha()
      .withMessage("Field can only contain letters"),
    body("socialLink.linkedIn")
      .optional({ checkFalsy: true })
      .isAlpha()
      .withMessage("Field can only contain letters"),
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
    body("description")
      .optional({ checkFalsy: true })
      .isAlpha()
      .withMessage("Description can only contain letters"),
  ];
};

const projectEditvalidation = () => {
  return [
    body("name").not().isEmpty().trim().withMessage("Name cannot be empty"),
    body("link").not().isEmpty().trim().withMessage("Link cannot be empty"),
    body("repoLink")
      .optional({ checkFalsy: true })
      .isAlpha()
      .withMessage("RepoLink can only contain letters"),
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
