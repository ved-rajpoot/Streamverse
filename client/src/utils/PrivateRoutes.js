import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

const PrivateRoutes = ()=>{
    let isAuthenticated = false;
    const token = localStorage.getItem('userTokenTime');
    if(token) {
        console.log(token);
        const user = jwtDecode(token);
        if(user && user.exp*1000>=Date.now()) {
            console.log(user);
            isAuthenticated = true;
        }
    }
    
    return (
        isAuthenticated? <Outlet/> : <Navigate to='/login'/>     
    )
}
export default PrivateRoutes;