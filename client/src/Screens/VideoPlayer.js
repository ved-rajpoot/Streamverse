import React, { useEffect, useState } from 'react'
import { Player, ControlBar, LoadingSpinner, BigPlayButton, ReplayControl, ForwardControl, CurrentTimeDisplay, TimeDivider, PlaybackRateMenuButton, VolumeMenuButton } from 'video-react';
import { useLocation, useNavigate } from 'react-router-dom'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DownloadIcon from '@mui/icons-material/Download';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaylistPopup from '../Components/Playlistpopup/PlaylistPopup';
import CastConnectedIcon from '@mui/icons-material/CastConnected';
import { getUserId } from '../ChatBox/HelperFunctions';

const VideoPlayer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  // eslint-disable-next-line
  const [likes, setLikes] = useState(0);
  // eslint-disable-next-line
  const [dislikes, setDislikes] = useState(0);
  const [popup, setPopup] = useState(false);
  const [inRoomAndAdmin,setInRoomAndAdmin] = useState(true)

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
    
    if (localStorage.getItem("room") === null) return;
    const admin = JSON.parse(localStorage.getItem("room")).AdminID;
    const user = getUserId();
    if (user === admin) setInRoomAndAdmin(false);
    
    // eslint-disable-next-line
  },[])
  
  const addToPlaylist = () => {
    setPopup(true);
    console.log(location.state.props.id)
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
  const stream = () => {
    navigate("/streamroom", { state: { props: { url: location.state.props.avatar, title: location.state.props.title, description: location.state.props.description } } })
  }
  return (
    <div>

      {
        popup && <PlaylistPopup id={location.state.props.id} type="video" setPopup={setPopup}/>
      }

      <div className="flex object-cover h-[40rem] w-full">
        <Player fluid={false} height="100%" width="100%">
          <BigPlayButton position="center" />
          <LoadingSpinner />
          <ControlBar>
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={10} order={1.2} />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
            <VolumeMenuButton />
          </ControlBar>
          <source src={`http://localhost:9002/file/video/${location.state.props.videoPath}`} type="video/webm" />
        </Player>
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

        <button name="stream" className='disabled:opacity-25' disabled ={inRoomAndAdmin} onClick = {stream}><CastConnectedIcon/></button>
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
