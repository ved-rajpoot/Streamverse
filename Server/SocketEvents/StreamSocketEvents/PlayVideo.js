
const PlayVideo = (socket,io) => {
    socket.on("play", (res) => {
        const room = res.roomID;
        io.to(room).emit("playPlayer");
    })
}

module.exports = PlayVideo