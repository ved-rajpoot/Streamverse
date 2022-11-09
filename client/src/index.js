import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App1 from './App1';
import { UserProvider } from './Context/UserContext';
import { SocketProvider } from './Context/SocketContext';
import { RoomProvider } from './Context/RoomContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SocketProvider>
      <UserProvider>
        <RoomProvider>
          <App1 />
        </RoomProvider>
      </UserProvider>
    </SocketProvider>
  </React.StrictMode>
);

