import React, { useContext, useEffect, useState } from 'react'
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
import { UserContext } from '../Context/UserContext';
import { RoomContext } from '../Context/RoomContext';

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
  const [disable,setdisable] = useState(true);
  const [loading,setLoading] = useState(true);
  const [tags,setTags] = useState(location.state.props.tags);
  const [userId,setUserId] = useState(location.state.props.userId);
  const [userState, setUserState] = useContext(UserContext);
  const [roomState, setRoomState] = useContext(RoomContext);
  const download = () => {
    // var url = location.state.props.avatar

    // var link = ""
    // for (var i = 0; i < url.length; i++) {
    //   link += url[i]
    //   if (url[i] === '/' && url[i + 1] === 'u') {
    //     link += "upload/fl_attachment/"
    //     i++;
    //     while (url[i] !== '/') i++;
    //   }
    // }

    // window.location.href = link
  }

  const getVideoData = async ()=>{
    const res = await axios.post("http://localhost:9002/getvideodata", { id: location.state.props.id }, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    })
    // console.log(res);
    if(res.status===200) {
      setIsLiked(res.data.isLiked);
      setIsDisliked(res.data.isDisliked);
      setIsFavorite(res.data.isFavorite);
      setLikes(res.data.totalLikes);
      setDislikes(res.data.totalDislikes);
    }
  }

  useEffect(()=>{
    if(loading) getVideoData();
    setLoading(false);
    if (localStorage.getItem("room") === null) return;
    if (roomState.role === "controller") setdisable(false);
    else if (roomState.role === "Admin") {
      const index = roomState.userArray.findIndex((user) => user.role == "controller");
      if (index > -1) return;
      setdisable(false);
    }
    // eslint-disable-next-line
  },[])
  
  const addToPlaylist = () => {
    setPopup(true);
    // console.log(location.state.props.id)
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
    navigate(`/app/${userState.userId}/stream/${roomState.roomId}/controller`, { state: { props: { videoPath: location.state.props.videoPath, title: location.state.props.title, description: location.state.props.description } } })
  }
  return (
    <div className='dark:text-white'>

      {
        popup && <PlaylistPopup id={location.state.props.id} type="video" setPopup={setPopup}/>
      }

      <div className="flex h-[40rem]">
      
        <video className='w-[70%]' src={`http://localhost:9002/file/video/${location.state.props.videoPath}`} controls preload='metadata'>

        </video>
      </div>

      <div className='flex m-1'>
        {
          Array.isArray(tags) ?
            tags.map((val,idx) => {
              return (
                <div className="px-1 py-1 text-[#3EA6FF] m-1 rounded-xl gap-1 flex flex-row">
                  <div className="flex items-center justify-center text-md">
                    #{val}
                  </div>
                </div>
              )
            })
          : null
        }
      </div>

      <div className="flex w-64 justify-between m-5 scale-y-[1.2] dark:bg-opacity-20 rounded-2xl p-2 bg-gray-300 dark:bg-[#FFFFFF]">

        {
          isLiked ?
            <button className="hover:bg-[#FFFFFF] pl-1 pr-1 rounded-md hover:text-black" name="upvote" onClick={removeLike}>
              <ThumbUpIcon />
            </button> :
            <button className="hover:bg-[#FFFFFF] pl-1 pr-1 rounded-md hover:text-black" name="upvote" onClick={like}>
              <ThumbUpOffAltIcon />
            </button>
        }
        {
          isDisliked ?
            <button className="hover:bg-[#FFFFFF] pl-1 pr-1 rounded-md hover:text-black" name="downvote" onClick={removeDislike}>
              <ThumbDownIcon />
            </button> :
            <button className="hover:bg-[#FFFFFF] pl-1 pr-1 rounded-md hover:text-black" name="downvote" onClick={dislike}>
              <ThumbDownOffAltIcon />
            </button>
        }
        <button className="hover:bg-[#FFFFFF] pl-1 pr-1 rounded-md hover:text-black" name="download" onClick={download}>
          <DownloadIcon />
        </button>

        <button className="hover:bg-[#FFFFFF] pl-1 pr-1 rounded-md hover:text-black" name="addToPlaylist" onClick={addToPlaylist}>
          <PlaylistAddIcon />
        </button>


        {isFavorite ?
          <button className="hover:bg-[#FFFFFF] pl-1 pr-1 rounded-md hover:text-black" name="favourite" onClick={removeFromFavorites}>
            <FavoriteIcon />
          </button> :
          <button className="hover:bg-[#FFFFFF] pl-1 pr-1 rounded-md hover:text-black" name="favourite" onClick={addToFavorites}>
            <FavoriteBorderIcon />
          </button>
        }

        <button name="stream" className='disabled:opacity-25 hover:bg-[#FFFFFF] pl-1 pr-1 rounded-md hover:text-black' disabled ={disable} onClick = {stream}><CastConnectedIcon/></button>
      </div>

      <div className='m-3 text-2xl font-bold h-20 flex'>
          <img class="w-16 h-16 rounded-[50%] mr-2" src={`http://localhost:9002/file/image/${location.state.props.thumbnailPath}`} alt="" />
          <div>
            {location.state.props.title}
            <div className='font-light text-[75%] cursor-pointer' onClick={() => {navigate(`/app/${userId}/profile`, { state: { props: { userId} } }) }}>Uploaded by: {location.state.props.userName}</div>
          </div>
      </div>

      <div className='m-3 text-md dark:bg-opacity-10 p-3 rounded-3xl bg-gray-200 dark:bg-white'>
        <div className='font-bold'>{location.state.props.views} views</div>
        {location.state.props.description}
      </div>
    </div>
  )
}

export default VideoPlayer
