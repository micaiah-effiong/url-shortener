module.exports = function matirics(mongoose) {
  const matiricsSchema = {
    referer: String,
    ipAddress: String,
    userAgent: String,
  };
  const options = {
    timestamps: {
      createdAt: "visitAt",
      updatedAt: null,
    },
  };

  const schema = new mongoose.Schema(matiricsSchema, options);
  return mongoose.model("Matirics", matiricsSchema);
};
