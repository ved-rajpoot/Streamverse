const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer")
const User = require("../models/User.model");
const Audio = require("../models/Audio.model")


router.post("/", upload.fields([{ name: 'avatar', maxCount: 1 }, { name: "thumbnail", maxCount: 1 }]), async (req, res) => {
    console.log(req.files);
    // console.log("recieved")
    try {
        const result = await cloudinary.uploader.upload(req.files.avatar[0].path, { "resource_type": "auto" });
        const result2 = await cloudinary.uploader.upload(req.files.thumbnail[0].path, { "resource_type": "auto" });

        console.log(result)
        const audio = new Audio({
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
            audioName: result.original_filename,
            title: req.body.title,
            description: req.body.description,
            thumbnail_cloudinary_id: result2.public_id,
            thumbnail_avatar: result2.secure_url,
            userName: req.userData.userName,
        })
        await audio.save();
        res.json({ message: "audio saved in db successfully", audio });
    } catch (err) {
        console.log('audio not saved in db');
        console.log(err);
    }
});

module.exports = router