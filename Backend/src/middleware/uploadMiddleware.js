const multer = require("multer");
const path = require("path");

// Configure Multer for file uploads
const upload = multer({
    dest: "uploads/",
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            cb(null, true);
        } else {
            cb(new Error("Images only!"));
        }
    },
});

module.exports = upload;
