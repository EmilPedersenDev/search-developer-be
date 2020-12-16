const { socialLink } = require("../models");
const db = require("../models");
const SocialLink = db.socialLink;

exports.addSocialLink = (user) => {
  SocialLink.findByPk(user.id).then((link) => {
    user.addSocialLink(link);
    return user;
  });
};

exports.updateSocialLink = async (userBody, userId) => {
  return SocialLink.update(
    {
      github: userBody.socialLink.github,
      linkedIn: userBody.socialLink.linkedIn,
    },
    {
      where: {
        userId: userId,
      },
    }
  )
    .then((links) => {
      return links;
    })
    .catch((err) => {
      return err;
    });
};

exports.createSocialLink = async (userBody, userId) => {
  return SocialLink.create({
    github: userBody.socialLink.github,
    linkedIn: userBody.socialLink.linkedIn,
    userId: userId,
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};
