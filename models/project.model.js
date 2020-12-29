module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("projects", {
    name: {
      type: Sequelize.STRING,
    },
    link: {
      type: Sequelize.STRING(2083),
    },
    repoLink: {
      type: Sequelize.STRING(2083),
    },
    imgLink: {
      type: Sequelize.STRING(2083),
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Project;
};
