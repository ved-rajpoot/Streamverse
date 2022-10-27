const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Video = require('../models/Video.model');
const User = require('../models/User.model');

router.post("/like",checkAuth, (req, res) => {
    console.log('like');
        const userId = req.userData.userId;
        const videoId = req.body.id;
        Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:userId},
            $pull:{dislikes:userId}
          })
        .then(
            res.status(200).json("The video has been liked.")
        )
        .catch((err)=>{
            console.log(err);
        })
})
router.post("/removelike",checkAuth, (req, res) => {
    const userId = req.userData.userId;
    const videoId = req.body.id;
    Video.findByIdAndUpdate(videoId,{
        $pull:{likes:userId},
      })
    .then(
        res.status(200).json("Like from this video has been removed")
    )
    .catch((err)=>{
        console.log(err);
    })
})

router.post("/dislike",checkAuth, (req, res) => {
    const userId = req.userData.userId;
    const videoId = req.body.id;
    Video.findByIdAndUpdate(videoId,{
        $pull:{likes:userId},
        $addToSet:{dislikes:userId},
      })
    .then(
        res.status(200).json("Video disliked")
    )
    .catch((err)=>{
        console.log(err);
    })
})
router.post("/removedislike",checkAuth, (req, res) => {
    const userId = req.userData.userId;
    const videoId = req.body.id;
    Video.findByIdAndUpdate(videoId,{
        $pull:{dislikes:userId},
      })
    .then(
        res.status(200).json("Dislike removed")
    )
    .catch((err)=>{
        console.log(err);
    })
})


router.post("/addfavorite", checkAuth, (req, res) => {
    const userId = req.userData.userId;
    const videoId = req.body.id;
    User.findByIdAndUpdate(userId,{
        $addtoset:{favorites:videoId},
      })
    .then(
        res.status(200).json("Added to favorites")
    )
    .catch((err)=>{
        console.log(err);
    })
})
router.post("/removefavorite", checkAuth, (req, res) => {
    const userId = req.userData.userId;
    const videoId = req.body.id;
    User.findByIdAndUpdate(userId,{
        $pull:{favorites:videoId},
      })
    .then(
        res.status(200).json("Removed from favorites")
    )
    .catch((err)=>{
        console.log(err);
    })
})

module.exports = router