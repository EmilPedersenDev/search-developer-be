const db = require("../models");
const Project = db.project;

exports.getProject = (userId) => {
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

exports.createProject = (projectBody, userId) => {
  return Project.create({
    name: projectBody.name,
    link: projectBody.link,
    repoLink: projectBody.repoLink,
    imgLink: projectBody.imgLink,
    description: projectBody.description,
    userId: userId,
  })
    .then((project) => {
      return project;
    })
    .catch((err) => {
      return err;
    });
};
exports.updateProject = (projectBody, userId) => {
  return Project.update(
    {
      name: projectBody.name,
      link: projectBody.link,
      repoLink: projectBody.repoLink,
      imgLink: projectBody.imgLink,
      description: projectBody.description,
    },
    {
      where: {
        userId: userId,
        id: projectBody.id,
      },
    }
  )
    .then((project) => {
      return project;
    })
    .catch((err) => {
      return err;
    });
};

exports.deleteProject = (userId, id) => {
  return Project.destroy({
    where: {
      userId: userId,
      id: id,
    },
  }).catch((err) => {
    return err;
  });
};
