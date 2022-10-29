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
        // console.log(res.data.playlists);
        setPlaylists(res.data.playlists);
    }

    useEffect(()=>{
        getUserData();
    },[]);

    useEffect(()=>{
        console.log(playlists);
    },[playlists]);

    return (
        <div className='text-center flex items-center justify-center flex-col'>
            <Form playlists={playlists} setPlaylists={setPlaylists} videoId={id}/>
        </div> 
    )
}

export default PlaylistPopup;