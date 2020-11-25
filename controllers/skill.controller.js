const db = require("../models");
const Skill = db.skill;
const User = db.user;

exports.addSkill = (skillId, userId) => {
  return Skill.findByPk(skillId)
    .then((skill) => {
      if (!skill) {
        console.log("Skill not found!");
        return null;
      }
      return User.findByPk(userId).then((user) => {
        if (!user) {
          console.log("User not found!");
          return null;
        }
        skill.addUser(user);
        console.log("Added skill to user");
        return user;
      });
    })
    .catch((err) => {
      return err;
    });
};
