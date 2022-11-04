
const PauseVideo = (socket,io) => {
    socket.on("pause", (res) => {
        const room = res.roomID;
        io.to(room).emit("pausePlayer");
    })
}

module.exports = PauseVideo