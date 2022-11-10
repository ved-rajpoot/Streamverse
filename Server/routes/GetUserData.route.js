const express = require("express"); 
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const User = require('../models/User.model');

router.post("/", (req, res) => {
    // console.log(req.body);
    // console.log(req.userData);
    User.find( { _id : req.body.id })
    .then((result)=>{
        // console.log('userdata: ', result);
        res.json(result)[0];
    })
    .catch((err)=>{
        console.log('error: ', err);
    })
})

module.exports = router