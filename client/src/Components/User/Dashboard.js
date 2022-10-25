import VideoDashboard from "./VideoDashboard"
import AudioDashboard from "./AudioDashBoard"
import { useState } from "react"
const Dashboard = () => {
    
    const notSelected = "py-4 px-2 font-semibold text-gray-500  hover:text-green-500 transition duration-300"
    const selected = "py-4 px-2 font-semibold text-green-500 border-b-4 border-green-500"

    const [status, setStatus] = useState(1);
    
    return (
        <>
            <div className="flex items-center space-x-6 mx-8">
                <button id="video" type="button" className= {(status === 1) ? selected : notSelected} onClick={() => setStatus(1)} >Videos</button> 
                <button id="audio" type="button" className= {(status === 2) ? selected : notSelected} onClick={() => setStatus(2)} >Audios</button> 
            </div>
            <div className={(status === 2) ? "hidden" : "relative top-5"} ><VideoDashboard /></div>
            <div className={(status === 1) ? "hidden" : "relative top-5"} ><AudioDashboard /></div>
        </>
    ) 
    
    
}


export default Dashboard