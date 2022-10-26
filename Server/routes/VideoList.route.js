const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const publicVideo = require("../models/Video.model")

router.post("/", (req, res) => {
    publicVideo.find()
        .then((result) => {
            console.log(result)
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router