const mongoose = require("mongoose");

const SuspendedUserSchema = new mongoose.Schema({
    userId: String,
    expire_at: {type: Date, default: Date.now, expires: 1800}
});

const SuspendedUser = new mongoose.model("SuspendedUser", SuspendedUserSchema);
module.exports = SuspendedUser