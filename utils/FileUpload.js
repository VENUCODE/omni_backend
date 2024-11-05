const path = require("path");
const multer = require("multer");
const UploadFile = (dest = "uploads/") => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      const uniqueFilename = `${Date.now()}${fileExtension}`;
      cb(null, uniqueFilename);
    },
  });

  return multer({ storage: storage });
};

module.exports = UploadFile;
