const express = require("express"); 
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const User = require('../models/User.model');

router.post("/", checkAuth, (req, res) => {
    // console.log(req);
    console.log(req.userData);
    User.find( { _id : req.userData.userId })
    .then((result)=>{
        console.log('userdata: ', result[0]);
        res.json(result[0]);
    })
    .catch((err)=>{
        console.log('error: ', err);
    })
})

module.exports = router