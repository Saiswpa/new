import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggle } from './features/drawer/drawerSlice'; 

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography'; 
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddPatient from './components/AddPatient'; 
import PatientList from './components/PatientList';

function App() {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
          <Toolbar>
            <div style={{ flexGrow: 1 }} /> {/* Add a spacer to push the date and time to the right */}
            {/* Display current date and time */}
            <Typography variant="body1">
              {currentTime.toLocaleString()}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => dispatch(toggle())}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Sidebar />
        <Routes>
          <Route path="/" element={<div></div>} /> {/* Assuming a Home Page */}
          <Route path="/addPatient" element={<AddPatient />} />
          <Route path="/patientList" element={<PatientList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
