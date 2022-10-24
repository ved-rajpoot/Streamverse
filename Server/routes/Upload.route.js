
const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer")
const User = require("../models/User.model");
const publicVideo = require("../models/publicVideos.model")


router.post("/", upload.single('avatar'), async (req, res) => {
    // console.log(req.file)
    // console.log("recieved")
    try {
        const result = await cloudinary.uploader.upload(req.file.path, { "resource_type": "auto" });
        
        console.log(result)
        const video = new publicVideo({
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
            videoName: result.original_filename
        })
        await video.save();
        res.json({ message: "video saved in db successfully" });
        // Create new user
        // let user = new User({
        //     name: req.body.name,
        //     avatar: result.secure_url,
        //     cloudinary_id: result.public_id,
        // });
        // Save user
        // await user.save();
        // res.json(user);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router