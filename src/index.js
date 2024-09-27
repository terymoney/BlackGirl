import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Include global styles if needed
import App from './App';  // Main App component


// Render the App component to the root DOM element
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Make sure there's a 'root' div in your public/index.html
);

