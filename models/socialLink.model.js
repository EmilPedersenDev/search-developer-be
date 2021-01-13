module.exports = (sequelize, Sequelize) => {
  const SocialLink = sequelize.define("socialLink", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    github: {
      type: Sequelize.STRING(2083),
      allowNull: false,
    },
    linkedIn: {
      type: Sequelize.STRING(2083),
      allowNull: false,
    },
  });
  return SocialLink;
};
