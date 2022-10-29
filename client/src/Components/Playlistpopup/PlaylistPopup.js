import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Form from './Form';

const PlaylistPopup = ({id}) => {
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
        <div className='text-center flex items-center justify-center flex-col'>
            <Form playlists={playlists} setPlaylists={setPlaylists} videoId={id}    />
        </div> 
    )
}

export default PlaylistPopup;