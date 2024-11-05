const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUserPredictions,
  savePrediction,
  deletePrediction,
} = require("../controllers/prediction.controller");

const router = express.Router();

router.use(authMiddleware);

const upload = require("../utils/FileUpload")("uploads").single("image");
router.post("/save", upload, savePrediction);
router.get("/mine", getUserPredictions);
router.delete("/delete", deletePrediction);

module.exports = router;
