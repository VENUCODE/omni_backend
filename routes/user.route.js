const route = require("express").Router();
const { login, signup } = require("../controllers/user.controller");
const upload = require("../utils/FileUpload")("uploads/users/").single("image");
route.post("/login", login);
route.post("/signup", upload, signup);
module.exports = route;
