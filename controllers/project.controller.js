const db = require("../models");
const Project = db.project;

exports.createProject = async (projectRequest) => {
  return Project.create(projectRequest)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

exports.deleteProject = async (userId, id) => {
  return Project.destroy({
    where: {
      userId: userId,
      id: id,
    },
  }).catch((err) => {
    return err;
  });
};

exports.getProject = async (userId) => {
  return Project.findAll({
    where: {
      userId: userId,
    },
  })
    .then((project) => {
      return project;
    })
    .catch((err) => {
      return err;
    });
};
