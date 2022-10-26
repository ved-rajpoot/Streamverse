import React from 'react'
import { useLocation } from 'react-router-dom'
import {DefaultPlayer as Video} from "react-html5video"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DownloadIcon from '@mui/icons-material/Download';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const VideoPlayer = () => {
    const location = useLocation();
    
  return (
    <div>
        <div>
            <Video className="h-[40rem]">
                <source src={location.state.avatar} type="video/webm"/>
                <track label="English" kind="subtitles" srcLang="en" src="/react-html5video/3f581f9610d039656ad3830864753a94.vtt" default />
                <track label="Español" kind="subtitles" srcLang="es" src="/react-html5video/691c220d6cfe7ead7ad17fc2bd972543.vtt" />
            </Video>
        </div>
        <div className="flex justify-between m-5 scale-y-[1.2]">
          
          <button name="upvote">
            <ThumbUpIcon/>
          </button>
          
          <button name="downvote">
            <ThumbDownIcon/>
          </button>
          
          <button name="download">
            <DownloadIcon/>
          </button>
          
          <button name="addToPlaylist">
            <PlaylistAddIcon/>
          </button>
          

          <button name="favourite">
            <FavoriteBorderIcon/>
          </button>
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

export default VideoPlayer
