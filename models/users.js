const bcrypt = require("bcrypt");
const _ = require("underscore");
const { isEmail } = require("validator");

module.exports = function user(mongoose) {
  const { model, Schema } = mongoose;
  const userSchema = {
    email: {
      type: String,
      validate: [isEmail, "A valid email is required"],
      required: [true, "a valid email is required"],
    },
    name: String,
    hash: String,
    salt: String,
    links: { type: Schema.Types.ObjectId, ref: "Link" },
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
    console.log(">>>", this.password);
    next();
  });

  // virtuals
  _schema.virtual("password").set(async function (pass) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(pass, salt);
      this.set({ salt, hash });
      this.save();
    } catch (err) {
      console.log(err);
      throw err;
    }
  });

  // methods
  _schema.methods.verifyPassword = async function (dataPassword) {
    try {
      return await bcrypt.compare(dataPassword, this.hash);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return model("User", _schema);
};

// TODO:
// Hash and verify user password using bcrypt
