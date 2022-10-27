const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Audio = require("../models/Audio.model")

router.post("/", (req, res) => {
    Audio.find()
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router