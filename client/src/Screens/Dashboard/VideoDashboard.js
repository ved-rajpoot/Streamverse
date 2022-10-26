import axios from "axios";
import { useEffect, useState } from "react"
import "react-html5video/dist/styles.css"
import { useNavigate } from "react-router-dom";
import VideoCard from "../../Components/VideoCard";

const VideoDashboard = () => {
    const navigate = useNavigate()
    const [videoList, setVideoList] = useState(null);
    const [status, setStatus] = useState(false);
    useEffect(() => {
            axios.post("http://localhost:9002/videolist")
            .then((res) => {
                console.log('video found');
                console.log(res.data);
                setVideoList(res.data)
            }).then(() => {
                setStatus(true)
            }).catch((err)=>{
                console.log(err);
            })
    }, [])

    useEffect(() => {
        console.log('videoList: ', videoList);
    }, [videoList])
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
        </>
    )
}

export default VideoDashboard