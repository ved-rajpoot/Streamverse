import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Navigate, useNavigate } from 'react-router-dom';
import Switch from "../Switch/Switch";
import { UserContext } from "../Context/UserContext";
import jwtDecode from "jwt-decode";
const Login = () => {
    const navigate = useNavigate()
    const [userState, setUserState] = useContext(UserContext);
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(localStorage.getItem('userTokenTime') ? true : false)
    const [passwordType, setPasswordType] = useState("password");
    const updatEmail = (e) => {
        setUserState({
            ...userState,
            email: e.target.value
        })
    }
    const updatePassword = (e) => {
        setPassword(e.target.value);
    }
    const [userId, setUserId] = useState(null);
    useEffect(() => { 
        console.log(redirect + " " + userId)
        if (redirect && userId) {
            navigate(`/app/${userId}/dashboard`)
        }
    }, [redirect,userId])
    const log = () => {
        // eslint-disable-next-line 
        if ((userState.email && password) && (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userState.email))) {
            axios.post("http://localhost:9002/login", {
                user: {
                    email: userState.email,
                    password: password
                }
            })
                .then(async (res) => {
                    const user = await jwtDecode(res.data.token);
                    //Set User Details after logging in
                    setUserState({
                        ...userState,
                        userId: user.userId
                    })
                    setUserId(user.userId);

                    //Create a Token for authenticating user for future requests
                    const data = {
                        token: res.data.token,
                        time: new Date().getTime()
                    }
                    //Save Token in localStorage
                    localStorage.setItem('userTokenTime', JSON.stringify(data));
                    //Redirect to the dashboard
                    setRedirect(true)
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response.status === 500) {
                        alert('Internal server error');
                    }
                    else if (err.response.status === 401) {
                        alert('Auth failed');
                    }
                })
        } else {
            alert('Please enter valid details');
        }
    }

    const register = () => navigate("/signup");
    
    

    return (
        <>
            <div className="flex h-[90%] flex-col justify-center items-center w-full">
                <div className="relative flex flex-row gap-2 bottom-6 left-0">
                    <p className="relative font-bold ">Light/Dark </p>
                    <Switch />
                </div>
                <p className="font-bold text-3xl mb-10">Login</p>
                <hr className="bg-black border w-[70%] mb-6 dark:bg-gray-700" />
                <form onSubmit={(e) => e.preventDefault()} action="" className="w-[65%] flex flex-col gap-4" autoComplete={false}>
                    <p className="font-bold text-xl">Email</p>
                    <input className="p-4 mb-3 rounded-xl border border-gray-300" type="email" name="email" value={userState.email} onChange={updatEmail} placeholder="Email" />
                    <div className="relative">
                        <p className="font-bold text-xl">Password</p>
                        <input className="p-4 mb-3 mt-3 rounded-xl border border-gray-300 w-full" type={passwordType} name="password" value={password} onChange={updatePassword} placeholder="Password" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="22" fill="gray" className="bi bi-eye absolute top-[63%] right-3 -translate-y-1/2" viewBox="-1 0 14 18"
                            onClick={() => {
                                if (passwordType === "password") {
                                    setPasswordType("text")
                                } else {
                                    setPasswordType("password")
                                }
                            }}>
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                    </div>
                    <div class="flex justify-between items-center mb-6">
                        <div class="form-group form-check">
                            <input
                                type="checkbox"
                                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                id="exampleCheck2"
                            />
                            <label class="form-check-label dark:text-white inline-block text-gray-800" >Remember me</label
                            >
                        </div>
                        <button class="text-gray-800 dark:text-white">Forgot password?</button>
                    </div>
                    <div class="text-center lg:text-left">
                        <button
                            type="button"
                            class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={log}
                        >
                            Login
                        </button>
                        <p class="text-sm font-semibold mt-4 pt-1 mb-0">
                            Don't have an account?
                            <button
                                href="#!"
                                class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                onClick={register}
                            > Register</button>
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login