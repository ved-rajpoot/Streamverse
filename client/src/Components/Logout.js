import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const Logout = () => {
  const [userState,setUserState] = useContext(UserContext);
  const defaultUserState = {
    userId: null,
    userName: null,
    email: null,
}
  setUserState(defaultUserState);
  localStorage.removeItem('userTokenTime');
  localStorage.removeItem('room');
    return (
        <Navigate to='/login'/>
  )
}

export default Logout