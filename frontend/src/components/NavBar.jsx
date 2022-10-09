import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

// import mui
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BadgeIcon from '@mui/icons-material/Badge';
import FeedIcon from '@mui/icons-material/Feed';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import TagFacesRoundedIcon from '@mui/icons-material/TagFacesRounded';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import { USER, FEED, PROFILE, DECEASED, MAP, OTHER } from "navigation/routeConfig";
import { CHATBOT } from "navigation/routeConfig";
import chatbotpopup from "assets/chatbotpopup.png"

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Fade appear={false} in={!trigger}>
      {children}
    </Fade>
  );
}

export default function NavBar(props) {
  let navigate = useNavigate(); // for url navigation
  const location = useLocation(); // get current url path
  const { t } = useTranslation(); // for translation
  const [value, setValue] = useState(location.pathname.split("/")[3]); // for navbar highlighted tab

  const [open, setOpen] = React.useState(true); // FOR CHATBOT ADVERT 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway' || reason === 'scrolldown') {
      return setOpen(false);
    }

    setOpen(false);
  };

  const handleClick = (value) => {
    navigate(`${USER}/${location.pathname.split("/")[2]}/${value}`);
  }

  // handle tab highlight on page reload
  useEffect(() => {
    setValue(location.pathname.split("/")[3]);
  }, [location])

  return (
    <div>

      <HideOnScroll {...props}>
        <Container maxWidth="lg" width={200}>
          {/* <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}> */}
          {/* <Snackbar open={open} onClose={handleClose}>
            <Box
              overflow='hidden'
              position="absolute" bottom="0px"
              component="img"
              src={chatbotpopup}
              sx={{ zIndex: '1', width: '300px', bottom: "80px" }}
            />
          </Snackbar> */}
          <Fab aria-label="add" className="chatbotBtn" >
            <TagFacesRoundedIcon className="chatbot-icon" style={{ fill: "#FFFFFF" }} value="chatbot" onClick={() => handleClick(CHATBOT)} sx={{
              animation: "spin 2s linear ",
              "@keyframes spin": {
                "0%": {
                  transform: "rotate(360deg)",
                },
                "100%": {
                  transform: "rotate(0deg)",
                },
                animationDuration: "2000"
              },
            }} />
          </Fab>
        </Container>
      </HideOnScroll>

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3} className="botNav">
        <BottomNavigation
          showLabels
          value={value}
          className="styleNav"
          onChange={(event, newValue) => {
            setValue(newValue);
            navigate(newValue);
          }}
        >

          <BottomNavigationAction label={t('navbar.feed')} value="feed" onClick={() => handleClick(FEED)} icon={<FeedIcon />} />
          <BottomNavigationAction label={t('navbar.map')} value="map" onClick={() => handleClick(MAP)} icon={<MapIcon />} />
          <BottomNavigationAction label={t('navbar.deceased')} value="deceased" onClick={() => handleClick(DECEASED)} icon={<BadgeIcon />} />
          <BottomNavigationAction label={t('navbar.other')} value="other" onClick={() => handleClick(OTHER)} icon={<InfoIcon />} />
          <BottomNavigationAction label={t('navbar.profile')} value="profile" onClick={() => handleClick(PROFILE)} icon={<PersonIcon />} />

        </BottomNavigation>
      </Paper>
    </div>
  );
}
