const db = require("../models");
const Experience = db.experience;

exports.updateExperience = async (experienceRequest, userId) => {
  return Experience.update(experienceRequest, {
    where: {
      userId: userId,
    },
  })
    .then((links) => {
      return links;
    })
    .catch((err) => {
      return err;
    });
};

exports.creatExperience = async (experienceBody, userId) => {
  return Experience.create({
    company: experienceBody.company,
    title: experienceBody.title,
    date: experienceBody.date,
    description: experienceBody.description,
    userId: userId,
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};

exports.deleteExperience = async (userId, id) => {
  return Experience.destroy({
    where: {
      userId: userId,
      id: id,
    },
  }).catch((err) => {
    return err;
  });
};
exports.getExperiences = async (userId) => {
  return Experience.findAll({
    where: {
      userId: userId,
    },
  })
    .then((experience) => {
      return experience;
    })
    .catch((err) => {
      return err;
    });
};
