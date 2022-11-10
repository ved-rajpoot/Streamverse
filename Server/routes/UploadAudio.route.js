const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer")
const User = require("../models/User.model");
const Audio = require("../models/Audio.model")



router.post("/",upload.fields([{name:'audio',maxCount:1}]), async (req, res) => {
    console.log(req.files);

    
    try {
        const audio = new Audio({
            audioPath: req.files.audio[0].originalname,
            title: req.body.title,
            description: req.body.description,
            isPrivate: req.body.isPrivate,
            userName: req.userData.userName,
            userId: req.userData.userId,
            isPrivate: req.body.isPrivate
        })
        await audio.save();
        res.json({ message: "audio saved in db successfully" , audio});
    } catch (err) {
        console.log('audio not saved in db');
        console.log(err);
    }
});


module.exports = router