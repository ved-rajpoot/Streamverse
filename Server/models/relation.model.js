const mongoose = require("mongoose");

const RelationSchema = new mongoose.Schema({
    followerId:[String],
    followerDetails:{},
    followingId:[String],
    followingDetails:{}
})
const Relation = new mongoose.model("Relation", RelationSchema);
module.exports = Relation;