import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { useEffect, useState } from 'react';
import { JoinMessage, RegularMessage, PinnedMessage, CreateMessage } from './MessageType';
import RommJoined from './RoomJoined';
import RoomNotJoined from './RommNotJoined';
import axios from 'axios';

const Members = ({setShowMembers}) => {
    const [members,setMembers] = useState([]);

    useEffect(()=>{
        const roomId = JSON.parse(localStorage.getItem("room")).roomID;
        axios.post("http://localhost:9002/getmembers", { roomId:roomId }, {
            headers: {
                // "Content-Type": "application/json",
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
            }
        })
        .then((res)=>{
            // console.log(res.data);
            setMembers(res.data);
        })  
        .catch((err)=>{
            console.log(err);
        })
    },[])
    return (
        <div id="crypto-modal" tabindex="-1" aria-hidden="true" class="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-60 w-screen md:inset-0 h-modal md:h-screen bg-opacity-20 bg-gray-300">
    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div class="relative bg-white rounded-lg shadow ">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="crypto-modal" onClick={()=>setShowMembers(false)}>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                <span class="sr-only">Close modal</span>
            </button>
            {/* <!-- Modal header --> */}
            <div class="py-4 px-6 rounded-t border-b">
                <h3 class="text-base font-semibold text-gray-900 lg:text-xl">
                    Members
                </h3>
            </div>
            {/* <!-- Modal body --> */}
            <div class="p-6">
                {/* <p class="text-sm font-normal text-gray-500 ">Connect with one of our available wallet providers or create a new one.</p> */}
                <ul class="my-4 space-y-3 overflow-y-auto">
                    {
                        members.map((member,idx)=>{
                            return (
                                <li>
                                    <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow ">
                                        <span class="flex-1 ml-3 whitespace-nowrap">{member.userName}</span>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    </div>
</div>
    )
}
const Options = ({setJoined,setNotJoined,notJoinedClass}) => {
    const [showOptions, setShowOptions] = useState(false);
    const [showMembers, setShowMembers] = useState(false);

    const leave = () => {
        localStorage.removeItem('room');
        // setNotJoined(notJoinedClass)
        // setJoined("hidden")
        // to be implemented
    }

    return (
    <>
        {
            showMembers && <Members setShowMembers={setShowMembers}/>
        }
    <div class="flex flex-col items-center md:order-2 cursor-pointer">
        <div class="space-y-1" onClick={() => { console.log('click'); setShowOptions(!showOptions) }}>
            <span class="block w-6 h-0.5 bg-white"></span>
            <span class="block w-6 h-0.5 bg-white"></span>
            <span class="block w-6 h-0.5 bg-white"></span>
        </div>
    {/* <!-- Dropdown menu --> */}
    {
        showOptions &&
        <div class="absolute z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shado" id="user-dropdown">
            <ul class="py-1" aria-labelledby="user-menu-button">
                <li>
                    <div href="#" class="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" onClick={() => {setShowMembers(true) }}>Members</div>
                </li>
                <li>
                    <div href="#" class="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" onClick={leave}>Leave</div>
                </li>
            </ul>
        </div>
    }
</div>
    </>
    )
}
const ChatBox = () => {
    const JoinedClass = "h-[90%]"
    const notJoinedClass = "h-[90%]"
    const chatAreaClass = 'flex flex-col fixed right-2 bottom-36 w-[350px] h-[700px] rounded-lg border-4 border-indigo-500/100'

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
            <button id="hidden-btn" className='hidden' onClick={handle}></button>
            <div className={chatArea}>
                <div className='flex justify-center items-center font-mono font-extrabold text-white h-[10%] bg-indigo-500/100 w-full'>
                    <h1>CHATBOX</h1>
                    <div className={`flex ml-5`}><Options setJoined={setJoined} setNotJoined={setNotJoined} notJoinedClass={notJoinedClass}/></div>
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