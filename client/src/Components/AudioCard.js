import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadIcon from '@mui/icons-material/Download';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistPopup from '../Components/Playlistpopup/PlaylistPopup';

  export default function AudioCard(props) {
  
    const navigate = useNavigate();
    const {id, avatar,thumbnail_avatar,title,description, cloudinary_id, userName} = props;
    const [isFavorite, setIsFavorite] = useState(false);
    const [popup, setPopup] = useState(false);

    const getAudioData = async () => {
      const res = await axios.post("http://localhost:9002/audio/getaudiodata", { id: id }, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
        }
      })
      setIsFavorite(res.data.isFavorite)
    }

    useEffect(()=>{
      getAudioData();
      // eslint-disable-next-line
    },[])

    const addToPlaylist = () => {
      setPopup(true);
      console.log(id)
    }

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
  
    const addToFavorites = () => {
      console.log("add to fav")
      axios.post("http://localhost:9002/audio/addfavorite", { id: id }, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
        }
      })
      setIsFavorite(true);
    }

    const removeFromFavorites = () => {
      axios.post("http://localhost:9002/audio/removefavorite", { id: id }, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
        }
      })
      setIsFavorite(false);
    }

    return (
      <>
        {
          popup && <PlaylistPopup id={id} type="audio" setPopup={setPopup}/>
        }
        <div className="m-1 shadow-xl flex flex-row justify-center w-[90%] bg-white">
          <div className="bg-white flex flex-row rounded-b rounded-b-none rounded-r p-2 leading-normal w-full">
          <PlayCircleOutlineIcon className="mr-2"/>
            <div className="mb-2">
              <div className="text-gray-900 font-bold text-sm mb-2 text-left">{title}</div>
            </div>
          </div>
          <button className="m-1" onClick={addToPlaylist}><PlaylistAddIcon/></button>
          <button className="m-1" onClick={download}><DownloadIcon/></button>
          

        {isFavorite ?
          <button name="favourite" onClick={removeFromFavorites}>
            <FavoriteIcon />
          </button> :
          <button name="favourite" onClick={addToFavorites}>
            <FavoriteBorderIcon />
          </button>
        }

        </div>
      </>
    );
  }