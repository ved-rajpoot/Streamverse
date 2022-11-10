import axios from 'axios';
import { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import AudioCard from '../../Components/AudioCard';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Loading from '../../Components/Loading/Loading';

const AudioDashboard = () => {

    const [audioList, setAudioList] = useState(null);
    const [source, setSource] = useState("");
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        axios.post("http://localhost:9002/audiolist")
            .then((res) => {
                // console.log('audio found');
                setAudioList(res.data)
            }).then(() => {
                setLoading(false);
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    if(loading) return <Loading/>;
    return (
        <>
            {
                Array.isArray(audioList) ?
                    audioList.map((val, index) => {
                        return (
                            <div className='flex'>
                                <button class='w-screen' onClick={()=>{
                                    // console.log(val)
                                    setSource(val.audioPath)
                                }}
                                >
                                    <div className="mb-1 shadow-xl flex flex-row justify-center w-[100%] bg-white">
                                    <div className="bg-white flex flex-row rounded-b rounded-b-none rounded-r p-2 leading-normal w-full">
                                    <PlayCircleOutlineIcon className="mr-2"/>
                                    <div className="mb-2">
                                        <div className="text-gray-900 font-bold text-sm mb-2 text-left">{val.title}</div>
                                    </div>
                                    </div>
                                    </div>
                                    
                                </button>
                                <AudioCard id={val._id} audioPath={val.audioPath} title={val.title} description={val.description} userName={val.userName} />
                            </div>
                        )
                    })
                    : null
            }
            
            {
                source?
                <div className= "fixed inset-x-0 bottom-5 h-16">
                    <AudioPlayer
                        src={`http://localhost:9002/file/audio/${source}`} 
                        autoPlay
                        onPlay={e => console.log("Playing")}
                    />
                </div>
          
                : null
            }
            
        </>
    )
}

export default AudioDashboard