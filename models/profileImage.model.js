module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("profileImage", {
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.BLOB("long"),
    },
  });

  return Image;
};
