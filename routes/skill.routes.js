const db = require("../models");
const Skill = db.skill;
const Op = db.Sequelize.Op;
const { validate, skillsValidation } = require("../middleware/");

const notFoundHandler = (res, err) => {
  res.status(404).send({
    message: err,
  });
};

const errorHandler = (res, err) => {
  res.status(500).send({
    message: err,
  });
};

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/skills", async (req, res) => {
    Skill.findAll()
      .then((skills) => {
        if (!skills) {
          return notFoundHandler(res, "Could not find any skills!");
        }
        return res.status(200).send({
          skills,
        });
      })
      .catch((e) => {
        errorHandler(res, e);
      });
  });

  app.get("/api/skills/search", skillsValidation(), validate, (req, res) => {
    Skill.findAll({
      limit: 5,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        name: { [Op.like]: "%" + req.query.query + "%" },
      },
    })
      .then((skills) => {
        if (skills.length < 1) {
          return notFoundHandler(res, "Skill not found!");
        }

        res.status(200).send({
          skills,
        });
      })
      .catch((e) => {
        errorHandler(res, e);
      });
  });
};
