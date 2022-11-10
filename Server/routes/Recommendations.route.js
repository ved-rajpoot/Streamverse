const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const Video = require('../models/Video.model');
const checkAuth = require("../middleware/check-auth");

// 100 liked tags video, 100 recently watched videos, 100 most viewed videos.

router.post("/", checkAuth, async (req, res) => {
    // console.log(req);
    console.log(req.userData.userId);
    const user = await User.find({id:req.userData.userId});

    // getting favorite tags of a user and sorting them on the basis of their weights.
    let tags = user[0].favoriteTags;
    console.log(tags);
    tags.sort((a,b)=>{
        return a.weight-b.weight;
    });
    tags = tags.map((tag,weight)=>{
        return tag;
    })
    let recommendedVideos = [];

    // getting video which have tags simliar to favorite tags of user (favorite tags are taken from liked and recently watched videos).
    let result = await Video.find({$match:{"tags":{"$in":tags}}}).limit(100);
    recommendedVideos = [...recommendedVideos,...result];   
    console.log('res ',recommendedVideos);
    // getting videos which have maximum number of views.
    result = await Video.find().sort({views:-1}).limit(100);
    recommendedVideos = [...recommendedVideos,...result];
    
    // removing duplicates
    recommendedVideos = recommendedVideos.filter((value,index,self)=>
        index===self.findIndex((t)=>
            t._id.toString() === value._id.toString()
        )
    )

    // taking only first 100 videos
    recommendedVideos = recommendedVideos.slice(0,100);
    res.send(recommendedVideos);
})

module.exports = router