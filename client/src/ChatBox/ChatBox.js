import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { JoinMessage, RegularMessage, PinnedMessage, CreateMessage } from './MessageType';
const ChatBox = () => {

    const [open, setOpen] = useState(0);
    const [classMsg, setClassMsg] = useState("");
    const [classClose, setClassClose] = useState("hidden");
    const [chatArea, setChatArea] = useState("hidden");
    const chatAreaClass = 'flex flex-col fixed right-6 bottom-36 w-[20%] h-[60%] rounded-lg border-4 border-indigo-500/100'
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
    return (

        <>
            <div className={chatArea}>
                <div className='flex justify-center items-center font-mono font-extrabold text-white h-[10%] bg-indigo-500/100 w-[100%]'>
                    CHATBOX
                </div>
                {/* <div className='flex flex-col bg-[#FAFAFA] justify-center items-center h-[90%]'>
                    <p className='font-bold'>You have not joined a room !!</p>
                    <br />
                    <button className='underline decoration-sky-500 text-blue-600/100'>Create new Room</button>
                    <p>OR</p>
                    <button className='underline decoration-sky-500 text-blue-600/100'>Join a Room</button>
                </div> */}
                <div className='flex flex-col bg-[#FAFAFA] h-[78%] overflow-auto'>
                    <PinnedMessage />
                    <CreateMessage />
                    <JoinMessage />
                    <RegularMessage />
                    <RegularMessage />
                    <JoinMessage />
                    <RegularMessage />
                    <RegularMessage />
                    
                    
                </div>
                <div className='flex flex-row p-1 sticky bottom-0 h-[12%] bg-white'>
                    <div className='w-[80%]'>
                         <TextField id="outlined-basic" label="Type Your Message" variant="outlined" />
                    </div>
                    <button className='my-1 mx-1 shadow-sm bg-purple-500 w-11 h-11 rounded-lg flex justify-center items-center'>
                        <SendIcon />
                    </button>
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