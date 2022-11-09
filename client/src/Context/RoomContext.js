import React, { createContext, useEffect, useState } from "react";

export const RoomContext = createContext();

export const RoomProvider = (props) => {
    const [roomState, setRoomState] = useState({
        roomId: null,
        roomName: null,
        userName:null,
        AdminID: null,
        role: null,
        userArray: [{ userId: String, userName: String, role: String }]
    });

    useEffect(() => {
        console.log("Room provider loaded...");
    }, []);

    return (
        <RoomContext.Provider value={[roomState, setRoomState]}>
            {props.children}
        </RoomContext.Provider>
    );
};
