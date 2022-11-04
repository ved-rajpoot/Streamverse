import axios from 'axios';
import { useEffect, useState } from 'react';
import 'react-h5-audio-player/lib/styles.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

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

    const deleteAudio = (id) => {
        console.log("delete audio")
        axios.post("http://localhost:9002/admin/deleteAudio", {id:id})
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
        setDisplay(0);
    }
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
                                <div className='flex h-fit'>
                                    <div class='w-[80vw] h-fit flex'>
                                        <div className="m-2 mb-1 shadow-xl flex flex-row justify-center w-[70%] bg-white">
                                        <div className="bg-white flex flex-row rounded-b rounded-b-none rounded-r p-2 leading-normal w-full">
                                        <PlayCircleOutlineIcon className="mr-2"/>
                                        <div className="mb-2">
                                            <div className="text-gray-900 font-bold text-sm mb-2 text-left">{val.title}</div>
                                        </div>
                                        </div>
                                        <button onClick={(event) => {deleteAudio(val._id)}} className='m-1'><DeleteIcon/></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : null
                }
            </>
        )
    else return <></>
}

export default Audios