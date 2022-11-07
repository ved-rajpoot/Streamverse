const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Video = require('../models/Video.model');
const User = require('../models/User.model');
const fs = require('fs');

router.get("/video",(req,res) => {
    console.log('sending video in chunks')
    console.log(req.body)

    const range = req.headers.range
    const videoPath = 'C:\\Users\\smart\\OneDrive\\Desktop\\Streamverse-AVISHKAR\\Streamverse\\Server\\Uploads\\1667812843804VID-20220925-WA0010.mp4';
    const videoSize = fs.statSync(videoPath).size
    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + chunkSize, videoSize - 1)
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers)
    const stream = fs.createReadStream(videoPath, {
        start,
        end
    })
    stream.pipe(res)
})
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
        $addToSet:{videoFavorites:videoId}
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
        $pull:{videoFavorites:videoId},
      })
    .then(
        res.status(200).json("Removed from favorites")
    )
    .catch((err)=>{
        console.log(err);
    })
})
router.post("/getfavoritevideos", checkAuth, async (req,res)=>{
    const userId = req.userData.userId;
    const user = await User.find({_id:userId});
    
    Video.find({_id:{$in:user[0].videoFavorites}})
    .then((result)=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post("/getvideodata", checkAuth, async (req,res)=>{
    const userId = req.userData.userId;
    const videoId = req.body.id;
    try {
        const user = await User.find({_id:userId});
        const video = await Video.find({_id:videoId});
    
        let isFavorite = false, isLiked = false, isDisliked = false, totalLikes = video[0].likes.length, totalDislikes = video[0].dislikes.length;
        if(user[0].videoFavorites.includes(videoId)) isFavorite = true;
        if(video[0].likes.includes(userId)) isLiked = true;
        if(video[0].dislikes.includes(userId)) isDisliked = true;
    
        res.status(200).json({message:"Data retrieved successfully",isFavorite,isDisliked,isLiked,totalLikes,totalDislikes});
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
})
module.exports = router