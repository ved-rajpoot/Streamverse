
const router = require("express").Router();
const upload = require("../utils/multer")
const User = require("../models/User.model");
const Video = require("../models/Video.model")


router.post("/",upload.fields([{name:'video',maxCount:1},{name:"thumbnail",maxCount:1}]), async (req, res) => {
    // console.log(req.files);
    
    try {
        const video = new Video({
            videoPath: req.files.video[0].originalname,
            title: req.body.title,
            description: req.body.description,
            thumbnailPath: req.files.thumbnail[0].originalname,
            userName: req.userData.userName,
            userId: req.userData.userId,
            tags: req.body.tags.split(","),
            isPrivate: req.body.isPrivate
        })
        await video.save();
        res.json({ message: "video saved in db successfully" , video});
    } catch (err) {
        console.log('video not saved in db');
        console.log(err);
    }
});

module.exports = router