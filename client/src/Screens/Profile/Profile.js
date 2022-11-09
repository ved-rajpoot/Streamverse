import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material';
import Videos from './Videos.js';
import Audios from './Audios.js';
import VideoPlaylists from './VideoPlaylists.js';
import AudioPlaylists from './AudioPlaylists.js';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import FavoriteAudios from './FavoriteAudios.js';
import FavoriteVideos from './FavoriteVideos.js';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
    const [status,setStatus] = useState(1);
    const [userData, setUserData] = useState(null);

    
    const token = localStorage.getItem('userTokenTime');
    const user = jwtDecode(token);
    
    // To get whole user object of current user from database.
    const getUserData = ()=>{
            const data = null;
            axios.post("http://localhost:9002/getuserdata", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
                }
            })
            .then((res)=>{
                // console.log('userData:  ', res.data);
                setUserData(res.data);  
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    useEffect(()=>{
        // console.log('user: ',user);
        getUserData();
    },[])

    const notSelected = "py-4 px-2 font-semibold text-gray-500  hover:text-green-500 transition duration-300"
    const selected = "py-4 px-2 font-semibold text-green-500 border-b-4 border-green-500"

    return (
        <div className='dark:text-white text-black'>
            <div className='border-b-4 border-gray-200'>
              <div className='flex  my-4 ml-5'>
                  <Avatar/>
                  <div className='ml-4 flex'>
                      <h1 className='font-semibold text-3xl mb-2'>{user.userName}</h1>
                      {/* <EditIcon className='ml-2 mt-1'/> */}
                      {/* <h3 className='font-semibold text-black text-md'>Hii guys, welcome to my youtube channel</h3> */}
                  </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 mx-8 overflow-x-auto">
                <button id="video" type="button" className= {(status === 1) ? selected : notSelected} onClick={() => setStatus(1)} >Videos</button> 
                <button id="audio" type="button" className= {(status === 2) ? selected : notSelected} onClick={() => setStatus(2)} >Audios</button> 
                <button id="audio" type="button" className= {(status === 3) ? selected : notSelected} onClick={() => setStatus(3)} >VideoPlaylists</button> 
                <button id="audio" type="button" className= {(status === 4) ? selected : notSelected} onClick={() => setStatus(4)} >AudioPlaylists</button> 
                <button id="audio" type="button" className= {(status === 5) ? selected : notSelected} onClick={() => setStatus(5)} >Favorite Videos</button>  
                <button id="audio" type="button" className= {(status === 6) ? selected : notSelected} onClick={() => setStatus(6)} >Favorite Audios</button>  
                <button id="audio" type="button" className= {(status === 7) ? selected : notSelected} onClick={() => setStatus(7)} >About</button>  
            </div>
            <div className={(status === 1) ? "relative top-5":"hidden"} ><Videos/></div>
            <div className={(status === 2) ? "relative top-5":"hidden"} ><Audios/></div>
            <div className={(status === 3) ? "relative top-5":"hidden"} ><VideoPlaylists playlists={userData && userData.videoPlaylists}/></div>
            <div className={(status === 4) ? "relative top-5":"hidden"} ><AudioPlaylists playlists={userData && userData.audioPlaylists}/></div>
            <div className={(status === 5) ? "relative top-5":"hidden"} ><FavoriteVideos/></div>
            <div className={(status === 6) ? "relative top-5":"hidden"} ><FavoriteAudios/></div>
            {/* <div className={(status === 6) ? "relative top-5":"hidden"} ><About/></div> */}
            {/* <div className={(status === 2) ? "hidden" : "relative top-5"} ><VideoDashboard/></div> */}
        </div>
  )
}

export default Profile