import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import mui
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import useScrollTrigger from '@mui/material/useScrollTrigger';

// import local files
import { getAllRequests } from "utils/api";
import EmptyFeed from "./EmptyFeed";
import { RequestCard } from "./RequestCard";
import LoadingDisplay from "components/LoadingDisplay";
import SearchBar from "./SearchBar"
import { NOTIFICATION } from "navigation/routeConfig";

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

export default function FeedIndex(props) {
  let navigate = useNavigate();
  let { userid } = useParams();
  const [requests, setRequests] = useState([]); // to store requests
  const [isLoading, setIsLoading] = useState(true); // for loading display trigger

  // get all request on page load
  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const res = await getAllRequests(userid);
        // console.log(res.data);
        setIsLoading(false);
        setRequests(res.data);
      }
      catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (

    <Container maxWidth="lg">
      <div style={{ paddingBottom: '80px' }}>
        <div style={{ paddingTop: '3rem', paddingBottom: '1rem', display: 'flex', }}>
          <SearchBar setRequests={setRequests} sx={{ flex: 'auto' }} />
          <IconButton size="small" className="noti-icon" onClick={() => {
            navigate(`../../${NOTIFICATION}`);
          }}>
            <NotificationsIcon className="notification-icon" style={{ fill: "#D22108", width: 30, fontSize: '2rem' }} />
          </IconButton >
        </div>

        {/* if loaded, check whether there is request, */}
        {/* else, display empty message */}
        {isLoading ? (
          <LoadingDisplay />
        ) : requests.length !== 0 ? (
          <RequestCard requests={requests} />
        ) : (
          <EmptyFeed />
        )}

        <HideOnScroll {...props}>
          <Fab aria-label="add" className="createBtn">
            <AddIcon className="add-icon" style={{ fill: "#FFFFFF" }} onClick={() => navigate(`new`)} />
          </Fab>
        </HideOnScroll>
      </div>

    </Container>

  )
}
