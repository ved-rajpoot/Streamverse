const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const multer = require("multer");

const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true  , limit: '50mb', parameterLimit: 50000}));
app.use(morgan('dev'));

app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => { 
    console.log("DB connected")
})

app.use('/signUp', require('./routes/SignUp.route'));
app.use('/login', require('./routes/Login.route'));
app.use('/upload', require('./routes/Upload.route'));

app.listen(9002, () => {
    console.log("BE started at port 9002")
})