const config = require("../config/db.config");

const Sequelize = require("sequelize");
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

db.user.belongsToMany(db.skill, {
  through: "user_skills",
  // as: "skills",
  foreignKey: "user_id",
});

db.skill.belongsToMany(db.user, {
  through: "user_skills",
  as: "users",
  foreignKey: "skill_id",
});

module.exports = db;
