const { isURL } = require("validator");

module.exports = function link(mongoose) {
  const { Schema, model } = mongoose;
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
      validate: [isURL, "Invalid URL"],
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

    user: { type: Schema.Types.ObjectId, ref: "User" },

    expiresAt: {
      type: Date,
      required: [true, "a slug is required"],
      default: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },

    clicks: {
      type: Number,
      default: 0,
    },

    visit: [{ type: Schema.Types.ObjectId, ref: "Matirics" }],
  };

  const linkSchema = new Schema(_linkSchema, option);
  return model("Link", linkSchema);
};
