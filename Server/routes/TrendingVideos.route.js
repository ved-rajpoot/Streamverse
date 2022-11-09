const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const Video = require('../models/Video.model');
const checkAuth = require("../middleware/check-auth");

// getting top 500 videos based on number of views
router.post("/", checkAuth,(req, res) => {
    // console.log(req);
    // console.log(req.userData.userId);
    Video.find().sort({views:-1}).limit(500)
    .then((result)=>{
        res.status(200).json({result,message:"Top 500 most viewed videos"});
    })
    .catch((err)=>{
        console.log(err);
    })
})

module.exports = router