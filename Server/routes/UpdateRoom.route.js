const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Room = require('../models/Room.model');

router.post("/", checkAuth, (req, res) => {
    
    Room.findOne({ _id: req.body.id })
        .then((room) => {
            console.log(req.userData.userId)
            res.json({ room : room, id: req.userData.userId }) 
        })
        .catch((err) => {
            console.log('error: ', err);
        })
})

module.exports = router