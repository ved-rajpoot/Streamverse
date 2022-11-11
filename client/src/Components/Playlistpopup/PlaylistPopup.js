import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Form from './Form';
import { UserContext } from '../../Context/UserContext';

const PlaylistPopup = ({id,type,setPopup}) => {
    const [playlists, setPlaylists] = useState(null);
    const [userState, setUserState] = useContext(UserContext);
    
    const getUserData = ()=>{
        let obj
        if (type === "video") obj = userState.videoPlaylists
        else obj = userState.audioPlaylists
    
        const newArr = obj.map((val, idx) => {
            let isFilePresent = false;
            if ((type === "video" && val.videos.indexOf(id) !== -1) || (type === "audio" && val.audios.indexOf(id) !== -1))
                isFilePresent = true;
            return { isFilePresent: isFilePresent, isEditing: false, ...val };
        })
        setPlaylists(newArr);
    
    }

    useEffect(()=>{
        // console.log(playlists);
        getUserData();
    },[]);

    return (
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
          <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"> 
            <Form playlists={playlists} setPlaylists={setPlaylists} videoId={id} type={type} setPopup={setPopup}/>
            </div>
          </div>
        </div> 
    )
}

export default PlaylistPopup;