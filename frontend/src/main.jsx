import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.scss';  // Global styles for the application

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
