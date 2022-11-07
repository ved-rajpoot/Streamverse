const multer = require("multer");
const path = require("path");


module.exports = multer({
    storage: multer.diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
            // console.log("file: \n" + file + "\n That was file \n")
            const date = new Date();
            const token = Date.parse(date);
            cb(null, file.originalname + token);
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