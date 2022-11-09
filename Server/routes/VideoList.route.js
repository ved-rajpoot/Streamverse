const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const Video = require("../models/Video.model");

router.post("/", checkAuth, (req, res) => {
    Video.find()
        .then((result) => {
            // console.log(result);
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router