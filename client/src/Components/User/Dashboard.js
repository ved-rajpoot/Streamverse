import axios from "axios";
import { useEffect, useState } from "react"
import {DefaultPlayer as Video} from "react-html5video"
import "react-html5video/dist/styles.css"

const Dashboard = () => {
    const [videoList, setVideoList] = useState();
    const [status, setStatus] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            axios.post("http://localhost:9002/videolist")
                .then((res) => {
                    setVideoList(res.data)
                }).then(() => {
                    setStatus(true)
                })
        },5000)
        
    }, [])

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
                <div className="mx-12 my-6 w-[50%] ">
                    {
                        Array.isArray(videoList)?
                        videoList.map((val, index) => {
                            return (
                                <>
                                    <Video
                                    >
                                        <source src={val.avatar} type="video/webm" />
                                        <track label="English" kind="subtitles" srcLang="en" src="/react-html5video/3f581f9610d039656ad3830864753a94.vtt" default />
                                        <track label="Español" kind="subtitles" srcLang="es" src="/react-html5video/691c220d6cfe7ead7ad17fc2bd972543.vtt" />
                                    </Video>
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