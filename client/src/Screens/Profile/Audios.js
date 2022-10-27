import React,{useEffect,useState} from 'react'
import axios from 'axios';
import VideoCard from '../../Components/VideoCard.js'
const Audios = () => {
        
    const [userAudios, setUserAudios] = useState();
    useEffect(()=>{
        const data = null;
        axios.post("http://localhost:9002/getuseraudios", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
            }
        })
        .then((res)=>{
            console.log(res.data);
            setUserAudios(res.data);
        })
    },[])

    return (
        <div className="flex" >
        <div className="flex flex-wrap">
            {
                Array.isArray(userAudios) ?
                    userAudios.map((val, index) => {
                        {/* console.log(index); */}
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

export default Audios;