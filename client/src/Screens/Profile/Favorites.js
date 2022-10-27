import React, {useState,useEffect} from 'react'
import axios from 'axios';
import VideoCard from '../../Components/VideoCard';

const Favorites = () => {
  const [videoList, setVideoList] = useState(null);
  const [status, setStatus] = useState(false);

  useEffect(() => {
          const data = null;
          axios.post("http://localhost:9002/getfavorites", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
            }
          })
          .then((res) => {
              console.log(res);
              setVideoList(res.data)
          }).then(() => {
              setStatus(true)
          }).catch((err)=>{
              console.log(err);
          })
  }, [])

  return (
            <div className="flex" >
                <div className="flex flex-wrap">
                    {
                        Array.isArray(videoList) ?
                            videoList.map((val, index) => {
                                return (
                                    <>
                                        <VideoCard avatar={val.avatar} thumbnail_avatar={val.thumbnail_avatar} title={val.title} description={val.description} userName={val.userName} cloudinary_id={val.cloudinary_id} />
                                    </>
                                )
                            })
                            : null
                    }
                </div>
            </div>
  )
}

export default Favorites