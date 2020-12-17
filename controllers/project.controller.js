const db = require("../models");
const Project = db.project;

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

exports.createProject = async (projectBody, userId) => {
  return Project.create({
    name: projectBody.name,
    link: projectBody.link,
    repoLink: projectBody.repoLink,
    description: projectBody.description,
    userId: userId,
  })
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
