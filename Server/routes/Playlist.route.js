const express = require("express")
const router = express.Router();
const user = require("../models/User.model")

router.post("/add", (req, res) => {
    user.update({email: req.userData.email},
        {$push: {playlist: req.body.id}})
})

module.exports = router