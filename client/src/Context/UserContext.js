import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [userState, setUserState] = useState({
        userId: null,
        userName: null,
        email: null,
    });

    useEffect(() => {
        console.log("user provider loaded...");
    }, []);

    return (
        <UserContext.Provider value={[userState, setUserState]}>
            {props.children}
        </UserContext.Provider>
    );
};
