const db = require("../models");
const Skill = db.skill;
const User = db.user;

exports.addSkill = (skills, userId) => {
  return User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return;
      }
      return Skill.findAll()
        .then((items) => {
          let skillsToUpdate = items
            .filter((item) => skills.find((skill) => item.id === skill.id))
            .map((filteredItems) => filteredItems.id);

          return user
            .setSkills(skillsToUpdate)
            .then((result) => {
              return result;
            })
            .catch((err) => {
              return err;
            });
        })
        .catch((err) => {
          return err;
        });
    })
    .catch((err) => {
      return err;
    });
};
