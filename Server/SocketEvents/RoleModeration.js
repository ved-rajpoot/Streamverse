const RoleModeration = (socket,io) => {
    socket.on("kickFromRoom", res => {
        const userId = res.id;
        const roomId = res.roomId;
        
        socket.to(userId.toString()).emit('requestKick');
    }) 
}
module.exports =  RoleModeration