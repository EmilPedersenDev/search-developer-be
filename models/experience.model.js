module.exports = (sequelize, Sequelize) => {
  const Experience = sequelize.define("experience", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
