import React from 'react'
import { Navigate } from 'react-router-dom';

const Logout = () => {
  localStorage.removeItem('userTokenTime');
  localStorage.removeItem('room');
    return (
        <Navigate to='/login'/>
  )
}

export default Logout