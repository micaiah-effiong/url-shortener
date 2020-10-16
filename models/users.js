const bcrypt = require("bcrypt");
const _ = require("underscore");
const { isEmail } = require("validator");

module.exports = function user(mongoose) {
  const { model, Schema } = mongoose;
  const userSchema = {
    email: {
      type: String,
      validate: [isEmail, "A valid email is required"],
      unique: [true, "Email is already registered, Try signing up"],
      required: [true, "a valid email is required"],
    },
    name: String,

    // authentication data
    auth: {
      hash: String,
      salt: String,
      passwordResetToken: String,
    },

    // extra data
    metadata: {
      verified: { type: Boolean, default: false },
      lastLoginAt: Date,
      logins: [
        new Schema({
          userAgent: String,
          ipAddress: String,
          loginTime: Date,
        }),
      ],
    },

    role: String,

    // shorten ref
    links: [{ type: Schema.Types.ObjectId, ref: "Link" }],
  };

  const option = {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  };

  let _schema = new Schema(userSchema, option);

  // Hooks
  _schema.pre("save", async function (next) {
    if (this.isNew) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.auth.hash, salt);
        this.set({ auth: { salt, hash } });
      } catch (err) {
        throw err;
      }
    }
    next();
  });

  // methods
  _schema.methods.verifyPassword = async function (dataPassword) {
    try {
      return await bcrypt.compare(dataPassword, this.auth.hash);
    } catch (err) {
      throw err;
    }
  };

  _schema.methods.resetPassword = async function (newPassword) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
      this.set({ auth: { salt, hash } });
    } catch (err) {
      throw err;
    }
  };

  _schema.methods.toPublic = function () {
    return _.omit(
      this.toJSON(),
      "auth",
      "metadata",
      "role",
      "__v",
      "created_at",
      "updated_at"
    );
  };

  _schema.methods.toUserPublic = function () {
    return _.omit(this.toJSON(), "auth");
  };

  return model("User", _schema);
};
