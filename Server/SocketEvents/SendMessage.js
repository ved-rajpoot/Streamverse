const Room = require("../models/Room.model");


const SendMessage = (socket, io) => {
    socket.on("send", (res) => {
        const userID = res.userID;
        const room_id = res.roomID;
        const message = res.message;
        Room.findOne({ _id: room_id })
            .then((room) => {
                const data = room.userArray;
                const index = data.map(e => e.userId).indexOf(userID);
                io.sockets.in(room_id.toString()).emit('recieve', { userName: room.userArray[index].userName , message:message})
            })
            .catch((err) => {
                console.log(err)
            })
    })

}

module.exports = SendMessage;