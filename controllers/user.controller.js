const db = require("../models");
const User = db.user;
const SocialLink = db.socialLink;
const Skill = db.skill;

exports.updateUser = (userBody, userId) => {
  return User.update(
    {
      firstname: userBody.firstname,
      lastname: userBody.lastname,
      information: userBody.information,
    },
    {
      where: {
        id: userId,
      },
    }
  )
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
      return user.skills;
    })
    .catch((err) => {
      return err;
    });
};
