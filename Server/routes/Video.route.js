const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Video = require('../models/Video.model');
const User = require('../models/User.model');

router.post("/like",checkAuth, (req, res) => {
    console.log('like');
        const userId = req.userData.userId;
        const videoId = req.body.id;
        // Video.findByIdAndUpdate(videoId,{
        //     $addToSet:{likes:userId},
        //     $pull:{dislikes:userId}
        //   })
        // .catch((err)=>{
        //     console.log(err);
        // })

        User.findByIdAndUpdate(userId,{
            $addToSet:{likedVideos:videoId},
            $pull:{dislikedVideos:videoId}
        },{new:true})
        .then((res)=>{console.log(res)})
})
router.post("/removelike",checkAuth, (req, res) => {
    const userId = req.userData.userId;
    const videoId = req.body.id;
    // Video.findByIdAndUpdate(videoId,{
    //     $pull:{likes:userId},
    //   })
    // .catch((err)=>{
    //     console.log(err);
    // })

    User.findByIdAndUpdate(userId,{
        $pull:{likedVideos:videoId}
    });
})

router.post("/dislike",checkAuth, (req, res) => {
    const userId = req.userData.userId;
    const videoId = req.body.id;

    // Video.findByIdAndUpdate(videoId,{
    //     $pull:{likes:userId},
    //     $addToSet:{dislikes:userId},
    //   })
    // .catch((err)=>{
    //     console.log(err);
    // })

    User.findByIdAndUpdate(userId,{
        $pull:{likedVideos:videoId},
        $addToSet:{dislikedVideos:videoId}
    },{new:true})
    .then((res)=>{
        console.log('disliked video: ',res);
    });
})
router.post("/removedislike",checkAuth, (req, res) => {
    const userId = req.userData.userId;
    const videoId = req.body.id;
    // Video.findByIdAndUpdate(videoId,{
    //     $pull:{dislikes:userId},
    //   })
    // .catch((err)=>{
    //     console.log(err);
    // })

    User.findByIdAndUpdate(userId,{
        $pull:{dislikedVideos:videoId},
    });
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
        
        // increasing views of that video by 1.
        Video.findByIdAndUpdate(videoId,{$inc:{views:1}},{new:false})
        .then((result)=>{
            // console.log('updated video: ', result)
        })
        .catch((err)=>{
            console.log(err);
        })

        // adding that video to watched videos of user.
        User.findByIdAndUpdate(userId,{$addToSet:{watchedVideos:videoId}},{new:true})
        .then((result)=>{
            // console.log('updated user: ',result);
        });

        let isFavorite = false, isLiked = false, isDisliked = false, totalLikes = video[0].likes.length, totalDislikes = video[0].dislikes.length;
        if(user[0].videoFavorites.includes(videoId)) isFavorite = true;
        if(user[0].likedVideos.includes(videoId)) isLiked = true;
        if(user[0].dislikedVideos.includes(videoId)) isDisliked = true;
    
        res.status(200).json({message:"Data retrieved successfully",isFavorite,isDisliked,isLiked,totalLikes,totalDislikes});
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
})
module.exports = router