import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import UserDetailsProvider from './utils/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserDetailsProvider>
      <App />
    </UserDetailsProvider>
  </React.StrictMode>
);

