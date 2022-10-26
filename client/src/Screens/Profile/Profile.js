import React, { useEffect, useState } from 'react'

const Profile = ({user}) => {
    const [status,setStatus] = useState(1);
    const notSelected = "py-4 px-2 font-semibold text-gray-500  hover:text-green-500 transition duration-300"
    const selected = "py-4 px-2 font-semibold text-green-500 border-b-4 border-green-500"

    
    return (
        <div>
            {user.userName}
            <div className="flex items-center space-x-6 mx-8">
                <button id="video" type="button" className= {(status === 1) ? selected : notSelected} onClick={() => setStatus(1)} >Videos</button> 
                <button id="audio" type="button" className= {(status === 2) ? selected : notSelected} onClick={() => setStatus(2)} >Audios</button> 
                <button id="audio" type="button" className= {(status === 3) ? selected : notSelected} onClick={() => setStatus(3)} >VideoPlaylists</button> 
                <button id="audio" type="button" className= {(status === 4) ? selected : notSelected} onClick={() => setStatus(4)} >AudioPlaylists</button> 
                <button id="audio" type="button" className= {(status === 5) ? selected : notSelected} onClick={() => setStatus(5)} >Favorites</button>  
                <button id="audio" type="button" className= {(status === 6) ? selected : notSelected} onClick={() => setStatus(6)} >About</button>  
            </div>
            {/* <div className={(status === 2) ? "hidden" : "relative top-5"} ><VideoDashboard /></div> */}
            {/* <div className={(status === 1) ? "hidden" : "relative top-5"} ><AudioDashboard /></div> */}
        </div>
  )
}

export default Profile