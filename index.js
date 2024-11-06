const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.json({ status: "server is running" });
});

//Routes
//SECTION - user routes
const userRoutes = require("./routes/user.route");
app.use("/user", userRoutes);
//prediciton routes
const PredicitonRoutes = require("./routes/prediction.route");
app.use("/predictions", PredicitonRoutes);

const mongoUri = process.env.MONGO_URL;
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });
