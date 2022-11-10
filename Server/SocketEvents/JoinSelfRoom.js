const JoinSelfRoom = (socket) =>{
    socket.on('joinSelfRoom',(res)=>{
        const id = res.id;
        socket.join(id.toString());
    })
}

module.exports = JoinSelfRoom