import React, { createContext, useEffect, useState } from "react";

export const AudioPlayerContext = createContext();

export const AudioProvider = (props) => {
    const [audioState, setAudioState] = useState({
        hide: false
    });

    useEffect(() => {
        console.log("audio player provider loaded...");
    }, []);

    return (
        <AudioPlayerContext.Provider value={[audioState, setAudioState]}>
            {props.children}
        </AudioPlayerContext.Provider>
    );
};
