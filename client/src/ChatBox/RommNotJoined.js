import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../Context/RoomContext";
import {SocketContext} from '../Context/SocketContext'
import { UserContext } from "../Context/UserContext";
import { getUserId } from "./HelperFunctions";


const RoomNotJoined = () => {
    const [userState, setUserState] = useContext(UserContext);
    const userID = userState.userId
    const socket = useContext(SocketContext)
    const [roomState, setRoomState] = useContext(RoomContext);
    const [showCreateRoom, setShowCreateRoom] = useState(false)
    const [showJoinRoom, setShowJoinRoom] = useState(false)

    const [roomName, setRoomName] = useState("");
    const [createUserName, setCreateUserName] = useState("");
    const [roomID, setRoomID] = useState("");
    const [joinUserName, setJoinUserName] = useState("");

    const Create = () => {
        socket.emit("createRoom", { roomName, createUserName, userID }, res => {
            console.log(res.room);
            setRoomState({
                roomName: res.room.roomName,
                userName: createUserName,
                roomId: res.room._id,
                AdminID: res.room.AdminID,
                role:"Admin",
                userArray: res.room.userArray
            })
            setShowCreateRoom(false)
            setRoomName("");
            setCreateUserName("");
            localStorage.setItem("room", JSON.stringify(res.room._id))
            document.getElementById("roomjoined-btn").click();
            document.getElementById("joinroom-btn").click();
        })
    }


    const Join = () => {
        socket.emit("joinRoom", { roomID, joinUserName, userID }, res => {
            console.log(res)
            setRoomState({
                roomName: res.roomName,
                userName: joinUserName, 
                roomId: res._id,
                AdminID: res.AdminID,
                role:"Member",
                userArray: res.userArray,
            })
            setShowJoinRoom(false)
            setRoomID("");
            setJoinUserName("");
            localStorage.setItem("room", JSON.stringify(res._id))
            document.getElementById("joinroom-btn").click();
            document.getElementById("roomjoined-btn").click();
        })
    }

    return (
        <>
            <div className='flex flex-col bg-[#F9FAFB] dark:bg-[#374151] justify-center items-center h-[550px]'>
                <p className='font-bold text-center dark:text-white'>You have not joined a room !!</p>
                <br />
                <button className='underline decoration-sky-500 text-blue-600/100' onClick={() => setShowCreateRoom(true)}>Create new Room</button>
                <p className="dark:text-white">OR</p>
                <button className='underline decoration-sky-500 text-blue-600/100' onClick={() => setShowJoinRoom(true)}>Join a Room</button>
            </div>
            {showCreateRoom ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-sm">
                            {/*content*/}
                            <div className="border-0 dark:bg-[#111827] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl dark:text-white font-semibold">
                                        Create Room
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <label className="block mb-2 text-sm font-medium dark:text-white text-gray-900">Room Name</label>
                                    <input
                                        className="bg-gray-50 dark:bg-[#374151] focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="Enter Your Room Name"
                                        value={roomName}
                                        onChange={(e) => setRoomName(e.target.value)}
                                        required />
                                    <br />
                                    <label className="block mb-2 text-sm font-medium dark:text-white text-gray-900">Username</label>
                                    <input
                                        className="bg-gray-50 dark:bg-[#374151] focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="Enter your username for room"
                                        value={createUserName}
                                        onChange={(e) => setCreateUserName(e.target.value)}
                                        required />

                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            setRoomName("")
                                            setCreateUserName("")
                                            setShowCreateRoom(false)
                                        }}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={Create}
                                    >
                                        Create Room
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            {showJoinRoom ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-sm">

                            <div className="border-0 dark:bg-[#111827] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl dark:text-white font-semibold">
                                        Join Room
                                    </h3>
                                </div>

                                <div className="relative p-6 flex-auto">
                                    <label className="block mb-2 dark:text-white text-sm font-medium text-gray-900">Room ID</label>
                                    <input
                                        className="bg-gray-50 dark:bg-[#374151] focus:outline-none dark:placeholder-gray-400 dark:text-white text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="Enter Room ID"
                                        value={roomID}
                                        onChange={(e) => setRoomID(e.target.value)}
                                        required />
                                    <br />
                                    <label className="block mb-2 dark:text-white text-sm font-medium text-gray-900">Username</label>
                                    <input
                                        className="bg-gray-50 dark:bg-[#374151] focus:outline-none dark:placeholder-gray-400 dark:text-white text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        placeholder="Enter your username for room"
                                        value={joinUserName}
                                        onChange={(e) => setJoinUserName(e.target.value)}
                                        required />

                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                            setRoomID("")
                                            setJoinUserName("")
                                            setShowJoinRoom(false)
                                        }}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={Join}
                                    >
                                        Join Room
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

        </>
    )
}

export default RoomNotJoined;