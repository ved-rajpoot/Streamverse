import { Outlet, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";


const PrivateRoutes = ()=>{
    let isAuthenticated = false;
    const token = localStorage.getItem('userTokenTime');
    if(token) {
        console.log(token);
        const user = jwtDecode(token);
        if(user) {
            console.log(user);
            isAuthenticated = true;
        }
    }

    return (
        isAuthenticated? <Outlet/> : <Navigate to='/login'/>     
    )
}
export default PrivateRoutes;