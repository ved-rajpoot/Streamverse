import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import VideoCard from '../../Components/VideoCard';
import {useLocation} from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';

const PlaylistVideos = () => {
        const location = useLocation();
        const [loading,setLoading] = useState(true);
        const {id} = useParams();
        console.log(id);
        const [videos,setVideos] = useState(null);
        const getVideos = ()=>{
            console.log(location.state.props.userId);
            // console.log('data: ',data);
            axios.post("http://localhost:9002/getvideos", {userId: location.state.props.userId, playlistId:id})
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
        setLoading(false);
    },[])

    if(loading) return <Loading/>;
    return (
        <>
            <div>
                <div className='ml-5'>
                    <h3 className=''>PLAYLIST</h3>
                    <h1 className='text-5xl'>{location.state.props.name}</h1>
                    <h3>{Array.isArray(videos) && videos.length} videos</h3>
                </div>
            </div>
            <div className='flex flex-wrap'>
            {
                Array.isArray(videos) && videos.map((val,index)=>{
                    return (
                        <VideoCard id={val._id} videoPath={val.videoPath} thumbnailPath={val.thumbnailPath} title={val.title} description={val.description} userName={val.userName} tags={val.tags} views={val.views} userId={val.userId}/>
                    )
                })
                }
            </div>
        </>
    )
}

export default PlaylistVideos