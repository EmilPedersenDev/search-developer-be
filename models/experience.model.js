module.exports = (sequelize, Sequelize) => {
  const Experience = sequelize.define("experience", {
    company: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Experience;
};
