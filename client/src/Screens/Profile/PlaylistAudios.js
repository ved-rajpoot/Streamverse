import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import VideoCard from '../../Components/VideoCard';
import AudioCard from '../../Components/AudioCard';
import {useLocation} from 'react-router-dom';

const PlaylistVideos = () => {
        const location = useLocation();

        const {playlistId} = useParams();
        // console.log(playlistId);
        const [audios,setAudios] = useState(null);
        const getAudios = ()=>{
            const data = {playlistId:playlistId};
            // console.log('data: ',data);
            axios.post("http://localhost:9002/getaudios", data , {
                headers: {
                    // "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
                }
            })
            .then((res)=>{
                // console.log('audios:  ', res.data);
                setAudios(res.data);  
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    useEffect(()=>{
        getAudios();
    },[])

    return (
        <>
            <div>
                <div className='ml-5'>
                    <h3 className=''>PLAYLIST</h3>
                    <h1 className='text-5xl'>{location.state.props.name}</h1>
                    <h3>{Array.isArray(audios) && audios.length} audios</h3>
                </div>
            </div>
            <div className='flex flex-wrap'>
            {
                Array.isArray(audios) && audios.map((val,index)=>{
                    return (
                        <AudioCard id={val._id} avatar={val.avatar} thumbnail_avatar={val.thumbnail_avatar} title={val.title} description={val.description} userName={val.userName} cloudinary_id={val.cloudinary_id} />
                    )
                })
                }
            </div>
        </>
    )
}

export default PlaylistVideos