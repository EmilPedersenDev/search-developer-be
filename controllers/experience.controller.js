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

exports.creatExperience = async (experienceRequest) => {
  return Experience.create(experienceRequest)
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
exports.getExperience = async (userId) => {
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
