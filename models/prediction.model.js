const mongoose = require("mongoose");
const predictionSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    prediction: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: { type: String },
    inputs: { type: Map, of: String },
  },
  { timestamps: true, strict: false, collection: "Predictions" }
);

const Prediction = mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;
