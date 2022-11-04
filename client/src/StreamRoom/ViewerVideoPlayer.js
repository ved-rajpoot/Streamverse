import { Player, ControlBar, LoadingSpinner, BigPlayButton ,VolumeMenuButton, Shortcut,TimeDivider, CurrentTimeDisplay  } from 'video-react';
import { useLocation } from "react-router-dom"
import { useRef, useEffect, useContext, useState } from 'react';
import SocketContext from '../SocketContext';



const ViewerVideoPlayer = () => {
    const socket = useContext(SocketContext)
    const VideoElement = useRef(null);
    const [source,setSource] = useState("")
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")

    //Disabling Keyboard Shortcuts
    const shortCut = [{ keyCode: 32, ctrl: false, handle: () => { } }, { keyCode: 75, ctrl: false, handle: () => { } }, { keyCode: 39, ctrl: false, handle: () => { } }, { keyCode: 37, ctrl: false, handle: () => { } }, { keyCode: 74, ctrl: false, handle: () => { } }, { keyCode: 76, ctrl: false, handle: () => { } }, { keyCode: 35, ctrl: false, handle: () => { } }, { keyCode: 36, ctrl: false, handle: () => { } },]

    //on Page render
    useEffect(() => {
        socket.emit("fetchVideo", { AdminID: JSON.parse(localStorage.getItem("room")).AdminID });
    })

    //controls functions
    const play = () => VideoElement.current.play();
    const pause = () => VideoElement.current.pause();
    const moveToTimeStamp = (seconds) => VideoElement.current.seek(seconds);
    const changePlayBackSpeed = (speed) => VideoElement.current.playbackRate = speed;

    // socket events
    socket.off("setVideo").on("setVideo", res => {
        const seconds = res.time;
        const url = res.url;
        const videoTitle = res.title;
        const videoDescription = res.description;
        setSource(url);
        setTitle(videoTitle);
        setDescription(videoDescription);
        setTimeout(() => {
            moveToTimeStamp(seconds);
            play();
        },1000)
        
    })

    socket.off('playPlayer').on('playPlayer', () => {
        console.log("here")
        play();
    })
    socket.off('pausePlayer').on('pausePlayer', () => {
        pause();
    })
    socket.off('setTime').on('setTime', (res) => {
        const currentTime = res.currTime
        moveToTimeStamp(currentTime);
    })








    return (
        <div>
            <div className="flex object-cover h-[40rem] w-full">
                <Player ref={VideoElement} src={source} preload = "auto" fluid={false} height="100%" width="100%" autoPlay >
                    <Shortcut clickable={false} shortcuts={shortCut} />
                    <BigPlayButton position="center" />
                    <LoadingSpinner />
                    <ControlBar disableDefaultControls >
                        <VolumeMenuButton />
                        <TimeDivider order={4.2} />
                        <CurrentTimeDisplay order={4.1} />
                    </ControlBar>
                </Player>
            </div>
            <div className='m-3 text-2xl font-bold'>
                {title}
            </div>

            <div className='m-3 text-sm'>
                {description}
            </div>
        </div>
    )
}

export default ViewerVideoPlayer
