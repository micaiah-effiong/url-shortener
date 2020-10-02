const userSchema = {
  email: {
    type: String,
    required: [true, "a valid email is required"],
  },
  name: String,
};

module.exports = function user(mongoose) {
  const option = {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  };
  let _schema = new mongoose.Schema(userSchema, option);
  return mongoose.model("user", _schema);
};
