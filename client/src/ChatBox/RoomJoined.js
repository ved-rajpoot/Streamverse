import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { CreateMessage, JoinMessage, PinnedMessage, RegularMessage, RoomIdMessage } from "./MessageType"
import SocketContext from '../SocketContext';
import React, { useContext, useEffect, useState } from 'react';


const RommJoined = (props) => {
    const socket = useContext(SocketContext)
    useEffect(() => {
        socket.off('userJoined').on('userJoined', res => {
            console.log("hi")
        })
    }, [socket])
    const [messageArray, setMessageArray] = useState([]);
    const click = () => {

        let newArray = messageArray;
        const data = { id: 1, messageType: "join", content: { userName: "aditya" } }
        setMessageArray([...newArray,data]);
        console.log(messageArray)
    }
    
    return (
        <>
                <div id = "MessageArea" className='flex flex-col bg-[#FAFAFA] h-[86%] overflow-auto'>
                <CreateMessage 
                    creator={props.userName}
                    roomName = {props.roomName}
                />
                <RoomIdMessage 
                    roomID={props.roomID}
                />
                
                <button onClick={click}>add</button>
                {
                    messageArray.map((val) => {
                        if (val.messageType === "join") {
                            return (
                                <JoinMessage
                                    key = {val.id}
                                    userName={val.content.userName}
                                />
                            )
                        }
                    })
                }
                </div>
                <div className='flex flex-row p-1 sticky justify-center bottom-0 h-[14%] bg-white'>
                    <div className='w-[75%]'>
                        <TextField id="outlined-basic" label="Type Your Message" variant="outlined" />
                    </div>
                    <button className='my-1 mx-1 shadow-sm bg-purple-500 w-11 h-11 rounded-lg flex justify-center items-center'>
                        <SendIcon />
                    </button>
                </div>
        </>
    )
}

export default RommJoined