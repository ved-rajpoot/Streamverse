import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { CreateMessage, JoinMessage, PinnedMessage, RegularMessage, RoomIdMessage } from "./MessageType"
import SocketContext from '../SocketContext';
import React, { useContext, useState } from 'react';


const RommJoined = (props) => {
    const roomID = localStorage.getItem("room") ? JSON.parse(localStorage.getItem("room")).roomID : null
    const socket = useContext(SocketContext)
    const [messageArray, setMessageArray] = useState([]);
    const [textMessage, setTextMessage] = useState("");
    const updateMessageArea = (res) => {
        let newArray = messageArray;
        let data;
        if(res.messageType === "join") data = { id: new Date(), messageType: res.messageType, content: { userName: res.userName } }
        else if(res.messageType === "regular") data = { id: new Date(), messageType: res.messageType, content: { userName: res.userName , message: res.message} }
        setMessageArray([...newArray, data]);
    }
    const send = () => {
        if (textMessage === "") return;
        socket.emit("send",{roomID : roomID,message:textMessage})
    }
    socket.off('userJoined').on('userJoined', res => {
        updateMessageArea({ messageType: "join", userName: res.userName })
    })
    socket.off('recieve').on('recieve', res => {
        updateMessageArea({ messageType: "regular", userName: res.userName, message: res.message })
    })
    
    return (
        <>
                <div id = "MessageArea" className='flex flex-col bg-[#FAFAFA] h-[86%] overflow-auto'>
                <button className = "hidden" onClick={updateMessageArea}></button>
                <CreateMessage 
                    creator={props.userName}
                    roomName = {props.roomName}
                />
                <RoomIdMessage 
                    roomID={props.roomID}
                />
                
                {
                    messageArray.map((val) => {
                        if (val.messageType === "join") {
                            return (
                                <JoinMessage
                                    key = {val.id}
                                    userName={val.content.userName}
                                />
                            )
                        } else if (val.messageType === "regular") {
                            return (
                                <RegularMessage
                                    key={val.id}
                                    userName={val.content.userName}
                                    message = {val.content.message}
                                />
                            )
                        }
                        return (null)
                    })
                }
                </div>
                <div className='flex flex-row p-1 sticky justify-center bottom-0 h-[14%] bg-white'>
                    <div className='w-[75%]'>
                    <TextField id="outlined-basic" label="Type Your Message" variant="outlined" value={textMessage} onChange={(e)=>setTextMessage(e.target.value)} />
                    </div>
                    <button className='my-1 mx-1 shadow-sm bg-purple-500 w-11 h-11 rounded-lg flex justify-center items-center' onClick={send}>
                        <SendIcon />
                    </button>
                </div>
        </>
    )
}

export default RommJoined