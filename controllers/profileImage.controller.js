const fs = require("fs");
const db = require("../models");
const ProfileImage = db.profileImage;

exports.createProfileImage = (file, userId) => {
  return ProfileImage.create({
    type: file.mimetype,
    name: file.originalname,
    data: fs.readFileSync(__dirname + "/../static/uploads/" + file.filename),
    userId: userId,
  }).then((image) => {
    return image;
  });
};

exports.updateProfileImage = (file, userId) => {
  return ProfileImage.update(
    {
      type: file.mimetype,
      name: file.originalname,
      data: fs.readFileSync(__dirname + "/../static/uploads/" + file.filename),
    },
    {
      where: {
        userId: userId,
      },
    }
  ).then((image) => {
    return image;
  });
};

exports.getProfileImage = (userId) => {
  return ProfileImage.findOne({
    where: {
      userId: userId,
    },
  }).then((image) => {
    return image;
  });
};
