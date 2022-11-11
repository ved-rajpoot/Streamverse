import { Outlet, useNavigate } from "react-router-dom";
import Switch from "../Switch/Switch";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import TvIcon from '@mui/icons-material/Tv';
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import Header from "./Header"
import ChatBox from "../ChatBox/ChatBox";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import Members from "./Members";
import { SocketContext } from "../Context/SocketContext";
import { RoomContext } from "../Context/RoomContext";
import RoomClosedModal from "./RoomClosedModal";
import AudioPlayer from "../Screens/player/AudioPlayer";

const Home = () => {
    const [userState, setUserState] = useContext(UserContext)
    const [roomState, setRoomState] = useContext(RoomContext)
    const [hideRoom, setHideRoom] = useState(localStorage.getItem("room") ? false : true);
    const navigate = useNavigate();
    const socket = useContext(SocketContext);
    const defaultUserState = {
        userId: null,
        userName: null,
        email: null,
    }
    const [showMembers, setShowMembers] = useState(false);
    useEffect(() => {
        console.log(roomState)
    },[roomState,setRoomState])
    /* OnClick Functions*/  
    const Click1 = () => {
        if (document.getElementById("dropdown1").classList.contains("hidden")) {
            document.getElementById("dropdown1").classList.remove("hidden");
        } else {
            document.getElementById("dropdown1").classList.add("hidden")
        }
    }
    const Click2 = () => {
        if (document.getElementById("dropdown2").classList.contains("hidden")) {
            document.getElementById("dropdown2").classList.remove("hidden");
        } else {
            document.getElementById("dropdown2").classList.add("hidden")
        }
    }
    const Click3 = () => {
        if (document.getElementById("dropdown3").classList.contains("hidden")) {
            document.getElementById("dropdown3").classList.remove("hidden");
        } else {
            document.getElementById("dropdown3").classList.add("hidden")
        }
    }
    const Click4 = () => {
        if (document.getElementById("dropdown4").classList.contains("hidden")) {
            document.getElementById("dropdown4").classList.remove("hidden");
        } else {
            document.getElementById("dropdown4").classList.add("hidden")
        }
    }
    const ViewMembers = () => { setShowMembers(true) }

    /*Socket Events / Room Functions*/
    socket.off('suspendUser').on('suspendUser',()=>{
        navigate(`/logout`);
    })
    const LeaveRoom = (type) => {
        console.log(roomState)
        socket.emit('leaveRoom', { roomID: roomState.roomId, userName: roomState.userName, userID: userState.userId, type: type, role:roomState.role })
        localStorage.removeItem("room")
        document.getElementById("resetmessage-btn").click();
        document.getElementById("leaveroom-btn").click();
        document.getElementById("room-btn").click();
        setTimeout(() => {
            setRoomState({
                roomId: "",
                roomName: "",
                AdminID: "",
                role: "",
                userArray: [{userName:"",userID:"",role:""}]
            })
        },200)
        setHideRoom(true);
        navigate(`/app/${userState.userId}/dashboard/video`)
    }
    socket.off('roomClosed').on('roomClosed', (res) => {
        LeaveRoom("leave");
        return <RoomClosedModal userName = {res.userName} />
    })
    socket.off('requestKick').on('requestKick', () => {
        console.log("res")
        LeaveRoom("kick")
    })
    // useEffect(() => { }, [hideRoom]);
    /*Navigation Routes */
    const navigateVideo = () => { navigate(`/app/${userState.userId}/dashboard/video`) }
    const navigateAudio = () => { navigate(`/app/${userState.userId}/dashboard/audio`) }
    const navigateUploadVideo = () => { navigate(`/app/${userState.userId}/upload/video`) }
    const navigateUploadAudio = () => { navigate(`/app/${userState.userId}/upload/audio`) }
    const navigateVideoPlaylist = () => { navigate(`/app/${userState.userId}/playlist/video` , {state:{props:{userId:userState.userId, playlists:userState.videoPlaylists}}}) }
    const navigateAudioPlaylist = () => { navigate(`/app/${userState.userId}/playlist/audio`) }
    const navigateProfile = () => { navigate(`/app/${userState.userId}/profile`) }
    const logOut = () => {
        setUserState(defaultUserState);
        navigate(`/logout`)
    }

    return (
        <>
            <div className="h-screen w-[100%] dark:bg-[#121212] flex flex-col">
                <div className="h-[8%]">
                    <Header />
                </div>
                <div className="flex flex-row h-[90%]">
                    <div >
                        <aside class="w-64  hidden md:block" aria-label="Sidebar">
                            <div class="h-[90%] ml-2 mr-2  mt-2  overflow-y-auto py-4 px-3 bg-gray-50 rounded-lg shadow-lg dark:bg-[#1E1E1C]">
                                <ul class="space-y-2">
                                    <li>
                                        <button onClick={Click1} type="button" class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown1" data-collapse-toggle="dropdown1">
                                            <svg aria-hidden="true" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                            <span class="flex-1 ml-3 text-left text-xl font-bold whitespace-nowrap" sidebar-toggle-item="">Dashboard</span>
                                            <svg sidebar-toggle-item="" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </button>
                                        <ul id="dropdown1" class="hidden py-2 space-y-2">
                                            <li>
                                                <button onClick={navigateVideo} class="flex items-center p-2 pl-11 w-full text-base font-bold text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Video</button>
                                            </li>
                                            <li>
                                                <button onClick={navigateAudio} class="flex items-center p-2 pl-11 w-full text-base font-bold text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Audio</button>
                                            </li>

                                        </ul>
                                    </li>
                                    <li>
                                        <button onClick={Click2} type="button" class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown2" data-collapse-toggle="dropdown2">
                                            <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                                            <span class="flex-1 ml-3 text-left text-xl font-bold whitespace-nowrap" sidebar-toggle-item="">Upload</span>
                                            <svg sidebar-toggle-item="" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </button>
                                        <ul id="dropdown2" class="hidden py-2 space-y-2">
                                            <li>
                                                <button onClick={navigateUploadVideo} class="flex items-center p-2 pl-11 w-full text-base font-bold text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Video</button>
                                            </li>
                                            <li>
                                                <button onClick={navigateUploadAudio} class="flex items-center p-2 pl-11 w-full text-base font-bold text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Audio</button>
                                            </li>

                                        </ul>
                                    </li>
                                    <li>
                                        <button onClick={Click3} type="button" class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown3" data-collapse-toggle="dropdown3">
                                            <PlaylistAddIcon />
                                            <span class="flex-1 ml-3 text-left text-xl font-bold whitespace-nowrap" sidebar-toggle-item="">Playlist</span>
                                            <svg sidebar-toggle-item="" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </button>
                                        <ul id="dropdown3" class="hidden py-2 space-y-2">
                                            <li>
                                                <button onClick={navigateVideoPlaylist} class="flex items-center p-2 pl-11 w-full text-base font-bold text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Video</button>
                                            </li>
                                            <li>
                                                <button onClick={navigateAudioPlaylist} class="flex items-center p-2 pl-11 w-full text-base font-bold text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Audio</button>
                                            </li>

                                        </ul>
                                    </li>
                                    <li>
                                        <button id="room-btn" onClick={Click4} disabled={hideRoom} type="button" class="flex items-center p-2 w-full text-base font-normal disabled:opacity-25 text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown4" data-collapse-toggle="dropdown4">
                                            <TvIcon />
                                            <button id="roomjoined-btn" onClick={() => setHideRoom(false)} className="hidden"></button>
                                            <span class="flex-1 ml-3 text-left text-xl font-bold whitespace-nowrap" sidebar-toggle-item="">Room</span>
                                            <svg sidebar-toggle-item="" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </button>
                                        <ul id="dropdown4" class="hidden py-2 space-y-2">
                                            <li className="flex items-center w-full transition duration-75 group hover:bg-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                <i class='fas fa-users ml-5'></i>
                                                <button onClick={ViewMembers} class="flex items-center p-2 ml-1 text-base font-bold text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Members</button>
                                                {showMembers ? <Members setShowMembers={setShowMembers} /> : null}
                                            </li>
                                            <li className="flex items-center w-full transition duration-75 group hover:bg-gray-100 rounded-lg dark:text-white dark:hover:bg-gray-700">
                                                <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 ml-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                                                <button onClick={()=>LeaveRoom("leave")} class="flex items-center p-2 text-base font-bold text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Leave Room</button>
                                            </li>

                                        </ul>
                                    </li>

                                    <li>
                                        <button onClick={navigateProfile} class="flex w-full items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                            <span class="flex-1 ml-3 text-left text-xl font-bold whitespace-nowrap">Profile</span>
                                        </button>
                                    </li>

                                    <li>
                                        <button onClick={logOut} class="flex w-full items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                                            <span class="flex-1 ml-3 text-left text-xl font-bold whitespace-nowrap">Log Out</span>
                                        </button>
                                    </li>

                                </ul>
                                <div className="flex py-4 px-4">
                                    <p className="mx-2 text-md text-gray-500 font-bold dark:text-white">Light/dark</p>
                                    <Switch />
                                </div>

                            </div>
                        </aside>

                    </div>
                    <div className="flex flex-col ml-4 w-[98%] md:w-[85%] bottom-0 h-[97%] mt-2">
                        <div className="flex flex-col overflow-y-auto scrollbar-default py-4 px-3 bg-gray-50 rounded-lg shadow-lg dark:bg-[#1E1E1C] h-[100%] w-[98%]">
                            <Outlet />
                            <div className="mt-auto h-24 w-full bg-[#EBEDEF] shadow-lg rounded-lg opacity-80 dark:bg-[#121212]">
                                <AudioPlayer />
                            </div>
                        
                        </div>
                    </div>
                    
                </div>
                <ChatBox />
            </div>
        </>
    )
}
export default Home;