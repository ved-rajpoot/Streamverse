import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import VideoCard from "../../Components/VideoCard";

const VideoDashboard = () => {
    const navigate = useNavigate()
    const [videoList, setVideoList] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
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
                setLoading(false);
            }).catch((err)=>{
                console.log(err);
            })
    }, [])

    if(loading) return <Loading/>;
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