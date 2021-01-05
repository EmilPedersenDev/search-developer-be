// const { verifySignup } = require("../middleware");
const db = require("../models");
const User = db.user;
const Skill = db.skill;
const SocialLink = db.socialLink;
const Op = db.Sequelize.Op;
const { addSkill } = require("../controllers/skill.controller");
const { Sequelize } = require("../models");
const {
  validate,
  userNameValidation,
  userEmailValidation,
  userPasswordValidation,
  authJwt,
} = require("../middleware/");
const {
  updateUserName,
  getUser,
  updateUserEmail,
  updatePassword,
} = require("../controllers/user.controller");

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

  app.get("/api/user/:id", (req, res) => {
    User.findByPk(req.params.id, {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      include: [
        {
          model: Skill,
          as: "skills",
          attributes: ["id", "name"],
        },
        {
          model: SocialLink,
          as: "socialLink",
          attributes: ["id", "github", "linkedIn"],
        },
      ],
    })
      .then((user) => {
        if (!user) {
          return notFoundHandler(res, "User not found");
        }
        res.status(200).send({
          user,
        });
      })
      .catch((err) => {
        errorHandler(res, err);
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
        },
      ],
      attributes: { exclude: ["password"] },
    })
      .then((users) => {
        if (users.length < 1) {
          return notFoundHandler(res, "User not found");
        }

        return res.status(200).send({
          users,
        });
      })
      .catch((err) => {
        errorHandler(res, err);
      });
  });

  app.put(
    "/api/user/:id/name",
    userNameValidation(),
    validate,
    [authJwt.verifyToken],
    (req, res) => {
      const { id } = req.params;

      updateUserName(req.body, id)
        .then(() => {
          getUser(id)
            .then((user) => {
              if (!user) {
                notFoundHandler(res, "User not found");
              }
              res.status(200).send({
                user,
              });
            })
            .catch((err) => {
              errorHandler(res, err);
            });
        })
        .catch((err) => {
          errorHandler(res, err);
        });
    }
  );

  app.put(
    "/api/user/:id/email",
    userEmailValidation(),
    validate,
    [authJwt.verifyToken],
    (req, res) => {
      const { id } = req.params;

      updateUserEmail(req.body, id)
        .then(() => {
          getUser(id)
            .then((user) => {
              if (!user) {
                return notFoundHandler(res, "User not found");
              }
              res.status(200).send({
                user,
              });
            })
            .catch((err) => {
              errorHandler(res, err);
            });
        })
        .catch((err) => {
          errorHandler(res, err);
        });
    }
  );

  app.put(
    "/api/user/:id/password",
    userPasswordValidation(),
    validate,
    [authJwt.verifyToken],
    (req, res) => {
      const { id } = req.params;

      updatePassword(req.body, id)
        .then(() => {
          getUser(id)
            .then((user) => {
              if (!user) {
                return notFoundHandler(res, "User not found");
              }
              res.status(200).send({
                message: "Password Updated",
              });
            })
            .catch((err) => {
              errorHandler(res, err);
            });
        })
        .catch((err) => {
          errorHandler(res, err);
        });
    }
  );
};
