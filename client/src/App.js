import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login"
import SignUp from './Components/SignUp';
import Header from './Components/Header';
import Upload from './Screens/Upload/Upload';
import Dashboard from './Screens/Dashboard/Dashboard';
import VideoPlayer from './Screens/VideoPlayer';
import Profile from './Screens/Profile/Profile';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import Logout from './Components/Logout';

const App = () =>{
  
  return (
      <>
      <div>
        <Router>
            <Header />
            <Routes>
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/SignUp" element={<SignUp />} />
              <Route element={<PrivateRoutes/>}>
                {/* <Route exact path="/" element={<Login />} /> */}
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/dashboard/:cloudinary_id" element={ <VideoPlayer />} />
                <Route exact path="/upload" element={<Upload />} />
                <Route exact path="/profile" element={<Profile/>} />
                <Route exact path="/logout" element={<Logout/>} />
                <Route path='*' element={<Navigate to='/login'/>}/>
              </Route>
            </Routes>
          </Router>
      </div>
      </>
    )
}

export default App;
