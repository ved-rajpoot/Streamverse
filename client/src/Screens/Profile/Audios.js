import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AudioCard from '../../Components/AudioCard.js';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const Audios = (props) => {
    const [userAudios, setUserAudios] = useState();
    const [source, setSource] = useState("");

    useEffect(() => {
        axios.post("http://localhost:9002/getuseraudios", { id: props.userId })
            .then((res) => {
                // console.log(res.data);
                setUserAudios(res.data);
            })
    }, [])

    return (
        <>
            {
                Array.isArray(userAudios) ?
                    userAudios.map((val, index) => {
                        return (
                            <div className='flex'>
                                <button class='w-screen' onClick={() => {
                                    // console.log(val)
                                    setSource(val.audioPath)
                                }}
                                >
                                    <div className="mb-1 shadow-xl flex flex-row justify-center w-[100%] bg-white">
                                        <div className="bg-white flex flex-row rounded-b rounded-b-none rounded-r p-2 leading-normal w-full">
                                            <PlayCircleOutlineIcon className="mr-2" />
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
        </>
    )
}

export default Audios;