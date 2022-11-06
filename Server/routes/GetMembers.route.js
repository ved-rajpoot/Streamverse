const express = require("express"); 
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Room = require('../models/Room.model')

router.post("/", checkAuth, (req, res) => {
    // console.log(req);
    // console.log(req.userData);
    Room.find( {_id:req.body.roomId})
    .then((result)=>{
        // console.log(result.length);
        res.json(result[0].userArray);
    })
    .catch((err)=>{
        console.log(err);
    })
})

module.exports = router