import { useState } from 'react'
import "./AudioPlayer.css"
import DefaultImg from "./DefaultImg.jpg"

export default function AudioPlayer(props) {
    const [open, setOpen] = useState(true)
    
    return (
        <>
            <div className='dark:text-white bottom-0 w-[90%] h-[100px] flex justify-end mr-20 items-center'>
                <div className='p-2 ml-5 rounded-lg w-[6%] h-[70px]'>
                    <img className='rounded-xl' src={DefaultImg} />
                </div>
                <div className='ml-5 mr-auto flex flex-col'>
                    <p className=''>
                        {props.audio.title}
                    </p>
                    <p className='text-xs'>
                        {props.audio.userName}
                    </p>
                </div>
                
                <audio className='w-[50%] shadow-xl rounded-2xl opacity-50' src={`http://localhost:9002/file/audio/${props.audio.audioPath}`} autoPlay controls></audio>
            </div>
        </>
    )
}
