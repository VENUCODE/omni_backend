const Prediction = require("../models/prediction.model");

const savePrediction = async (req, res) => {
  try {
    const userId = req.user.userId;
    const image = req.file?.path;

    const newPrediction = new Prediction({
      ...req.body,
      userId,
      image,
    });

    await newPrediction.save();
    res.status(201).json({
      message: "Prediction saved successfully",
      prediction: newPrediction,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing prediction", error: error.message });
  }
};
const getUserPredictions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const predictions = await Prediction.find({ userId });
    res.status(200).json(predictions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching predictions", error: error.message });
  }
};
const deletePrediction = async (req, res) => {
  try {
    const { predictionId } = req.body;
    console.log(predictionId);
    const userId = req.user.userId;
    const deletedPrediction = await Prediction.findOneAndDelete({
      _id: predictionId,
      userId,
    });

    if (!deletedPrediction) {
      return res.status(404).json({
        message:
          "Prediction not found or you don't have permission to delete it.",
      });
    }

    res.status(204).json({
      message: "Prediction deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting prediction", error: error.message });
  }
};

module.exports = { savePrediction, getUserPredictions, deletePrediction };
