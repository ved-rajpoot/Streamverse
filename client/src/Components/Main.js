import { Outlet } from "react-router-dom";
import Typed from 'typed.js';
import { useEffect, useRef } from "react";
import Colon from "./Colon";
import MainLogo from "./MainScreenLogo";


const Main = () => {
    const el = useRef(null);
    
    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ["Welcome To StreamVerse !!"],
            startDelay: 300,
            typeSpeed: 50,
            smartBackspace: true,
            loop: true,
            showCursor: true,
            cursorChar: ""
        });

        // Destropying
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <>
            <div className="flex  bg-[#5eead4] dark:bg-[#121212] dark:text-white flex-row w-full h-screen justify-center items-center">
                <div className="m-3 hidden dark:bg-[#1E1E1C] lg:block bg-[#f0fdfa] shadow-xl w-[60%] h-[90%] rounded-2xl">
                    <div className="flex flex-col justify-center items-center h-[90%]">
                        <div className="flex flex-row justify-center items-center">
                            <MainLogo />
                            <p ref={el} className="font-bold text-5xl">Welcome To StreamVerse !!</p>
                       </div>
                        <div className="mt-10 w-[70%] flex text-xl font-bold">
                            <span className="relative bottom-6"><Colon /> </span>
                            <p className="p-8 font-mono">
                                StreamVerse is a Video and Audio Streaming platform. Create rooms and plan Movie
                                Nights with your friends. Upload and save your favourite videos and Audios for later and
                                chat all night long with Your friends
                            </p> 
                        </div>
                    </div>
                   
                </div>
                <div className="m-3 dark:bg-[#1E1E1C] bg-white shadow-xl w-[90%] h-[98%] lg:w-[35%] lg:h-[90%] rounded-2xl">
                    <Outlet />
                </div>
            </div>
            
        </>
    )
}
export default Main;