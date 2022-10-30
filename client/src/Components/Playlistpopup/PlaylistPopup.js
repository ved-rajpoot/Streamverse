import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Form from './Form';

const PlaylistPopup = ({id,setPopup}) => {
    const [playlists, setPlaylists] = useState(null);

    const getUserData = async ()=>{
        const data = null;
        const res = await axios.post("http://localhost:9002/getuserdata", { id: null }, {
             headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
             }
        })

        // isVideoPresent means if current video is present in the playlist or not.
        const newArr = res.data.playlists.map((val,idx)=>{
            let isVideoPresent = false;
            if(val.videos.indexOf(id)!==-1) isVideoPresent = true;
            return {isVideoPresent:isVideoPresent,isEditing:false,...val};
        })
        setPlaylists(newArr);
    }

    useEffect(()=>{
        console.log('id: ',id);
        getUserData();
    },[]);

    useEffect(()=>{
        console.log(playlists);
    },[playlists]);

    return (
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
          <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"> 
            <Form playlists={playlists} setPlaylists={setPlaylists} videoId={id} setPopup={setPopup}/>
            </div>
          </div>
        </div> 
    )
}

export default PlaylistPopup;