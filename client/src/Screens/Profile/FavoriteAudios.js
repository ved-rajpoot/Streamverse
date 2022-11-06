import React, {useState,useEffect} from 'react'
import axios from 'axios';
import VideoCard from '../../Components/VideoCard';
import AudioCard from '../../Components/AudioCard';

const FavoriteVideos = () => {
  const [audioList, setAudioList] = useState(null);
  const [status, setStatus] = useState(false);

  useEffect(() => {
          const data = null;
          axios.post("http://localhost:9002/getfavoriteaudios", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
            }
          })
          .then((res) => {
            //   console.log(res);
              setAudioList(res.data)
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
                        Array.isArray(audioList) ?
                            audioList.map((val, index) => {
                                return (
                                    <>
                                        <AudioCard id={val._id} avatar={val.avatar} thumbnail_avatar={val.thumbnail_avatar} title={val.title} description={val.description} userName={val.userName} cloudinary_id={val.cloudinary_id} />
                                    </>
                                )
                            })
                            : null
                    }
                </div>
            </div>
  )
}

export default FavoriteVideos