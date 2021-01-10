const db = require("../models");
const Experience = db.experience;

exports.updateExperience = (experienceBody, userId) => {
  return Experience.update(
    {
      company: experienceBody.company,
      title: experienceBody.title,
      date: experienceBody.date,
      description: experienceBody.description,
    },
    {
      where: {
        userId: userId,
        id: experienceBody.id,
      },
    }
  )
    .then((experience) => {
      return experience;
    })
    .catch((err) => {
      return err;
    });
};

exports.creatExperience = (experienceBody, userId) => {
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

exports.deleteExperience = (userId, id) => {
  return Experience.destroy({
    where: {
      userId: userId,
      id: id,
    },
  }).catch((err) => {
    return err;
  });
};
exports.getExperiences = (userId) => {
  return Experience.findAll({
    where: {
      userId: userId,
    },
    order: [["date", "DESC"]],
  })
    .then((experience) => {
      return experience;
    })
    .catch((err) => {
      return err;
    });
};
