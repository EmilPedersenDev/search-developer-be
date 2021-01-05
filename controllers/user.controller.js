const db = require("../models");
const User = db.user;
const SocialLink = db.socialLink;
const Skill = db.skill;
let bcrypt = require("bcryptjs");

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
  ).then((user) => {
    return user;
  });
};
exports.updateUserName = (userBody, userId) => {
  return User.update(
    {
      firstname: userBody.firstname,
      lastname: userBody.lastname,
    },
    {
      where: {
        id: userId,
      },
    }
  ).then((user) => {
    return user;
  });
};
exports.updateUserEmail = (userBody, userId) => {
  return User.update(
    {
      email: userBody.email,
    },
    {
      where: {
        id: userId,
      },
    }
  ).then((user) => {
    return user;
  });
};
exports.updatePassword = (userBody, userId) => {
  return User.update(
    {
      password: bcrypt.hashSync(userBody.password, 8),
    },
    {
      where: {
        id: userId,
      },
    }
  ).then((user) => {
    return user;
  });
};

exports.getUser = (id) => {
  return User.findByPk(id, {
    attributes: {
      exclude: ["password", "createdAt", "updatedAt", "information"],
    },
  }).then((user) => {
    return user;
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
  }).then((user) => {
    return user;
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
  }).then((user) => {
    return user.skills;
  });
};
