import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

// import mui
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BadgeIcon from '@mui/icons-material/Badge';
import FeedIcon from '@mui/icons-material/Feed';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';

import { USER, FEED, PROFILE, DECEASED, MAP, VIEWMORE } from "navigation/routeConfig";
import { USER_ID } from "utils/constants";

export default function NavBar() {
  let navigate = useNavigate(); // for url navigation
  const location = useLocation(); // get current url path
  const [value, setValue] = useState(location.pathname.split("/")[3]); // for navbar highlighted tab

  const handleClick = (value) => {
    navigate(`${USER}/${USER_ID}/${value}`);
  }

  // handle tab highligh on page reload
  useEffect(()=>{
    setValue(location.pathname.split("/")[3]);
  }, [location])

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(newValue);
        }}
      >
        <BottomNavigationAction label="Feed" value="feed" onClick={() => handleClick(FEED)} icon={<FeedIcon />} />
        <BottomNavigationAction label="Map" value="map" onClick={() => handleClick(MAP)} icon={<MapIcon />} />
        <BottomNavigationAction label="Deceased" value="deceased" onClick={() => handleClick(DECEASED)} icon={<BadgeIcon />} />
        <BottomNavigationAction label="Profile" value="profile" onClick={() => handleClick(PROFILE)} icon={<PersonIcon />} />
        <BottomNavigationAction label="View More" value="view_more" onClick={() => handleClick(VIEWMORE)} icon={<InfoIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
