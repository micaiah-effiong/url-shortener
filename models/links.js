module.exports = function link(mongoose) {
  let schema = new mongoose.Schema({
    url: {
      type: String,
      required: [true, "a valid url is required"],
      validate: {
        validator: (_url) => {
          let isValid;
          try {
            new URL(_url);
            isValid = true;
          } catch (err) {
            isValid = false;
          }
          return isValid;
        },
        message: (prop) => `${prop.value} is an invalid URL`,
      },
    },

    slug: {
      type: String,
      required: [true, "a slug is required"],
      unique: [true, "slug already used"],
      validate: {
        validator: (_slug) => {
          return !/[^\w\-]/i.test(_slug);
        },
        message: (prop) => `${prop.value} is invalid`,
      },
    },
    expiresAt: {
      type: Date,
      required: [true, "a slug is required"],
      default: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  });

  return mongoose.model("link", schema);
};

/*let model = sequelize.define("link", {
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

  return model;*/
