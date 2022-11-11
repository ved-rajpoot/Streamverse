import { useRef, useEffect, useContext, useState } from 'react';
import { SocketContext } from '../Context/SocketContext';
import { RoomContext } from '../Context/RoomContext';



const ViewerVideoPlayer = () => {
    const socket = useContext(SocketContext)
    const VideoElement = useRef(null);
    const [source, setSource] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [allowed, setAllowed] = useState(true); // Allow controller to have control;


    //Disabling Keyboard Shortcuts
    const shortCut = [{ keyCode: 32, ctrl: false, handle: () => { } }, { keyCode: 75, ctrl: false, handle: () => { } }, { keyCode: 39, ctrl: false, handle: () => { } }, { keyCode: 37, ctrl: false, handle: () => { } }, { keyCode: 74, ctrl: false, handle: () => { } }, { keyCode: 76, ctrl: false, handle: () => { } }, { keyCode: 35, ctrl: false, handle: () => { } }, { keyCode: 36, ctrl: false, handle: () => { } },]
    const [roomState, setRoomState] = useContext(RoomContext)
    //on Page render
    useEffect(() => {
        socket.emit("fetchVideo", { AdminID: roomState.AdminID });
    })

    //controls functions
    const play = () => VideoElement.current.play();
    const pause = () => VideoElement.current.pause();
    const moveToTimeStamp = (seconds) => VideoElement.current.currentTime = seconds;
    const changePlaybackSpeed = (speed) => VideoElement.current.playbackRate = speed;

    // socket events
    socket.off("setVideo").on("setVideo", res => {
        console.log(res);
        const seconds = res.time;
        const videoPath = res.videoPath;
        const videoTitle = res.title;
        const videoDescription = res.description;
        setSource(videoPath);
        setTitle(videoTitle);
        setDescription(videoDescription);
        setTimeout(() => {
            moveToTimeStamp(seconds);
            play();
        }, 1000)

    })
    socket.off('playPlayer').on('playPlayer', () => {
        if (!allowed) return;
        play();
    })
    socket.off('pausePlayer').on('pausePlayer', () => {
        if (!allowed) return;
        pause();
    })
    socket.off('setTime').on('setTime', (res) => {
        if (!allowed) return;
        const currentTime = res.currTime;
        moveToTimeStamp(currentTime);
    })
    socket.off('changePlaybackSpeed').on('changePlaybackSpeed', (res) => {
        if (!allowed) return;
        const playbackSpeed = res.playbackSpeed;
        changePlaybackSpeed(playbackSpeed);
    })


    return (
        <div className=''>
            {/* <button onClick={() =>VideoElement.current.play()} className='bg-black w-[100px]'>Click</button> */}
            <div className="flex h-[40rem]">
                <video ref={VideoElement} className='w-[70%]' src={`http://localhost:9002/file/video/${source}`} controls={!allowed} controlsList="nodownload" preload='metadata'>

                </video>
            </div>
            <div className='flex flex-row'>
                <div className='m-2 text-2xl dark:text-white font-bold h-20 flex'>
                    {title}
                </div>
            </div>
                <button onClick={() => setAllowed(!allowed)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2  px-4 rounded-md">
                    {allowed ? (<p className='text-xs'>Take Controls</p>) : (<p className='text-md'>AllowAdminControl</p>)}
                </button>

            <div className='m-3 text-md dark:bg-opacity-10 p-3 dark:text-white rounded-3xl bg-gray-200 dark:bg-white'>
                {description}
            </div>

        </div>
    )
}

export default ViewerVideoPlayer
