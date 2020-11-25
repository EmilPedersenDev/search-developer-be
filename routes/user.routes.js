// const { verifySignup } = require("../middleware");
const db = require("../models");
const User = db.user;
const Skill = db.skill;
const { addSkill } = require("../controllers/skill.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/users", (req, res) => {
    User.findAll({
      include: [
        {
          model: Skill,
          as: "skills",
        },
      ],
    })
      .then((users) => {
        if (!users) {
          return res.status(404).send({
            message: "User not found",
          });
        }
        return res.status(200).send({
          users,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message: err,
        });
      });
  });

  app.get("/api/user/:id", (req, res) => {
    User.findByPk(req.params.id, {
      include: [
        {
          model: Skill,
          as: "skills",
        },
      ],
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found",
          });
        }
        res.status(200).send({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          skills: user.skills,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message,
        });
      });
  });

  app.put("/api/user/:id", (req, res) => {
    User.update(
      { firstname: req.body.firstname, lastname: req.body.lastname },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found!",
        });
      }
      let addSkillPromise = new Promise((res, rej) => {
        res(addSkill(req.body.skillId, req.body.id));
      });

      let updatedUser;

      return addSkillPromise
        .then((result) => {
          updatedUser = result;

          if (!updatedUser) {
            return res.status(403).send({
              message: "Could not update user",
            });
          }

          return res.status(200).send({
            updatedUser,
          });
        })
        .catch((err) => {
          return res.status(500).send({
            message: err,
          });
        });
    });
  });
};
