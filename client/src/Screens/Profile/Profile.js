import React, { useEffect, useState } from 'react'
import AudioDashboard from '../Dashboard/AudioDashBoard';
import VideoDashboard from '../Dashboard/VideoDashboard';
import { Avatar } from '@mui/material';
import axios from 'axios';

const Profile = ({user}) => {
    const [status,setStatus] = useState(1);
    const notSelected = "py-4 px-2 font-semibold text-gray-500  hover:text-green-500 transition duration-300"
    const selected = "py-4 px-2 font-semibold text-green-500 border-b-4 border-green-500"

    useEffect(()=>{
        const data = null;
        axios.post("http://localhost:9002/getuservideos", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
            }
        })
    },[])

    return (
        <div>
            <div className='flex border-b-4 border-gray-200 my-4 ml-4'>
                <Avatar/>
                <div>
                    <h1 className='font-semibold text-black text-3xl'>Ved pratap singh rajpoot</h1>
                    <h3 className='font-semibold text-black text-md'>Hii guys, welcome to my youtube channel</h3>
                </div>
            </div>
            
            <div className="flex items-center space-x-6 mx-8">
                <button id="video" type="button" className= {(status === 1) ? selected : notSelected} onClick={() => setStatus(1)} >Videos</button> 
                <button id="audio" type="button" className= {(status === 2) ? selected : notSelected} onClick={() => setStatus(2)} >Audios</button> 
                <button id="audio" type="button" className= {(status === 3) ? selected : notSelected} onClick={() => setStatus(3)} >VideoPlaylists</button> 
                <button id="audio" type="button" className= {(status === 4) ? selected : notSelected} onClick={() => setStatus(4)} >AudioPlaylists</button> 
                <button id="audio" type="button" className= {(status === 5) ? selected : notSelected} onClick={() => setStatus(5)} >Favorites</button>  
                <button id="audio" type="button" className= {(status === 6) ? selected : notSelected} onClick={() => setStatus(6)} >About</button>  
            </div>
            {/* <div className={(status === 1) ? "hidden" : "relative top-5"} ><AudioDashboard/></div> */}
            {/* <div className={(status === 2) ? "hidden" : "relative top-5"} ><VideoDashboard/></div> */}
        </div>
  )
}

export default Profile