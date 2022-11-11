import axios from "axios";
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import VideoCard from "../../Components/VideoCard";
import { AudioPlayerContext } from "../../Context/AudioPlayerContext";

const VideoDashboard = () => {
    const navigate = useNavigate()
    const [videoList, setVideoList] = useState(null);
    const [status, setStatus] = useState(false);
    const [audioState, setAudioState] = useContext(AudioPlayerContext);
    
    useEffect(() => {
        setAudioState({...audioState,hide:0})
            const data = null;
            axios.post("http://localhost:9002/recommendations", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
                }
            })
            .then((res) => {
                // console.log(res.data);
                setVideoList(res.data)
            }).then(() => {
                setStatus(true)
            }).catch((err)=>{
                console.log(err);
            })
    }, [])

    if (!status) return (
        <>
            <div className="flex item-center">
                Loading..
            </div>
        </>
    )
    return (
        <>
            <div className="flex" >
                <div className="flex flex-wrap justify-center ">
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
        </>
    )
}

export default VideoDashboard