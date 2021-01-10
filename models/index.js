const config = require("../config/db.config");

const Sequelize = require("sequelize");
console.log(
  "WHERE ISHEEEEEEEEEEE????!!!!!",
  config.DB,
  config.USER,
  config.PASSWORD,
  config.HOST,
  process.env.DATABASE_URL
);
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model")(sequelize, Sequelize);
db.skill = require("../models/skill.model")(sequelize, Sequelize);
db.project = require("../models/project.model")(sequelize, Sequelize);
db.experience = require("../models/experience.model")(sequelize, Sequelize);
db.socialLink = require("../models/socialLink.model")(sequelize, Sequelize);
db.profileImage = require("../models/profileImage.model")(sequelize, Sequelize);

// Targets

db.user.belongsToMany(db.skill, {
  through: "user_skills",
  as: "skills",
  foreignKey: "userId",
});

db.user.hasMany(db.project, {
  as: "projects",
});

db.user.hasMany(db.experience, {
  as: "experience",
});

db.user.hasOne(db.socialLink, {
  as: "socialLink",
  foreignKey: "userId",
});

db.user.hasOne(db.profileImage, {
  as: "profileImage",
  foreignKey: "userId",
});

// Associations

db.socialLink.belongsTo(db.user, {
  as: "users",
  foreignKey: "userId",
});

db.experience.belongsTo(db.user, {
  as: "users",
  foreignKey: "userId",
});

db.project.belongsTo(db.user, {
  as: "users",
  foreignKey: "userId",
});

db.skill.belongsToMany(db.user, {
  through: "user_skills",
  as: "users",
  foreignKey: "skillId",
});

db.profileImage.belongsTo(db.user, {
  as: "users",
  foreignKey: "userId",
});

module.exports = db;
