const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const publicAudio = require("../models/publicAudios.model")

router.post("/", (req, res) => {
    publicAudio.find()
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router