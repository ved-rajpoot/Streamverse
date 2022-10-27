const express = require("express"); 
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Audio = require('../models/Audio.model');

router.post("/", checkAuth, (req, res) => {
    // console.log(req);
    console.log(req.userData);
    Audio.find( { userId : req.userData.userId })
    .then((result)=>{
        console.log(result.length);
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})

module.exports = router