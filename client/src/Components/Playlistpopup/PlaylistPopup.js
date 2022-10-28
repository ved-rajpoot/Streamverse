import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Form from './Form';

const PlaylistPopup = ({id}) => {
    const [playlists, setPlaylists] = useState([{name:'dummy', videos:[], isEditing:false}, {name:'dummy2',videos:[], isEditing:false}, {name:'dummy3',videos:[], isEditing: false}]);

    // an array of boolean values which will  denote if a particular video is present in playlist of corresponding index.
    const [isVideoPresent, setIsVideoPresent] = useState([]);

    const getUserData = async ()=>{
        const data = null;
        const res = await axios.post("http://localhost:9002/getuserdata", { id: null }, {
             headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
             }
        })
        // setPlaylists(res.data.playlists);
    }
    const handleAddToPlaylist = (index)=>{
        console.log(index);
        // add the current video to playlist[index] ---- this playlist if not added already.
        if(isVideoPresent[index]===true) {
            
        } else {

        }
    }
    useEffect(()=>{
        getUserData();
    },[]);

    useEffect(()=>{
        console.log(playlists);
    },[playlists]);

    return (
        <div className='text-center flex items-center justify-center flex-col'>
            <Form playlists={playlists} setPlaylists={setPlaylists}/>
        </div> 
        // <div className='flex items-center justify-center absolute z-30 h-screen w-screen'>
            // <div>
            //     PlaylistPopup
            //     <div>
            //         {
            //             playlists.map((val,index)=>{
            //                 {console.log(index)}
            //                 return <h1 key={index} onClick={()=>handleAddToPlaylist(index)}>{val.name}</h1>
            //             })
            //         }
            //     </div>
            //     <input type="text" name='newPlaylist'/>
            //     <button>Create new</button>
            // </div>
        // </div>
    )
}

export default PlaylistPopup;