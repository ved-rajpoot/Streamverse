import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const VideoPlaylists = (props) => {
  const navigate = useNavigate();
  const playlists = props.playlists;
  return (
    <>
      {
        Array.isArray(playlists) && playlists.map((playlist,idx)=>{
        return (
                <div className="mb-2 shadow-xl flex flex-row justify-center w-[100%] bg-white cursor-pointer" onClick={()=>{console.log(props.userId);navigate(`/app/:userId/playlist/video/${playlist._id}`, {state: {props:{userId: props.userId,name:playlist.name}}})}}>
                <div className="bg-white flex flex-row rounded-r p-2 leading-normal w-full mb-2 ml-4">
                    <div className="text-gray-900 font-bold text-sm mb-2 text-left">{idx+1}.  {playlist.name}</div>
                </div>
                </div>
          )
        })
      }
    </>
  )
}

export default VideoPlaylists