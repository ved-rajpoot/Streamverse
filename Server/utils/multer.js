const multer = require("multer");
const path = require("path");


module.exports = multer({
    storage: multer.diskStorage({
        destination: "./Uploads",
        filename: (req, file, cb) => {
            const date = new Date();
            cb(null, file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".mp4" && ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext!=".mp3" && ext!==".m4a" && ext!=".avif") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
});