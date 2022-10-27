import React from 'react'
import { Navigate } from 'react-router-dom';

const Logout = () => {
    localStorage.removeItem('userTokenTime');
    return (
        <Navigate to='/login'/>
  )
}

export default Logout