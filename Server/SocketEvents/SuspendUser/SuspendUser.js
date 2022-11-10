const SuspendUser = (socket,io) =>{
    socket.on('userSuspended',(res)=>{
        const id= res.id;
        io.to(id.toString()).emit('suspendUser')
    })
}

module.exports = SuspendUser;