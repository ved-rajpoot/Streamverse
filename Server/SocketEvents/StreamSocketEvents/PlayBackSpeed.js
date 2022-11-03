
const PlayBackSpeed = (socket,io) => {
    socket.on("playBackSpeed", (res) => {
        const room = res.roomID;
        const playBackSpeed = res.playBackSpeed;
        io.to(room).emit("changePlayBackSpeed", { playBackSpeed: playBackSpeed });
    })
}

module.exports = PlayBackSpeed