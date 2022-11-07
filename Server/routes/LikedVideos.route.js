const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const Video = require('../models/Video.model');
const checkAuth = require("../middleware/check-auth");

router.post("/", checkAuth, async (req, res) => {
    // console.log(req);
    console.log(req.userData.userId);
    const userId = req.userData.userId;
    User.find({_id:userId})
    .then((result)=>{
        res.status(200).json(result[0].likedVideos,{message:"All Liked videos of user"});
    })
    .catch((err)=>{
        console.log(err);
    })
})

module.exports = router