import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DownloadIcon from '@mui/icons-material/Download';

export default function AdminAudioCard(props) {

  const navigate = useNavigate();
  const {id, avatar,thumbnail_avatar,title,description, cloudinary_id, userName} = props;

  const getAudioData = async () => {
    const res = await axios.post("http://localhost:9002/audio/getaudiodata", { id: id }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    })
  }

  useEffect(()=>{
    getAudioData();
    // eslint-disable-next-line
  },[])

  const download = () => {
    var url = avatar

    var link = ""
    for (var i = 0; i < url.length; i++) {
      link += url[i]
      if (url[i] === '/' && url[i + 1] === 'u') {
        link += "upload/fl_attachment/"
        i++;
        while (url[i] !== '/') i++;
      }
    }

    window.location.href = link
  }

  return (
    <>
      <div className="m-2 shadow-xl flex flex-row w-fit bg-white">
        <button className="m-1" onClick={download}><DownloadIcon/></button>
      </div>
    </>
  );
}