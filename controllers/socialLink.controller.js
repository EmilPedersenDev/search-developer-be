const { socialLink } = require("../models");
const db = require("../models");
const SocialLink = db.socialLink;

exports.addSocialLink = (user) => {
  SocialLink.findByPk(user.id).then((link) => {
    user.addSocialLink(link);
    return user;
  });
};

exports.updateSocialLink = async (userRequest, userId) => {
  return SocialLink.update(userRequest, {
    where: {
      userId: userId,
    },
  })
    .then((links) => {
      return links;
    })
    .catch((err) => {
      return err;
    });
};

exports.createSocialLink = async (userRequest) => {
  return SocialLink.create(userRequest)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};
