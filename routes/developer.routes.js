// const { verifySignup } = require("../middleware");
const db = require("../models");
const fs = require("fs");
const { addSkill } = require("../controllers/skill.controller");
const {
  validate,
  developerEditValidation,
  experienceEditValidation,
  projectEditvalidation,
  authJwt,
  uploadFile,
} = require("../middleware/");
const {
  updateSocialLink,
  createSocialLink,
} = require("../controllers/socialLink.controller");
const {
  updateUser,
  getUserWithLinks,
  getUserWithSkills,
} = require("../controllers/user.controller");
const {
  creatExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
} = require("../controllers/experience.controller");

const {
  createProject,
  updateProject,
  deleteProject,
  getProject,
} = require("../controllers/project.controller");
const {
  createProfileImage,
  getProfileImage,
  updateProfileImage,
} = require("../controllers/profileImage.controller");

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

const User = db.user;
const Skill = db.skill;
const SocialLink = db.socialLink;
const Project = db.project;
const Experience = db.experience;

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
          attributes: [
            "id",
            "name",
            "link",
            "repoLink",
            "imgLink",
            "description",
          ],
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
          notFoundHandler(res, "Developer not found");
        }
        res.status(200).send({
          developer,
        });
      })
      .catch((err) => {
        errorHandler(res, err);
      });
  });

  app.put(
    "/api/developer/:id",
    developerEditValidation(),
    validate,
    [authJwt.verifyToken],
    (req, res) => {
      const { id } = req.params;
      getUserWithLinks(id).then((user) => {
        if (!user) {
          notFoundHandler(res, "User not found!");
        }

        let promises = [];

        promises.push(updateUser(req.body, user.id));

        if (!user.socialLink && Object.keys(req.body.socialLink).length !== 0) {
          promises.push(createSocialLink(req.body, user.id));
        }

        if (user.socialLink && Object.keys(req.body.socialLink).length !== 0) {
          promises.push(updateSocialLink(req.body, user.id));
        }

        Promise.all(promises)
          .then(() => {
            getUserWithLinks(user.id)
              .then((updatedDeveloper) => {
                if (!updatedDeveloper) {
                  return notFoundHandler(res, "UpdatedUser not found!");
                }

                res.status(200).send({
                  updatedDeveloper,
                });
              })
              .catch((err) => {
                errorHandler(res, err);
              });
          })
          .catch((err) => {
            errorHandler(res, err);
          });
      });
    }
  );

  app.post(`/api/developer/:id/skills`, [authJwt.verifyToken], (req, res) => {
    const { id } = req.params;

    addSkill(req.body, id)
      .then(() => {
        getUserWithSkills(id)
          .then((skills) => {
            res.status(200).send({
              skills,
            });
          })
          .catch((err) => {
            errorHandler(res, err);
          });
      })
      .catch((err) => {
        errorHandler(res, err);
      });
  });

  app.post(
    `/api/developer/:id/experience`,
    experienceEditValidation(),
    validate,
    [authJwt.verifyToken],
    (req, res) => {
      const { id } = req.params;

      creatExperience(req.body, id)
        .then(() => {
          getExperiences(id)
            .then((experiences) => {
              res.status(200).send({
                experiences,
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
    `/api/developer/:id/experience`,
    experienceEditValidation(),
    validate,
    [authJwt.verifyToken],
    (req, res) => {
      const { id } = req.params;

      updateExperience(req.body, id)
        .then(() => {
          getExperiences(id)
            .then((experiences) => {
              if (experiences.length < 1) {
                return notFoundHandler(res, "No experiences found");
              }
              res.status(200).send({
                experiences,
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

  app.delete(
    `/api/developer/:userId/experience/:id`,
    [authJwt.verifyToken],
    (req, res) => {
      const { userId, id } = req.params;

      deleteExperience(userId, id)
        .then(() => {
          getExperiences(userId)
            .then((experiences) => {
              res.status(200).send({
                experiences,
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

  app.post(
    `/api/developer/:id/project`,
    projectEditvalidation(),
    validate,
    [authJwt.verifyToken],
    (req, res) => {
      const { id } = req.params;

      createProject(req.body, id)
        .then(() => {
          getProject(id)
            .then((project) => {
              if (!project) {
                return notFoundHandler(res, "No Projects found");
              }
              res.status(200).send({
                project,
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
    `/api/developer/:id/project`,
    projectEditvalidation(),
    validate,
    [authJwt.verifyToken],
    (req, res) => {
      const { id } = req.params;

      updateProject(req.body, id)
        .then(() => {
          getProject(id)
            .then((project) => {
              if (!project) {
                return notFoundHandler(res, "No Projects found");
              }
              res.status(200).send({
                project,
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

  app.delete(
    `/api/developer/:userId/project/:id`,
    [authJwt.verifyToken],
    (req, res) => {
      const { userId, id } = req.params;

      deleteProject(userId, id)
        .then(() => {
          getProject(userId)
            .then((project) => {
              if (!project) {
                return notFoundHandler(res, "No Projects found");
              }
              res.status(200).send({
                project,
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

  app.post(
    `/api/developer/profile-image/:id`,
    [authJwt.verifyToken],
    uploadFile.single("file"),
    (req, res) => {
      if (!req.file) {
        notFoundHandler(res, "Missing image or file");
      }

      getProfileImage(req.params.id)
        .then((profileImage) => {
          let promises = [];

          if (!profileImage && Object.keys(req.file).length !== 0) {
            promises.push(createProfileImage(req.file, req.params.id));
          }

          if (profileImage && Object.keys(req.file).length !== 0) {
            promises.push(updateProfileImage(req.file, req.params.id));
          }

          Promise.all(promises)
            .then(() => {
              getProfileImage(profileImage.userId)
                .then((file) => {
                  if (!file) {
                    return notFoundHandler(res, "Image not found");
                  }
                  fs.unlink(req.file.path, () => {
                    let imageToBase64 = file.data.toString("base64");
                    res.send({
                      type: file.type,
                      image: imageToBase64,
                    });
                  });
                })
                .catch((err) => {
                  errorHandler(res, err);
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

  app.get(`/api/developer/profile-image/:id`, (req, res) => {
    getProfileImage(req.params.id)
      .then((image) => {
        if (!image) {
          return notFoundHandler(res, "Image not found");
        }
        let imageToBase64 = image.data.toString("base64");
        res.send({
          type: image.type,
          image: imageToBase64,
        });
      })
      .catch((err) => {
        errorHandler(res, err);
      });
  });
};
