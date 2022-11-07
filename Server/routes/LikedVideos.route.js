const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const Video = require('../models/Video.model');
const checkAuth = require("../middleware/check-auth");

router.post("/", checkAuth, async (req, res) => {
    // console.log(req);
    console.log(req.userData.userId);

    try {
        const userId = req.userData.userId;
        const user = await User.find({_id:userId});
        // console.log(user);
        const likedVideos = user[0].likedVideos;
        const result = await Video.find({_id:{$in:likedVideos}});
        res.send(result);
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router