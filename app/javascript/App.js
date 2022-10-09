import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
// import mui related
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BadgeIcon from '@mui/icons-material/Badge';
import FeedIcon from '@mui/icons-material/Feed';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';

// import our own files
import "./App.css";

export default function App() {
  let navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("feed"); // states for navgivation

  // set up app theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#D22108',
      },
    },
  });

  useEffect(() => {
    navigate("/" + value);
  }, [value])

  const handleClick = (value) => {
    if (value != location.pathname) {
      navigate("/" + value);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Outlet />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Feed" value="feed" onClick={() => handleClick("feed")} icon={<FeedIcon />} />
          <BottomNavigationAction label="Map" value="map" onClick={() => handleClick("map")} icon={<MapIcon />} />
          <BottomNavigationAction label="Deceased" value="deceased" onClick={() => handleClick("deceased")} icon={<BadgeIcon />} />
          <BottomNavigationAction label="Profile" value="profile" onClick={() => handleClick("profile")} icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </ThemeProvider>
  );
}