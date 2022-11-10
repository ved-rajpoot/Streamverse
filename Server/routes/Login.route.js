const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User.model');

router.post('/', async (req, res, next) => {
    console.log(req.body)
    await User.find({ email: req.body.user.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.user.password, user[0].password, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        userId: user[0]._id,
                        userName: user[0].name,
                        email: user[0].email,
                    },
                        process.env.ACCESS_SECRET_KEY,
                        {
                            expiresIn: "1000h"
                        });
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;