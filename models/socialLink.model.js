module.exports = (sequelize, Sequelize) => {
  const SocialLink = sequelize.define("socialLink", {
    github: {
      type: Sequelize.STRING(2083),
    },
    linkedIn: {
      type: Sequelize.STRING(2083),
    },
  });
  return SocialLink;
};
