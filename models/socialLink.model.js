module.exports = (sequelize, Sequelize) => {
  const SocialLink = sequelize.define("socialLink", {
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
