import React from 'react'
import { useLocation } from 'react-router-dom'
import {DefaultPlayer as Video} from "react-html5video"

const VideoPlayer = () => {
    const location = useLocation();
    console.log(location.state.avatar);
  return (
    <div className='flex w-full'>
        <div className="flex h-screen bg-black">
            <Video
            className='h-screen'>
                <source src={location.state.avatar} type="video/webm"/>
                <track label="English" kind="subtitles" srcLang="en" src="/react-html5video/3f581f9610d039656ad3830864753a94.vtt" default />
                <track label="Español" kind="subtitles" srcLang="es" src="/react-html5video/691c220d6cfe7ead7ad17fc2bd972543.vtt" />
            </Video>
        </div>
        <div className='bg-red-500'>
        </div>
    </div>
  )
}

export default VideoPlayer