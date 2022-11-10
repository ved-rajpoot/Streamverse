import React, {useState,useEffect} from 'react'
import axios from 'axios';
import VideoCard from '../../Components/VideoCard';

const FavoriteVideos = (props) => {
  const [videoList, setVideoList] = useState(null);
  const [status, setStatus] = useState(false);

  useEffect(() => {
          axios.post("http://localhost:9002/getfavoritevideos", {userId:props.userId})
          .then((res) => {
            //   console.log(res);
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
                                        <VideoCard id={val._id} videoPath={val.videoPath} thumbnailPath={val.thumbnailPath} title={val.title} description={val.description} userName={val.userName} tags={val.tags} views={val.views} userId={val.userId}/>
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