
const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer")
const User = require("../models/User.model");
const Video = require("../models/Video.model")


router.post("/", upload.fields([{name:'avatar',maxCount:1},{name:"thumbnail",maxCount:1}]), async (req, res) => {
    console.log(req);
    // console.log("recieved")
    try {
        const result = await cloudinary.uploader.upload(req.files.avatar[0].path, { "resource_type": "auto" });
        const result2 = await cloudinary.uploader.upload(req.files.thumbnail[0].path, { "resource_type": "auto" });
        
        console.log(result)
        const video = new Video({
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
            videoName: result.original_filename,
            title: req.body.title,
            description: req.body.description,
            thumbnail_cloudinary_id: result2.public_id,
            thumbnail_avatar: result2.secure_url,
            userName: req.userData.userName,
        })
        await video.save();
        res.json({ message: "video saved in db successfully" , video});
    } catch (err) {
        console.log('video not saved in db');
        console.log(err);
    }
});

module.exports = router