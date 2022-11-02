import React,{useEffect,useState} from 'react'
import axios from 'axios';
import AudioCard from '../../Components/AudioCard.js'
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
            // console.log(res.data);
            setUserAudios(res.data);
        })
    },[])

    return (
        <>
        {
            Array.isArray(userAudios) ?
                userAudios.map((val, index) => {
                    return (
                        <>
                            <div class='w-screen'>
                                <AudioCard id={val._id} avatar={val.avatar} thumbnail_avatar={val.thumbnail_avatar} title={val.title} description={val.description} userName={val.userName} cloudinary_id={val.cloudinary_id} />
                            </div>
                        </>
                    )
                })
                : null
        }
    </>
  )
}

export default Audios;