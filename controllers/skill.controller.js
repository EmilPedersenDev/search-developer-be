const db = require("../models");
const Skill = db.skill;
const User = db.user;
const Models = db.sequelize.models;

exports.removeSkill = (userId, skillId) => {
  return Models.user_skills.destroy({
    where: {
      userId: userId,
      skillId: skillId,
    },
  });
};

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

// return Skill.findByPk(skillId)
//   .then((skill) => {
//     if (!skill) {
//       console.log("Skill not found!");
//       return null;
//     }
//     return User.findByPk(userId, {
//       include: [
//         {
//           model: Skill,
//           as: "skills",
//           attributes: ["id", "name"],
//         },
//       ],
//     }).then((user) => {
//       if (!user) {
//         console.log("User not found!");
//         return null;
//       }
//       skill.addUser(user);

//       console.log("Added skill to user");
//       return user;
//     });
//   })
//   .catch((err) => {
//     return err;
//   });
