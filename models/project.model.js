module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("projects", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    link: {
      type: Sequelize.STRING(2083),
    },
    repoLink: {
      type: Sequelize.STRING(2083),
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Project;
};
