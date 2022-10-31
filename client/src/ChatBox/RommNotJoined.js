import { useContext, useEffect, useState } from "react";
import SocketContext from '../SocketContext'
import { JoinMessage } from "./MessageType";

const RoomNotJoined = () => {
    const socket = useContext(SocketContext)
    const [showCreateRoom,setShowCreateRoom] = useState(false)
    const [showJoinRoom, setShowJoinRoom] = useState(false)

    const [roomName, setRoomName] = useState("");
    const [createUserName, setCreateUserName] = useState("");
    const [roomID, setRoomID] = useState("");
    const [joinUserName, setJoinUserName] = useState("");
    
    const Create = () => {
        socket.emit("createRoom", { roomName, createUserName }, user => {
            localStorage.setItem("room", JSON.stringify(user))
            document.getElementById("hidden-btn").click();
        })
    }
    

    const Join = () => {
        socket.emit("joinRoom", { roomID, joinUserName }, room => {
            const user = {
                userName: room.userArray[0].userName,
                roomID: room._id,
                roomName : room.roomName
            }
            localStorage.setItem("room", JSON.stringify(user))
            document.getElementById("hidden-btn").click();
            // document.getElementById("messageArea").append(JoinMessage(user))
        })
    }

    return (
        <>
            <div className='flex flex-col bg-[#FAFAFA] justify-center items-center h-[100%]'>
                <p className='font-bold text-center'>You have not joined a room !!</p>
                <br />
                <button className='underline decoration-sky-500 text-blue-600/100' onClick={()=>setShowCreateRoom(true)}>Create new Room</button>
                <p>OR</p>
                <button className='underline decoration-sky-500 text-blue-600/100' onClick={()=>setShowJoinRoom(true)}>Join a Room</button>
            </div>
            {showCreateRoom ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-sm">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Create Room
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900">Room Name</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Enter Your Room Name"
                                        value={roomName}
                                        onChange = {(e)=>setRoomName(e.target.value)}
                                        required />
                                    <br />
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                            
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                
                                <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Join Room
                                    </h3>
                                </div>
                                
                                <div className="relative p-6 flex-auto">
                                    <label  className="block mb-2 text-sm font-medium text-gray-900">Room ID</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Enter Room ID"
                                        value={roomID}
                                        onChange={(e)=>setRoomID(e.target.value)}
                                        required />
                                    <br />
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                    <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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