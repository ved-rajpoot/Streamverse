import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DefaultPlayer as Video } from "react-html5video"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DownloadIcon from '@mui/icons-material/Download';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';

const VideoPlayer = () => {
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  // eslint-disable-next-line
  const [likes, setLikes] = useState(0);
  // eslint-disable-next-line
  const [dislikes, setDislikes] = useState(0);

  const download = () => {
    var url = location.state.props.avatar

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

  const getVideoData = async ()=>{
    const res = await axios.post("http://localhost:9002/getvideodata", { id: location.state.props.id }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    })
    console.log(res);
    if(res.status===200) {
      setIsLiked(res.data.isLiked);
      setIsDisliked(res.data.isDisliked);
      setIsFavorite(res.data.isFavorite);
      setLikes(res.data.totalLikes);
      setDislikes(res.data.totalDislikes);
    }
  }

  useEffect(()=>{
    getVideoData();
    // eslint-disable-next-line
  },[])
  
  const addToPlaylist = () => {
    console.log(location.state.props.id)
    axios.post("http://localhost:9002/playlist/add", { id: location.state.props.id }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    })
  }
  const like = () => {
    axios.post("http://localhost:9002/like", { id: location.state.props.id }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    })
    setIsLiked(true);
    setIsDisliked(false);
  }
  const removeLike = () => {
    axios.post("http://localhost:9002/removelike", { id: location.state.props.id }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    })
    setIsLiked(false);
  }
  const dislike = () => {
    axios.post("http://localhost:9002/dislike", { id: location.state.props.id }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    })
    setIsDisliked(true);
    setIsLiked(false);
  }
  const removeDislike = () => {
    axios.post("http://localhost:9002/removedislike", { id: location.state.props.id }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    })
    setIsDisliked(false);
  }

  const addToFavorites = () => {
    // console.log(location.state.props.id);
    axios.post("http://localhost:9002/addfavorite", { id: location.state.props.id }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    })
    setIsFavorite(true);
  }
  const removeFromFavorites = () => {
    axios.post("http://localhost:9002/removefavorite", { id: location.state.props.id }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    })
    setIsFavorite(false);
  }

  return (
    <div>
      <div>
        <Video className="h-[40rem]">
          <source src={location.state.props.avatar} type="video/webm" />
          <track label="English" kind="subtitles" srcLang="en" src="/react-html5video/3f581f9610d039656ad3830864753a94.vtt" default />
          <track label="Español" kind="subtitles" srcLang="es" src="/react-html5video/691c220d6cfe7ead7ad17fc2bd972543.vtt" />
        </Video>
      </div>
      <div className="flex justify-between m-5 scale-y-[1.2]">

        {
          isLiked ?
            <button name="upvote" onClick={removeLike}>
              <ThumbUpIcon />
            </button> :
            <button name="upvote" onClick={like}>
              <ThumbUpOffAltIcon />
            </button>
        }
        {
          isDisliked ?
            <button name="downvote" onClick={removeDislike}>
              <ThumbDownIcon />
            </button> :
            <button name="downvote" onClick={dislike}>
              <ThumbDownOffAltIcon />
            </button>
        }
        <button name="download" onClick={download}>
          <DownloadIcon />
        </button>

        <button name="addToPlaylist" onClick={addToPlaylist}>
          <PlaylistAddIcon />
        </button>


        {isFavorite ?
          <button name="favourite" onClick={removeFromFavorites}>
            <FavoriteIcon />
          </button> :
          <button name="favourite" onClick={addToFavorites}>
            <FavoriteBorderIcon />
          </button>
        }

      </div>

      <div className='m-3 text-2xl font-bold'>
        {location.state.props.title}
      </div>

      <div className='m-3 text-sm'>
        {location.state.props.description}
      </div>
    </div>
  )
}

export default VideoPlayer