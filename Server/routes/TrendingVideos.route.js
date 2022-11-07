const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const Video = require('../models/Video.model');
const checkAuth = require("../middleware/check-auth");

// 100 liked tags video, 100 recently watched videos, 100 most viewed videos.

router.post("/", checkAuth, async (req, res) => {
    // console.log(req);
    console.log(req.userData.userId);
    Video.find().sort({views:-1}).limit(500)
    .then((result)=>{
        res.send(result,{message:"Top 500 most viewed videos"});
    })
    .catch((err)=>{
        console.log(err);
    })
})

module.exports = router