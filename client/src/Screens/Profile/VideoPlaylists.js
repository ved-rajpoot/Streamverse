import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const VideoPlaylists = ({playlists}) => {
  const navigate = useNavigate();

  return (
    <>
      {
        Array.isArray(playlists) && playlists.map((playlist,idx)=>{
        return (
                <div className="mb-2 shadow-xl flex flex-row justify-center w-[100%] bg-white cursor-pointer" onClick={()=>navigate(`/videoplaylists/${playlist._id}`, {state: {props:{name:playlist.name}}})}>
                <div className="bg-white flex flex-row rounded-r p-2 leading-normal w-full mb-2 ml-4">
                    <div className="text-gray-900 font-bold text-sm mb-2 text-left">{playlist.name}</div>
                </div>
                </div>
          )
        })
      }
    </>
  )
}

export default VideoPlaylists