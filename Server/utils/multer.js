const multer = require("multer");
const path = require("path");


module.exports = multer({
    storage: multer.diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
            const date = new Date();
            cb(null, date.valueOf()+file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".mp4" && ext!==".png" && ext!==".jpg" && ext!=".mp3" && ext!==".m4a") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
});