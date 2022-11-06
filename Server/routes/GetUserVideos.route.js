const express = require("express"); 
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Video = require('../models/Video.model');

router.post("/", checkAuth, (req, res) => {
    // console.log(req.userData);
    // console.log(req.userData);
    Video.find( { userId : req.userData.userId })
    .then((result)=>{
        // console.log(result);
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})

module.exports = router