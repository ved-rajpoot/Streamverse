const FetchVideo = (socket, io) => {
    socket.on("fetchVideo", (res) => {
        // console.log(res)
        const admin = res.AdminID;
        io.to(admin).emit("getVideo", { id: socket.id });
    })
    socket.on("currentVideo", (res) => {
        // console.log(res)

        const socketId = res.id;
        const currentTime = res.time;
        const videoPath = res.videoPath;
        const description = res.description;
        const title = res.title;
        io.to(socketId).emit("setVideo", { videoPath: videoPath, title: title, description: description, time: currentTime });
    })
}

module.exports = FetchVideo