const FetchCurrentTime = (socket, io) => {
    socket.on("fetchCurrentTime", (res) => {
        const room = res.roomID.toString();
        io.to(room).emit("getTime",{id : socket.id});
    })
    socket.on("currentVideoTime", (res) => {
        const socketId = res.id;
        const currentTime = res.time;
        io.to(socketId).emit("setCurrentTime", { time: currentTime });
    })
}

module.exports = FetchCurrentTime