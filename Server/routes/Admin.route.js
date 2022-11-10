const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const User = require("../models/User.model");
const Video = require("../models/Video.model");
const Audio = require("../models/Audio.model");
const SuspendedUser = require("../models/SuspendedUser.model");

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

router.post("/suspendUser", (req,res) => {
    const user = new SuspendedUser({
        userId: req.body.id
    });

    user
    .save()
    .then(result => {
        // console.log(result);
        res.status(201).json({
            message: 'User Suspended'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
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