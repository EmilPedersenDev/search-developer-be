const db = require("../models");
const User = db.user;
const SocialLink = db.socialLink;
const Skill = db.skill;
const Experience = db.experience;

exports.updateUser = (userRequest, userId) => {
  return User.update(userRequest, {
    where: {
      id: userId,
    },
  })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      return err;
    });
};

exports.getUserWithLinks = (id) => {
  return User.findByPk(id, {
    include: [
      {
        model: SocialLink,
        as: "socialLink",
        attributes: ["id", "github", "linkedIn"],
      },
    ],
  })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      return err;
    });
};

exports.getUserWithSkills = (id) => {
  return User.findByPk(id, {
    include: [
      {
        model: Skill,
        as: "skills",
        attributes: ["id", "name"],
      },
    ],
  })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      return err;
    });
};

exports.getUserWithExperience = (id) => {
  return User.findByPk(id, {
    include: [
      {
        model: Experience,
        as: "experience",
        attributes: ["id", "company", "title", "date", "description"],
      },
    ],
  })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      return err;
    });
};
