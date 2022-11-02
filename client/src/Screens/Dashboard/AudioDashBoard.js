import axios from 'axios';
import { useEffect, useState } from 'react';
import AudioCard from '../../Components/AudioCard';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const AudioDashboard = () => {

    const [audioList, setAudioList] = useState(null);
    const [status, setStatus] = useState(false);
    useEffect(() => {
        axios.post("http://localhost:9002/audiolist")
            .then((res) => {
                console.log(res.data);
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

export default AudioDashboard