const RefreshCheck = (socket) => {
    socket.on("refresh-check", async (res) => {
        const room_id = res.roomID
        await socket.join(room_id.toString())
    })
}

module.exports = RefreshCheck;