const db = require("../models");
const Skill = db.skill;
const Op = db.Sequelize.Op;
const { validate, skillsValidation } = require("../middleware/");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/skills", async (req, res) => {
    const skills = await Skill.findAll();
    if (!skills) {
      return res.status(404).send({
        message: "Could not find any skills!",
      });
    }
    return res.status(200).send({
      skills,
    });
  });

  app.get("/api/skills/search", skillsValidation(), validate, (req, res) => {
    Skill.findAll({
      limit: 10,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        name: { [Op.like]: "%" + req.query.query + "%" },
      },
    })
      .then((skill) => {
        if (!skill) {
          res.status(404).send({
            message: "Skill not found!",
          });
        }

        res.status(200).send({
          skill,
        });
      })
      .catch((e) => {
        res.status(500).send({
          e,
        });
      });
  });
};
