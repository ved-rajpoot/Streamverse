const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const checkAuth = require('./middleware/check-auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use('/uploadvideo', checkAuth, require('./routes/UploadVideo.route'));
app.use('/uploadaudio', checkAuth, require('./routes/UploadAudio.route'));
app.use('/videolist', require('./routes/VideoList.route'));
app.use('/audiolist', require('./routes/AudioList.route'));
app.use('/getuservideos', require('./routes/GetUserVideos.route'));
app.use('/getuseraudios', require('./routes/GetUserAudios.route'));

app.listen(9002, () => {
    console.log("BE started at port 9002")
})