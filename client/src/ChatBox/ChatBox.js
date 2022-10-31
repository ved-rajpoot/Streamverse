import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { useEffect, useState } from 'react';
import { JoinMessage, RegularMessage, PinnedMessage, CreateMessage } from './MessageType';
import RommJoined from './RoomJoined';
import RoomNotJoined from './RommNotJoined';
const ChatBox = () => {
    const JoinedClass = "h-[90%]"
    const notJoinedClass = "h-[90%]"
    const chatAreaClass = 'flex flex-col fixed right-6 bottom-36 w-[20%] h-[60%] rounded-lg border-4 border-indigo-500/100'

    const [open, setOpen] = useState(0);
    const [classMsg, setClassMsg] = useState("");
    const [classClose, setClassClose] = useState("hidden");
    const [chatArea, setChatArea] = useState("hidden");
    const [joined,setJoined] = useState(localStorage.getItem("room")?JoinedClass : "hidden")
    const [notJoined, setNotJoined] = useState(localStorage.getItem("room") ? "hidden" : notJoinedClass)
    const handleClick = () => {
        if (open === 0) setOpen(1);
        else setOpen(0);
    }
    useEffect(() => {
        if (open === 0) {
            setClassMsg("");
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
            <button id = "hidden-btn" className='hidden' onClick={handle}></button>
            <div className={chatArea}>
                <div className='flex justify-center items-center font-mono font-extrabold text-white h-[10%] bg-indigo-500/100 w-[100%]'>
                    CHATBOX
                </div>
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
            <div className='fixed bottom-20 right-8'>
                <button className=' p-3 shadow-sm bg-purple-500 w-12 h-12 rounded-full flex justify-center' onClick={handleClick}>
                    <div className={classMsg}>
                        <TextsmsOutlinedIcon />
                    </div>
                    <div className={classClose}>
                        <CloseIcon />
                    </div>

                </button>
            </div>

        </>

    )
}

export default ChatBox