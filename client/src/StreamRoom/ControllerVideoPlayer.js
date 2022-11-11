import { useLocation } from "react-router-dom"
import { SocketContext } from '../Context/SocketContext';
import { useContext, useEffect } from 'react';
import { useRef } from 'react';
import { RoomContext } from "../Context/RoomContext";



const ControllerVideoPlayer = () => {
    const VideoElement = useRef(null)
    const socket = useContext(SocketContext)
    const [roomState, setRoomState] = useContext(RoomContext);

    const location = useLocation();
    const callPlay = () => {
        socket.emit("play", { roomID: roomState.roomId })
    }
    const callPause = () => {
        socket.emit("pause", { roomID: roomState.roomId })
    }
    const callSeek = () => {
        socket.emit("changeTime", { roomID: roomState.roomId, currentTime: VideoElement.current.currentTime })
    }
    const callRateChange = () => {
        socket.emit("playbackSpeed", { roomID: roomState.roomId, playbackSpeed: VideoElement.current.playbackRate })
    }

    //socket events
    socket.off('getVideo').on('getVideo', (res) => {
        const id = res.id;
        socket.emit("currentVideo", { time: VideoElement.current.currentTime, videoPath: location.state.props.videoPath, title: location.state.props.title, description: location.state.props.description, id: id });
    })



    return (
        <div className="dark:text-white">
            <div className="flex h-[40rem]">
                <video ref={VideoElement} className='w-[70%]' src={`http://localhost:9002/file/video/${location.state.props.videoPath}`} controls preload='metadata' onPlay={callPlay} onPause={callPause} onSeeked={callSeek} onRateChange={callRateChange} controlsList="nodownload">

                </video>
            </div>
            <div className='m-3 text-2xl font-bold h-20 flex'>
                {location.state.props.title}
            </div>

            <div className='m-3 text-md dark:bg-opacity-10 p-3 rounded-3xl bg-gray-200 dark:bg-white'>
                {location.state.props.description}
            </div>
        </div>
    )
}

export default ControllerVideoPlayer
