import './App.css';
import 'video-react/dist/video-react.css'; // import css
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login"
import SignUp from './Components/SignUp';
import Header from './Components/Header';
import Upload from './Screens/Upload/Upload';
import Dashboard from './Screens/Dashboard/Dashboard';
import VideoPlayer from './Screens/VideoPlayer';
import Profile from './Screens/Profile/Profile';
import Admin from './Screens/Admin/admin';
import { Navigate } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import Logout from './Components/Logout';
import ChatBox from './ChatBox/ChatBox';
import SocketContext, { socket } from './SocketContext';

import PlaylistPopup from './Components/Playlistpopup/PlaylistPopup';
import AdminVideoPlayer from './StreamRoom/AdminVideoPlayer';
const App = () =>{
  
  return (
      <>
      <div>
          <Router>
            <Header />
            <Routes>
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/SignUp" element={<SignUp />} />
              <Route element={<PrivateRoutes />}>
                {/* <Route exact path="/" element={<Login />} /> */}
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/streamroom" element={<AdminVideoPlayer />} />
                <Route exact path="/dashboard/:cloudinary_id" element={ <VideoPlayer />} />
                {/* <Route exact path="/dashboard/:cloudinary_id" element={ <PlaylistPopup />} /> */}
                <Route exact path="/upload" element={<Upload />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/logout" element={<Logout />} />
                <Route exact path="/admin" element={<Admin />} />
                <Route path='*' element={<Navigate to='/login' />} />
              </Route>
            </Routes>
          </Router>
        <SocketContext.Provider value={socket}>
          <ChatBox />
        </SocketContext.Provider>
        
      </div>
      </>
    )
}

export default App;
