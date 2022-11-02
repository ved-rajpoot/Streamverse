import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import VideoCard from '../../Components/VideoCard';

const Playlist = () => {
        const {playlistId} = useParams();
        console.log(playlistId);
        const [videos,setVideos] = useState(null);
        const getVideos = ()=>{
            const data = {playlistId:playlistId};
            console.log('data: ',data);
            axios.post("http://localhost:9002/getvideos", data , {
                headers: {
                    // "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
                }
            })
            .then((res)=>{
                console.log('videos:  ', res.data);
                setVideos(res.data);  
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    useEffect(()=>{
        getVideos();
    },[])

    return (
        <>
            <div>
                Hii {playlistId}
            </div>
            {
                Array.isArray(videos) && videos.map((val,index)=>{
                    return (
                        <VideoCard id={val._id} avatar={val.avatar} thumbnail_avatar={val.thumbnail_avatar} title={val.title} description={val.description} userName={val.userName} cloudinary_id={val.cloudinary_id} />
                    )
                })
            }
        </>
    )
}

export default Playlist