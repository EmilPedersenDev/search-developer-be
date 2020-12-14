// const { verifySignup } = require("../middleware");
const db = require("../models");
const { addSkill, removeSkill } = require("../controllers/skill.controller");
const {
  validate,
  developerEditValidation,
  experienceEditValidation,
  projectEditvalidation,
  authJwt,
} = require("../middleware/");
const {
  updateSocialLink,
  createSocialLink,
} = require("../controllers/socialLink.controller");
const {
  updateUser,
  getUserWithLinks,
  getUserWithSkills,
  getUserWithExperience,
} = require("../controllers/user.controller");
const {
  creatExperience,
  deleteExperience,
  getExperience,
  updateExperience,
} = require("../controllers/experience.controller");

const {
  createProject,
  deleteProject,
  getProject,
} = require("../controllers/project.controller");

const notFoundHandler = (err) => {
  res.status(404).send({
    message: err,
  });
};

const errorHandler = (err) => {
  res.status(500).send({
    message: err,
  });
};

const User = db.user;
const Skill = db.skill;
const SocialLink = db.socialLink;
const Project = db.project;
const Experience = db.experience;
const UserSkills = db.sequelize.models.user_skills;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/developer/:id", (req, res) => {
    User.findByPk(req.params.id, {
      attributes: { exclude: ["password", "createdAt", "updatedAt", "email"] },
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
        {
          model: Project,
          as: "projects",
          attributes: ["id", "name", "link", "repoLink", "description"],
        },
        {
          model: Experience,
          as: "experience",
          attributes: ["id", "company", "title", "date", "description"],
        },
      ],
    })
      .then((developer) => {
        if (!developer) {
          return res.status(404).send({
            message: "Developer not found",
          });
        }
        res.status(200).send({
          developer,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message,
        });
      });
  });

  app.put(
    "/api/developer/:id",
    developerEditValidation(),
    validate,
    [authJwt.verifyToken],
    (req, res) => {
      const { firstname, lastname, information, socialLink, id } = req.body;

      getUserWithLinks(id).then((user) => {
        if (!user) {
          notFoundHandler("User not found!");
        }

        let promises = [];

        promises.push(
          updateUser(
            {
              firstname: firstname,
              lastname: lastname,
              information: information,
            },
            user.id
          )
        );

        if (!user.socialLink && Object.keys(socialLink).length !== 0) {
          promises.push(
            createSocialLink({
              github: socialLink.github,
              linkedIn: socialLink.linkedIn,
              userId: user.id,
            })
          );
        }

        if (user.socialLink && Object.keys(socialLink).length !== 0) {
          promises.push(
            updateSocialLink(
              {
                github: socialLink.github,
                linkedIn: socialLink.linkedIn,
              },
              user.id
            )
          );
        }

        Promise.all(promises)
          .then(() => {
            getUserWithLinks(user.id)
              .then((updatedDeveloper) => {
                if (!updatedDeveloper) {
                  notFoundHandler("UpdatedUser not found!");
                }

                res.status(200).send({
                  updatedDeveloper,
                });
              })
              .catch(errorHandler);
          })
          .catch(errorHandler);
      });

      // await User.update(
      //   {
      //     firstname: firstname,
      //     lastname: lastname,
      //     information: information,
      //   },
      //   {
      //     where: {
      //       id: user.id,
      //     },
      //   }
      // ).catch(errorHandler);

      // User.findByPk(req.params.id, {
      //   attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      //   include: [
      //     {
      //       model: Skill,
      //       as: "skills",
      //       attributes: ["id", "name"],
      //     },
      //   ],
      // })
      //   .then((user) => {
      //     user
      //       .update({
      //         firstname: req.body.firstname,
      //         lastname: req.body.lastname,
      //         information: req.body.information,
      //       })
      //       .then((updatedUser) => {
      //         if (!updatedUser) {
      //           return res.status(404).send({
      //             message: "No user found!",
      //           });
      //         }
      //         // await removeSkill(user.id);

      //         let reqSkills = req.body.skills;

      //         let promises = [];
      //         promises.push(removeSkill(user.id));
      //         promises.push(addSkill(reqSkills, user.id));

      //         Promise.all(promises).then((result) => {
      //           let updatedUserHej = updatedUser;
      //           console.log(result, updatedUserHej);
      //           res.status(200).send({
      //             user,
      //           });
      //         });
      //       });
      //   })
      //   .catch((e) => {
      //     res.status(500).send({
      //       message: e,
      //     });
      //   });
    }
  );

  app.post(`/api/developer/:id/skills`, [authJwt.verifyToken], (req, res) => {
    const { id } = req.params;
    let reqSkills = req.body;

    addSkill(reqSkills, id).then(() => {
      getUserWithSkills(id)
        .then((developer) => {
          if (!developer) {
            res.status(404).send({
              message: "Developer not found",
            });
          }
          res.status(200).send({
            developer,
          });
        })
        .catch((e) => {
          res.status(500).send({
            message: e,
          });
        });
    });
  });

  app.post(
    `/api/developer/:id/experience`,
    experienceEditValidation(),
    validate,
    [authJwt.verifyToken],
    (req, res) => {
      const { id } = req.params;
      const { company, title, date, description } = req.body;

      getUserWithExperience(id).then((developer) => {
        if (!developer) {
          res.status(404).send({
            message: "Developer not found",
          });
        }

        let promises = [];

        promises.push(
          creatExperience({
            company: company,
            title: title,
            date: date,
            description: description,
            userId: developer.id,
          })
        );

        Promise.all(promises)
          .then(() => {
            getUserWithExperience(id)
              .then((updatedDeveloper) => {
                if (!updatedDeveloper) {
                  notFoundHandler("Developer not found!");
                }
                res.status(200).send({
                  updatedDeveloper,
                });
              })
              .catch((err) => {
                errorHandler(err);
              });
          })
          .catch((err) => {
            errorHandler(err);
          });
      });
    }
  );

  app.delete(
    `/api/developer/:userId/experience/:id`,
    [authJwt.verifyToken],
    (req, res) => {
      const { userId, id } = req.params;

      deleteExperience(userId, id)
        .then(() => {
          getExperience(userId)
            .then((updatedExperience) => {
              res.status(200).send({
                updatedExperience,
              });
            })
            .catch((err) => {
              errorHandler(err);
            });
        })
        .catch((err) => {
          errorHandler(err);
        });
    }
  );

  app.post(
    `/api/developer/:id/project`,
    projectEditvalidation(),
    validate,
    [authJwt.verifyToken],
    (req, res) => {
      const { id } = req.params;
      const { name, link, repoLink, description } = req.body;

      createProject({
        name: name,
        link: link,
        repoLink: repoLink,
        description: description,
        userId: id,
      }).then(() => {
        getProject(id).then((project) => {
          res.status(200).send({
            project,
          });
        });
      });
    }
  );

  app.delete(
    `/api/developer/:userId/project/:id`,
    [authJwt.verifyToken],
    (req, res) => {
      const { userId, id } = req.params;

      deleteProject(userId, id)
        .then(() => {
          getProject(userId)
            .then((project) => {
              res.status(200).send({
                project,
              });
            })
            .catch((err) => {
              errorHandler(err);
            });
        })
        .catch((err) => {
          errorHandler(err);
        });
    }
  );
};
