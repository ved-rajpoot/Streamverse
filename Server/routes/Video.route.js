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
        $addToSet:{favorites:videoId}
      })
    .then(
        // (result)=>{console.log(result)}
        res.status(200).json("Added to favorites")
    )
    .catch((err)=>{
        console.log(err);
        res.send(err);
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
router.post("/getfavorites", checkAuth, async (req,res)=>{
    const userId = req.userData.userId;
    const user = await User.find({_id:userId});
    
    Video.find({_id:{$in:user[0].favorites}})
    .then((result)=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
    })
})
module.exports = router

router.post("/getvideodata", checkAuth, async (req,res)=>{
    const userId = req.userData.userId;
    const videoId = req.body.id;
    try {
        const user = await User.find({_id:userId});
        const video = await Video.find({_id:videoId});
    
        let isFavorite = false, isLiked = false, isDisliked = false;
        if(user[0].favorites.includes(videoId)) isFavorite = true;
        if(video[0].likes.includes(userId)) isLiked = true;
        if(video[0].dislikes.includes(userId)) isDisliked = true;
    
        res.status(200).json({message:"Data retrieved successfully",isFavorite,isDisliked,isLiked});
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
})
module.exports = router