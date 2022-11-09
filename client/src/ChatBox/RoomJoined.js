import { CreateMessage, JoinMessage, PinnedMessage, RegularSenderMessage, RegularRecieverMessage, RoomIdMessage } from "./MessageType"
import {SocketContext} from '../Context/SocketContext';
import React, { useContext, useEffect, useState } from 'react';
import { getUserId } from './HelperFunctions';

const RommJoined = (props) => {
    const userID = getUserId()
    const roomID = localStorage.getItem("room") ? JSON.parse(localStorage.getItem("room")).roomID : null
    const socket = useContext(SocketContext)
    const [messageArray, setMessageArray] = useState([]);
    const [textMessage, setTextMessage] = useState("");
    const updateMessageArea = (res) => {
        let newArray = messageArray;
        let data;
        if (res.messageType === "join") data = { id: new Date(), messageType: res.messageType, content: { userName: res.userName } }
        else if (res.messageType === "regular") data = { id: new Date(), messageType: res.messageType, content: { userName: res.userName, message: res.message } }
        else if (res.messageType === "send") data = { id: new Date(), messageType: res.messageType, content: { message: res.message } }
        setMessageArray([...newArray, data]);
        const chatWindow = document.getElementById('MessageArea');
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
    const send = () => {
        if (textMessage === "") return;
        updateMessageArea({ messageType: "send", message: textMessage })
        socket.emit("send", { roomID: roomID, message: textMessage, userID: userID })
        setTextMessage("")
    }

    //Initial render
    useEffect(() => { if (localStorage.getItem("room")) socket.emit("refresh-check", { roomID: JSON.parse(localStorage.getItem("room")).roomID }) })

    //Socket Events
    socket.off('userJoined').on('userJoined', res => {
        updateMessageArea({ messageType: "join", userName: res.userName })
    })
    socket.off('recieve').on('recieve', res => {
        updateMessageArea({ messageType: "regular", userName: res.userName, message: res.message })
    })

    return (
        <>
            <div className='flex flex-col dark:bg-chat-dark bg-chat-light bg-cover bg-center h-full '>
                <div className='flex flex-col h-[540px] '>
                    <div id="MessageArea" className="overflow-auto">
                        <button className="hidden" onClick={updateMessageArea}></button>
                        <PinnedMessage />
                        <CreateMessage
                            creator={props.userName}
                            roomName={props.roomName}
                        />
                        <RoomIdMessage
                            roomID={props.roomID}
                        />

                        {
                            messageArray.map((val) => {
                                if (val.messageType === "join") {
                                    return (
                                        <JoinMessage
                                            key={val.id}
                                            userName={val.content.userName}
                                        />
                                    )
                                } else if (val.messageType === "regular") {
                                    return (
                                        <RegularRecieverMessage
                                            key={val.id}
                                            userName={val.content.userName}
                                            message={val.content.message}
                                        />
                                    )
                                } else if (val.messageType === "send") {
                                    return (
                                        <RegularSenderMessage
                                            key={val.id}
                                            message={val.content.message}
                                        />
                                    )
                                }
                                return (null)
                            })
                        }
                    </div>
                    <div className='flex flex-row bottom-0 justify-center mt-auto gap-2 p-2'>
                        <div >
                            <input type="text" id="small-input" class="block p-2 w-full text-gray-900 bg-gray-50 focus:outline-none rounded-lg border border-gray-300 sm:text-xs dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                autoComplete='off' value={textMessage} onChange={(e) => setTextMessage(e.target.value)}
                            />
                        </div>
                        <button onClick={send} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Icon description</span>
                        </button>

                    </div>
                </div>

            </div>

        </>
    )
}

export default RommJoined