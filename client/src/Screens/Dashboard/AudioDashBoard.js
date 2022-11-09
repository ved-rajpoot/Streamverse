import axios from 'axios';
import { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import AudioCard from '../../Components/AudioCard';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const AudioDashboard = () => {

    const [audioList, setAudioList] = useState(null);
    const [status, setStatus] = useState(false);
    const [source, setSource] = useState("");
    useEffect(() => {
        axios.post("http://localhost:9002/audiolist")
            .then((res) => {
                // console.log('audio found');
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
                                <button class='w-screen' onClick={()=>{
                                    setSource(val.avatar)
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
                                <AudioCard id={val._id} avatar={val.avatar} thumbnail_avatar={val.thumbnail_avatar} title={val.title} description={val.description} userName={val.userName} cloudinary_id={val.cloudinary_id} />
                            </div>
                        )
                    })
                    : null
            }
            
            {
                source?
                // <div className= "fixed inset-x-0 bottom-5 h-16">
                //     <AudioPlayer
                //         autoPlay
                //         src={source}
                //         onPlay={e => console.log("Playing")}
                //     />
                // </div>
                <div class="flex h-screen overflow-hidden relative">

  <div id="player" class="absolute bg-black w-screen bottom-0 h-24 flex flex-row">
    <div id="cover-and-title" class="flex w-1/3">
      <div id="cover" class="w-24 h-24 p-2">
        <img src="https://source.unsplash.com/bsLXJsucvxc/100x100" class="object-cover h-full w-full" />
      </div>
      <div id="title" class="w-8/12 text-gray-200 flex flex-col justify-center">
        <h2 class="font-bold">Side family</h2>
        <div class="text-gray-300 overflow-ellipsis whitespace-nowrap overflow-x-hidden capitalize">may i elaborate? Daly wisdom from JB smove</div>
      </div>
    </div>
    <div id="controlers" class="w-1/3 flex flex-col h-full">
      <div class="h-3/5 flex justify-center items-center">
        <div class="rounded-full h-8 w-8 text-gray-300 hover:text-gray-100 cursor-pointer flex mx-2">
          <svg class="p-2 fill-current" viewBox="0 0 32 32">
            <g>
              <path d="M30.5,2.62a1,1,0,0,0-1,0L7.82,15.13a1,1,0,0,0,0,1.74L29.5,29.38a1,1,0,0,0,1.5-.86v-25A1,1,0,0,0,30.5,2.62ZM29,26.78,10.32,16,29,5.22Z" />
              <path d="M2,5.2a1,1,0,0,0-1,1V25.8a1,1,0,0,0,2,0V6.2A1,1,0,0,0,2,5.2Z" />
            </g>
          </svg>
        </div>
        <div class="rounded-full h-10 w-10 text-gray-100 cursor-pointer flex mx-2">
          <svg class="p-2 fill-current" viewBox="0 0 32 32">
            <path d="M28.62,15.13,4.38,1.13A1,1,0,0,0,2.88,2V30a1,1,0,0,0,.5.87,1,1,0,0,0,1,0l24.24-14A1,1,0,0,0,28.62,15.13ZM4.88,28.27V3.73L26.12,16Z" />
          </svg>
        </div>
        <div class="rounded-full h-8 w-8 text-gray-300 hover:text-gray-100 cursor-pointer flex mx-2">
          <svg class="p-2 fill-current" viewBox="0 0 32 32">
            <g>
              <path d="M24.18,15.13,2.5,2.62A1,1,0,0,0,1,3.48v25a1,1,0,0,0,1.5.86L24.18,16.87A1,1,0,0,0,24.18,15.13ZM3,26.78V5.22L21.68,16Z" />
              <path d="M30,5.2a1,1,0,0,0-1,1V25.8a1,1,0,0,0,2,0V6.2A1,1,0,0,0,30,5.2Z" />
            </g>
          </svg>
        </div>
      </div>
      <div class="h-2/5 w-full flex justify-between items-center">
        <span class="text-sm text-gray-200 w-12 text-left">12:29</span>
        <input type="range" class="w-full h-1" />
        <span class="text-sm text-gray-200 w-12 text-right">13:50</span>
      </div>
    </div>
    <div id="volume" class="w-1/3 flex justify-end items-center text-gray-100 p-3">
      <div class="w-4 mx-1">
        <svg viewBox="0 0 32 32" class="fill-current">
          <g>
            <path d="M1.5,11.66a1,1,0,0,0,1,0l7.75-4.4a1,1,0,0,0,0-1.74L2.49,1.13A1,1,0,0,0,1,2v8.8A1,1,0,0,0,1.5,11.66ZM3,3.72,7.72,6.4,3,9.08Z" />
            <path d="M14,7.4H30a1,1,0,0,0,0-2H14A1,1,0,0,0,14,7.4Z" />
            <path d="M30,13.27H2a1,1,0,0,0,0,2H30A1,1,0,0,0,30,13.27Z" />
            <path d="M30,21.13H2a1,1,0,0,0,0,2H30A1,1,0,0,0,30,21.13Z" />
            <path d="M30,29H2a1,1,0,0,0,0,2H30A1,1,0,0,0,30,29Z" />
          </g>
        </svg>
      </div>
      <div class="w-4 mx-1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      </div>
      <div class="w-24">
        <input class="h-1 w-full" type="range" />
      </div>

      <div class="w-4 mx-1">
        <svg viewBox="0 0 24 24" class="fill-current">
          <path d="M9.79,12.79,4,18.59V17a1,1,0,0,0-2,0v4a1,1,0,0,0,.08.38,1,1,0,0,0,.54.54A1,1,0,0,0,3,22H7a1,1,0,0,0,0-2H5.41l5.8-5.79a1,1,0,0,0-1.42-1.42ZM21.92,2.62a1,1,0,0,0-.54-.54A1,1,0,0,0,21,2H17a1,1,0,0,0,0,2h1.59l-5.8,5.79a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L20,5.41V7a1,1,0,0,0,2,0V3A1,1,0,0,0,21.92,2.62Z" />
        </svg>
      </div>
    </div>
  </div>
</div>
                : null
            }
            
        </>
    )
}

export default AudioDashboard