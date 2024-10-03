// src/App.js
import React from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <div className="App">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HomePage />
        </LocalizationProvider>
    </div>
  );
}

export default App;
