import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import "./App.css"
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import 'video-react/dist/video-react.css';

// Elements imports
import Home from "./Components/Home";
import Login from "./Components/Login";
import Main from "./Components/Main";
import PrivateRoutes from "./utils/PrivateRoutes";
import VideoDashboard from "./Screens/Dashboard/VideoDashboard";
import AudioDashboard from "./Screens/Dashboard/AudioDashBoard";
import UploadAudio from "./Screens/Upload/UploadAudio";
import UploadVideo from "./Screens/Upload/UploadVideo";
import PlaylistVideos from './Screens/Profile/PlaylistVideos';
import PlaylistAudios from './Screens/Profile/PlaylistAudios';
import Profile from "./Screens/Profile/Profile"
import Logout from "./Components/Logout";
import Admin from './Screens/Admin/admin';
import VideoPlayer from './Screens/VideoPlayer'
import ControllerVideoPlayer from "./StreamRoom/ControllerVideoPlayer";
import ViewerVideoPlayer from "./StreamRoom/ViewerVideoPlayer"
import AppWrapper from "./AppWrapper";
import { useContext } from "react";
import { UserContext } from "./Context/UserContext";
import VideoPlaylists from "./Screens/Profile/VideoPlaylists";

const App1 = () => {
    const [userState, setUserState] = useContext(UserContext)
    return (
        <>
            <div id="app">
                <Router>
                    <AppWrapper>
                        <Routes>
                            {/* <Route path="*" element={<Navigate to='/login' />} /> */}
                            {/* main routes */}
                            <Route path="/" element={<Main />}>
                                <Route path="login" element={<Login />} />
                            </Route>

                            {/* Admin route */}
                            <Route exact path="/admin" element={<Admin />} />

                            {/* User routes */}
                            <Route path="app" element={<Home />}>
                                <Route path="" element={<Navigate to='/login' />} />
                                <Route path=":userId" element={<PrivateRoutes />}>
                                    <Route path="dashboard">
                                        <Route path="" element={<Navigate to={`/app/${userState.userId}/dashboard/video`} />} />
                                        <Route path="video" element={<VideoDashboard />} />
                                        <Route path="video/:id" element={<VideoPlayer />} />
                                        <Route path="video/:id/stream/:roomid/controller" element={<ControllerVideoPlayer />} />
                                        <Route path="video/:id/stream/:roomid/viewer" element={<ViewerVideoPlayer />} />
                                        <Route path="audio" element={<AudioDashboard />} />
                                    </Route>
                                    <Route path="upload">
                                        <Route path="" element={<Navigate to='/app/:userId/upload/video' />} />
                                        <Route path="video" element={<UploadVideo />} />
                                        <Route path="audio" element={<UploadAudio />} />
                                    </Route>
                                    <Route path="playlist">
                                        {/* <Route path="" element={<Navigate to='/app/:userId/playlist/video' />} /> */}
                                        <Route path="video" element={<VideoPlaylists userId ={userState.userId} playlists = {userState.videoPlaylists}  />} />
                                        <Route path="video/:id" element={<PlaylistVideos />} />
                                        <Route path="audio/:id" element={<PlaylistAudios />} />
                                    </Route>
                                    <Route path="profile" element={<Profile />} />
                                </Route>
                            </Route>
                            <Route path="logout" element={<Logout />} />
                        </Routes>
                    </AppWrapper>
                </Router>

            </div>
        </>
    )
}

export default App1