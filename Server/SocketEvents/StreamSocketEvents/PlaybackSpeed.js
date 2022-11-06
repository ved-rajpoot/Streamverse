
const PlaybackSpeed = (socket,io) => {
    socket.on("playbackSpeed", (res) => {
        const room = res.roomID;
        const playbackSpeed = res.playbackSpeed;
        io.to(room).emit("changePlaybackSpeed", { playbackSpeed: playbackSpeed });
    })
}

module.exports = PlaybackSpeed