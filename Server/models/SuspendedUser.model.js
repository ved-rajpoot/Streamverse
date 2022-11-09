const mongoose = require("mongoose");

const SuspendedUserSchema = new mongoose.Schema({
    userId: String,
}, {timestamps: true});
SuspendedUserSchema.index({createdAt:1}, {expireAfterSeconds: 10});

const SuspendedUser = new mongoose.model("SuspendedUser", SuspendedUserSchema);
module.exports = SuspendedUser