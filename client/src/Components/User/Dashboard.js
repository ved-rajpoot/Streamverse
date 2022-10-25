import axios from "axios";
import { useEffect, useState } from "react"
import "react-html5video/dist/styles.css"
import { useNavigate } from "react-router-dom";
import VideoCard from "../VideoCard";

const Dashboard = () => {
    const navigate = useNavigate();
    const [videoList, setVideoList] = useState();
    const [status, setStatus] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            axios.post("http://localhost:9002/videolist")
                .then((res) => {
                    console.log(res.data);
                    setVideoList(res.data)
                }).then(() => {
                    setStatus(true)
                })
        })
        
    }, [])

    useEffect(()=>{
        console.log('videoList: ',videoList);
    },videoList)
    if (!status) return (
        <>
            <div  className="flex item-center">
                Loading..
            </div>
        </>
    )
    return (
        <>
            <div className=" flex h-screen" >
                {/* <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 " onClick={()=>navigate('/upload')}>Upload</button>
                </div> */}
                <div className="flex flex-wrap">
                    {
                        Array.isArray(videoList)?
                        videoList.map((val, index) => {
                            return (
                                <>
                                    <VideoCard avatar={val.avatar} thumbnail_avatar={val.thumbnail_avatar} title={val.title} description={val.description} userName={val.userName} cloudinary_id={val.cloudinary_id}/>
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


export default Dashboard