const express = require("express"); 
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Video = require('../models/Video.model');
const User = require('../models/User.model');
const { default: mongoose } = require("mongoose");

router.post("/", (req, res) => {
    console.log('request body: ', req.body);
    const playlistId = req.body.playlistId;
    User.find({_id:req.body.userId})
    .then((user)=>{
        const playlists = user[0].videoPlaylists;
        console.log(playlists);
        let playlist = [];
        for(let idx = 0;idx<playlists.length;idx++) {
            if(playlists[idx]._id==playlistId) playlist = playlists[idx];
        }
        console.log('playlist: ',playlist.videos);
        
        // get all videos of a playlist.
        Video.find({_id: {$in : playlist.videos}})
        .then((result)=>{
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch((err)=>{
        console.log(err);
    })
})

module.exports = router