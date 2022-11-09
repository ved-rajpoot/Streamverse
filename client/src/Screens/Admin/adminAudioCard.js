import axios from "axios";
import { useState } from "react";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdminAudioCard(props) {
  const [display, setDisplay] = useState(1);

  const deleteAudio = () => {
    axios.post("http://localhost:9002/admin/deleteAudio", {id:props.id})
    .then((res) => {
        // console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
    setDisplay(0);
  }

  if(display)
    return (
      <>
        <div className='flex h-fit'>
            <div class='w-[80vw] h-fit flex'>
                <div className="m-2 mb-1 shadow-xl flex flex-row justify-center w-[70%] bg-white">
                <div className="bg-white flex flex-row rounded-b rounded-b-none rounded-r p-2 leading-normal w-full">
                <PlayCircleOutlineIcon className="mr-2"/>
                <div className="mb-2">
                    <div className="text-gray-900 font-bold text-sm mb-2 text-left">{props.title}</div>
                </div>
                </div>
                <button onClick={deleteAudio} className='m-1'><DeleteIcon/></button>
                </div>
            </div>
        </div>
      </>
    );
  else return <></>
}
