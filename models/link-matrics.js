const { isIP } = require("validator");

module.exports = function matirics(mongoose) {
  const matricsSchema = {
    referer: String,
    ipAddress: { type: String, validate: isIP },
    userAgent: String,
  };
  const options = {
    timestamps: {
      createdAt: "visitAt",
      updatedAt: null,
    },
  };

  const schema = new mongoose.Schema(matricsSchema, options);
  return mongoose.model("Matrics", matricsSchema);
};
