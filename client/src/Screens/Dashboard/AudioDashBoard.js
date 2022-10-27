import axios from 'axios';
import { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


const AudioDashboard = () => {

    const [audioList, setAudioList] = useState(null);
    const [status, setStatus] = useState(false);
    const [source, setSource] = useState("");
    useEffect(() => {
        axios.post("http://localhost:9002/audiolist")
            .then((res) => {
                console.log('audio found');
                setAudioList(res.data)
            }).then(() => {
                setStatus(true)
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    if (!status) return (
        <>
            <div className="flex item-center">
                Loading..
            </div>
        </>
    )
    
    return (
        <>
            {
                Array.isArray(audioList) ?
                    audioList.map((val, index) => {
                        return (
                            <>
                                <div className='flex flex-col'>
                                    <button onClick={() => {
                                        setSource(val.avatar)
                                    }}
                                    >
                                        {val.audioName}
                                    </button>
                                </div>
                                
                            </>
                        )
                    })
                    : null
            }
            <div className= "fixed inset-x-0 bottom-0 h-16">
                <AudioPlayer
                    autoPlay
                    src={source}
                    onPlay={e => console.log("Playing")}
                />
            </div>
            
        </>
    )
}

export default AudioDashboard