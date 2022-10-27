import React,{useEffect,useState} from 'react'
import axios from 'axios';
import VideoCard from '../../Components/VideoCard.js'
const Videos = () => {
        
    const [userVideos, setUserVideos] = useState();
    useEffect(()=>{
        const data = null;
        axios.post("http://localhost:9002/getuservideos", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
            }
        })
        .then((res)=>{
            console.log(res.data);
            setUserVideos(res.data);
        })
    },[])

    return (
        <div className="flex" >
        <div className="flex flex-wrap">
            {
                Array.isArray(userVideos) ?
                    userVideos.map((val, index) => {
                        {/* console.log(index); */}
                        return (
                            <>
                                <VideoCard id={val._id} avatar={val.avatar} thumbnail_avatar={val.thumbnail_avatar} title={val.title} description={val.description} userName={val.userName} cloudinary_id={val.cloudinary_id} />
                            </>
                        )
                    })
                    : null
            }
        </div>
    </div>
  )
}

export default Videos