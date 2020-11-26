// const { verifySignup } = require("../middleware");
const db = require("../models");
const User = db.user;
const Skill = db.skill;
const Op = db.Sequelize.Op;
const { addSkill } = require("../controllers/skill.controller");
const { Sequelize } = require("../models");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/users", (req, res) => {
  //   User.findAll({
  //     attributes: { exclude: ["password"] },
  //     include: [
  //       {
  //         model: Skill,
  //         as: "skills",
  //       },
  //     ],
  //   })
  //     .then((users) => {
  //       if (!users) {
  //         return res.status(404).send({
  //           message: "User not found",
  //         });
  //       }
  //       return res.status(200).send({
  //         users,
  //       });
  //     })
  //     .catch((err) => {
  //       return res.status(500).send({
  //         message: err,
  //       });
  //     });
  // });

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
          information: user.information,
          skills: user.skills,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message,
        });
      });
  });

  app.get("/api/users", (req, res) => {
    User.findAll({
      limit: 10,
      subQuery: false,
      where: {
        [Op.or]: [
          db.Sequelize.where(
            Sequelize.fn(
              "concat",
              Sequelize.col("firstname"),
              " ",
              Sequelize.col("lastname")
            ),
            {
              [Op.like]: "%" + req.query.query + "%",
            }
          ),
          {
            "$skills.name$": {
              [Op.like]: "%" + req.query.query + "%",
            },
          },
        ],
      },
      include: [
        {
          model: Skill,
          as: "skills",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
      attributes: { exclude: ["password"] },
    })
      .then((users) => {
        if (users.length < 1) {
          return res.status(404).send({
            message: "No users found!",
          });
        }

        return res.status(200).send({
          users,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({
          message: err,
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
