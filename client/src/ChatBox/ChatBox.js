import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { useEffect, useState } from 'react';
import { JoinMessage, RegularMessage, PinnedMessage, CreateMessage } from './MessageType';
import RommJoined from './RoomJoined';
import RoomNotJoined from './RommNotJoined';
import axios from 'axios';


const ChatBox = () => {
    const JoinedClass = "h-[90%]"
    const notJoinedClass = "h-[90%]"
    const chatAreaClass = 'flex flex-col w-[350px] h-[60%] rounded-lg border-4 dark:border-[#00212B] border-indigo-500/100'

    const [open, setOpen] = useState(0);
    const [classMsg, setClassMsg] = useState("");
    const [classClose, setClassClose] = useState("hidden");
    const [chatArea, setChatArea] = useState("hidden");
    const [joined, setJoined] = useState(localStorage.getItem("room") ? JoinedClass : "hidden")
    const [notJoined, setNotJoined] = useState(localStorage.getItem("room") ? "hidden" : notJoinedClass)

    const handleClick = () => {
        if (open === 0) setOpen(1);
        else setOpen(0);
    }
    useEffect(() => {
        if (open === 0) {
            setClassMsg("dark:border-white");
            setClassClose("hidden");
            setChatArea("hidden")
        } else {
            setClassMsg("hidden");
            setClassClose("");
            setChatArea(chatAreaClass)
        }
    }, [open])
    const handle = () => {
        console.log("clicked")
        setJoined(JoinedClass)
        setNotJoined("hidden")
    }


    return (

        <>
            <button id="hidden-btn" className='hidden' onClick={handle}></button>
            <div className='flex flex-col fixed bottom-10 right-4'>
                <div className={chatArea}>
                    <div className='flex justify-center items-center font-mono font-extrabold text-white h-[15%] dark:bg-[#00212B] bg-indigo-500/100 w-full'>
                        <h1>CHATBOX</h1>
                    </div>
                    <div className='h-[90%]'>
                        <div className={joined}>
                            <RommJoined
                                roomID={(localStorage.getItem("room")) ? JSON.parse(localStorage.getItem("room")).roomID : null}
                                roomName={(localStorage.getItem("room")) ? JSON.parse(localStorage.getItem("room")).roomName : null}
                                userName={(localStorage.getItem("room")) ? JSON.parse(localStorage.getItem("room")).userName : null}
                            />
                        </div>
                        <div className={notJoined}>
                            <RoomNotJoined />
                        </div>
                    </div>

                </div>
                <div className='flex justify-end mt-1'>
                    <button className=' p-3 shadow-lg dark:bg-[#002B36] bg-[#1A56DB] w-12 h-12 rounded-full flex justify-center' onClick={handleClick}>
                        <div className={classMsg}>
                            <TextsmsOutlinedIcon className='fill-white dark:fill-white' />
                        </div>
                        <div className={classClose}>
                            <CloseIcon className='fill-white dark:fill-white' />
                        </div>

                    </button>
                </div>

            </div>
            
        </>

    )
}

export default ChatBox