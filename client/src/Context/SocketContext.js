import { createContext } from 'react';
import io from 'socket.io-client';
export const SocketContext = createContext();
export const SocketProvider = (props) => {
    const ENDPOINT = 'http://localhost:8080';
    const socket = io(ENDPOINT);
    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    );
};
