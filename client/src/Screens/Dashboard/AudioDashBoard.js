import axios from 'axios';
import { useEffect, useState,useContext } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import AudioCard from '../../Components/AudioCard';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import { AudioPlayerContext } from '../../Context/AudioPlayerContext';

import Loading from '../../Components/Loading/Loading';

const AudioDashboard = () => {

  const [audioList, setAudioList] = useState(null);
  const [audioState, setAudioState] = useContext(AudioPlayerContext);
  const [status, setStatus] = useState(false);
  const [source, setSource] = useState("");
  useEffect(() => {
    setAudioState({...audioState,hide:0})
    const data=null
    axios.post("http://localhost:9002/audiolist", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    })
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
              <div className='flex'>
                <button class='w-full' onClick={() => {
                  setAudioState(val)
                }}
                >
                  <div className="mb-1 shadow-xl flex flex-row justify-center bg-white">
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

export default AudioDashboard