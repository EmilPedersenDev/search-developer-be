const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images");
  }
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../static/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-profileImage-${file.originalname}`);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: imageFilter,
});

module.exports = uploadFile;
