const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const User = require("../models/User.model");
const Video = require("../models/Video.model");
const Audio = require("../models/Audio.model");

router.post("/users", (req, res) => {
    User.find()
        .then((result) => {
            // console.log(result);
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.post("/deleteUser", (req,res) => {
    User.deleteOne({_id:req.body.id})
        .then((result) => {
            // console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
    Video.deleteMany({userId: req.body.id})
        .then((res) => console.log("Videos deleted"))
        .catch((err) => console.log(err))
    
    Audio.deleteMany({userId: req.body.id})
        .then((res) => console.log("Audios deleted"))
        .catch((err) => console.log(err)) 

    res.json("deletion done")
})

router.post("/deleteVideo", (req,res) => {
    Video.deleteOne({_id:req.body.id})
        .then((result) => {
            // console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.post("/deleteAudio", (req,res) => {
    console.log(req.body.id)
    Audio.deleteOne({_id:req.body.id})
        .then((result) => {
            // console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
})


module.exports = router