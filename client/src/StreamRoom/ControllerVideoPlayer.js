import { useLocation } from "react-router-dom"
import { SocketContext } from '../Context/SocketContext';
import { useContext, useEffect } from 'react';
import { useRef } from 'react';



const ControllerVideoPlayer = () => {
    const VideoElement = useRef(null)
    const socket = useContext(SocketContext)
    const location = useLocation();
    const roomID = JSON.parse(localStorage.getItem("room")).roomID
    const callPlay = () => {
        socket.emit("play", { roomID: roomID })
    }
    const callPause = () => {
        socket.emit("pause", { roomID: roomID })
    }
    const callSeek = () => {
        socket.emit("changeTime", { roomID: roomID, currentTime: VideoElement.current.currentTime })
    }
    const callRateChange = () => {
        socket.emit("playbackSpeed", { roomID: roomID, playbackSpeed: VideoElement.current.playbackRate })
    }

    //socket events
    socket.off('getVideo').on('getVideo', (res) => {
        const id = res.id;
        socket.emit("currentVideo", { time: VideoElement.current.currentTime, videoPath: location.state.props.videoPath, title: location.state.props.title, description: location.state.props.description, id: id });
    })



    return (
        <div>
            <div className="flex h-[40rem] w-full bg-black">
                <video ref={VideoElement} width={"100%"} preload="auto" autoPlay={true} controls onPlay={callPlay} onPause={callPause} onSeeked={callSeek} onRateChange={callRateChange} controlsList="nodownload">
                    <source src={`http://localhost:9002/file/video/${location.state.props.videoPath}`} type="video/webm" />
                </video>
            </div>
            <div className='m-3 text-2xl font-bold'>
                {location.state.props.title}
            </div>
            <div className='m-3 text-sm'>
                {location.state.props.description}
            </div>
        </div>
    )
}

export default ControllerVideoPlayer
