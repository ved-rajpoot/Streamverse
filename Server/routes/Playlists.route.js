const express = require("express"); 
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const User = require('../models/User.model');

router.post("/", checkAuth, async (req, res) => {
    console.log(req.body.updatedPlaylists);
    const newPlaylists = req.body.updatedPlaylists;

    // removing isEditing and isCompleted property of newPlaylists.
    const newArr = newPlaylists.map(({isEditing,isCompleted,...rest})=>{
        // console.log(rest);
        return rest;
    })

    User.findOneAndUpdate( { _id : req.userData.userId }, {playlists:newArr}, {new:true})
    .then((result)=>{
        console.log('updatedUser: ',result);
    })
    .catch((err)=>{
        console.log(err);
    })
})

module.exports = router