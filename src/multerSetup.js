const multer = require('multer');
const fs = require('fs');

// Define Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const category = (req.body.uploadCategory) ? "/" + req.body.uploadCategory : "/uncategorized";
    const categoryDestination = (req.body.uploadDestination) ? "/" + req.body.uploadDestination : "";
    const path = `${global.appRoot}/uploads${category}${categoryDestination}`;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    cb(null, path);
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // cb = callback
  cb(null, true)
};

const limits = {
  fieldNameSize: 100, // Size in bytes
  fileSize: 5242880, // 5MB in bytes
};

module.exports = multer({storage, fileFilter, limits});
