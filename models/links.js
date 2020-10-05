module.exports = function link(mongoose) {
  const option = {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  };

  const _linkSchema = {
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
      index: true,
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

    clicks: {
      type: Number,
      default: 0,
    },

    visit: [
      new mongoose.Schema(
        {
          referer: String,
          ipAddress: String,
          visitAt: { type: Date, required: true, default: new Date() },
        },
        {
          timestamps: {
            createdAt: "created_at",
            updatedAt: null,
          },
        }
      ),
    ],
  };

  const linkSchema = new mongoose.Schema(_linkSchema, option);
  return mongoose.model("link", linkSchema);
};
