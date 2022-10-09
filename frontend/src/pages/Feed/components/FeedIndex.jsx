import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import mui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FilterListIcon from '@mui/icons-material/FilterList';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
// import local files
import { getAllRequests } from "utils/api";
import EmptyFeed from "./EmptyFeed";
import { RequestCard } from "./RequestCard";
import LoadingDisplay from "components/LoadingDisplay";

import { NOTIFICATION } from "navigation/routeConfig";

export default function FeedIndex() {
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
        console.log(res.data);
        setIsLoading(false);
        setRequests(res.data);
      }
      catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    })();
  }, []);

  return (

    <Container maxWidth="lg">
      <div style={{ paddingBottom: '80px' }}>
        <Button size="small" sx={{ paddingLeft:'320px', display: 'flex', justifyContent: 'right', paddingTop: '3rem', paddingRight: '0.5rem' }} onClick={() => {
            navigate(`../../${NOTIFICATION}`, { replace: true });
          }}>

          <NotificationsIcon className="notification-icon" style={{ fill: "#D22108", width: 30, fontSize: '2rem'}} />
        </Button>


        <Box sx={{ textAlign: 'left', paddingLeft: '0.5rem', marginTop: '1.25rem' }}>
          <Button variant="contained" size="small" className="filter-button">
            <FilterListIcon style={{ fill: "#FFFFFF", width: 20, paddingRight: 5, paddingLeft: 5 }} />
            <span style={{ color: "#FFFFFF", paddingRight: 5 }}>Filter</span>
          </Button>
        </Box>
        
        {/* if loaded, check whether there is request, */}
        {/* else, display empty message */}
        {isLoading ? (
          <LoadingDisplay />
        ) : requests.length !== 0 ? (
          <RequestCard requests={requests} />
        ) : (
          <EmptyFeed/>
        )}
        <Fab aria-label="add" className="createBtn">
          <AddIcon className="add-icon" style={{ fill: "#FFFFFF" }} onClick={() => navigate(`new`)} />
        </Fab>
      </div>
    </Container>
  )
}
