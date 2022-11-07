import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminAudioCard from './adminAudioCard';

const Audios = () => {
    const [audioList, setAudioList] = useState(null);
    const [status, setStatus] = useState(false);
    const [display, setDisplay] = useState(1);

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
    else if(display)
        return (
            <>
                {
                    Array.isArray(audioList) ?
                        audioList.map((val, index) => {
                            return (
                                <AdminAudioCard id={val._id} title={val.title}/>
                            )
                        })
                        : null
                }
            </>
        )
    else return <></>
}

export default Audios
