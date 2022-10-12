const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors());

app.listen(9002, () => {
    console.log("BE started at port 9002")
})