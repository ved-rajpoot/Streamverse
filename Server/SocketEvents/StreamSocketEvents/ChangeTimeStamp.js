const ChangTimeStamp = (socket,io) => {
    socket.on("changeTime", (res) => {
        const currTime = res.currentTime;
        const room = res.roomID.toString();
        io.to(room).emit("setTime", { currTime: currTime });
    })
}

module.exports = ChangTimeStamp