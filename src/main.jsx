import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import App.js from the src folder
import './index.css'; // Global styles
import GettingStarted from './Getting_Started.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Get the root element where React will render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gettingstarted" element={<GettingStarted />} />
        {/* Add other routes if needed */}
      </Routes>
    </Router>
  </React.StrictMode>
);
