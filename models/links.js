module.exports = function (sequelize, DataType) {
  let link = sequelize.define("link", {
    url: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: "link must be a valid URL",
        },
        notEmpty: {
          msg: "link cannot be a empty",
        },
      },
    },
    slug: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "alias cannot be a empty",
        },
      },
      unique: {
        msg: "slug already used",
      },
    },
    expiresAt: {
      type: DataType.DATE,
      allowNull: false,
      defaultValue: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  });

  return link;
};
