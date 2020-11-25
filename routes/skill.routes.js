const db = require("../models");
const Skill = db.skill;

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
};
