import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import GettingStarted from './Getting_Started.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gettingstarted" element={<GettingStarted />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
