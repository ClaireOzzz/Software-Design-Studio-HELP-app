import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import mui related
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// local import
import LoadingDisplay from "components/LoadingDisplay";
import { NotificationCard } from './components/NotificationCard';
import { ContactCard } from './components/ContactCard';
import { FEED } from "navigation/routeConfig";
import { getAllNotifications, getAllUsers, getSuccessfulConnections } from "utils/api";

export default function NotificationList() {
  let navigate = useNavigate();
  let { userid } = useParams();
  const [notifications, setNotifications] = useState([]); // to store notifications
  const [users, setUsers] = useState([]); // to store users
  const [connections, setConnections] = useState([]); // to store connections
  const [isLoading, setIsLoading] = useState(true); // for loading display trigger

  // get all notifications and user on page load
  useEffect(() => {
    setIsLoading(true);
    handleUpdateNotification();
  }, []);

  const handleUpdateNotification = () => {
    (async () => {
      try {
        const res = await getAllNotifications(userid);
        console.log(res.data);
        setNotifications(res.data);
        const user_res = await getAllUsers();
        console.log(user_res.data);
        setUsers(user_res.data);
        const connection_res = await getSuccessfulConnections(userid);
        console.log(connection_res.data);
        setConnections(connection_res.data.reverse());
        setIsLoading(false);
      }
      catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    })();
  }

  return (

    <div style={{ width: '100%' }} >
      <Box
        style={{
          background: '#D22108',
          position: 'relative',
          overflow: 'hidden'
        }}>
        <Button variant="text" size="small" textalign='left' sx={{ paddingTop: '10%', paddingLeft: '5%' }} onClick={() => {
          navigate(`../../${FEED}`, { replace: true });
        }}>

          <ArrowBackIosIcon sx={{ color: "white" }} />
          <Typography color="#FFFFFF" variant="button" fontSize='15' fontWeight='900' >
            BACK
          </Typography>
        </Button>

        <div textalign='left' >
          <Typography variant="h4" color="#FFFFFF" component="div" sx={{ fontWeight: 'bold', m: '10% 0% 3% 6%' }}>
            Notifications
          </Typography>
        </div>

      </Box>

      {/* if loaded, check whether there is notification, */}
      {/* else, display empty message */}
      {isLoading ? (
        <div style={{ marginBottom: '3rem' }}>
          <LoadingDisplay />
        </div>
      ) : notifications.length !== 0 ? (
        <>
          <NotificationCard
            notifications={notifications}
            users={users}
            handleUpdateNotification={handleUpdateNotification}
          />

          <Divider sx={{ mt: 2 }} />
          <Button variant="text" size="small" align='center' sx={{ p: '0% 0% 3% 32%', pt: '2%' }} onClick={() => {
            navigate("all");
          }}>
            <Typography color="#D22108" variant="button" fontSize='15' fontWeight='900' align='center' >
              View All Offers
            </Typography>
          </Button>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          No Notifications.
        </div>
      )}

      <Divider sx={{ width: '100%', borderBottomWidth: 8 }} />

      {/* Contact details */}
      <Box
        style={{
          position: 'bottom',
          overflow: 'hidden',
          display: 'flex'
        }}>

        <Typography variant="h6" color="#D22108" component="div" sx={{ fontWeight: 'bold', pt: 2, m: '2%  2% 2% 5%' }}>
          Contact Details
        </Typography>
      </Box>
      <Divider />

      {/* if loaded, check whether there is connections, */}
      {/* else, display empty message */}
      {isLoading ? (
        <div style={{ marginBottom: '3rem' }}>
          <LoadingDisplay />
        </div>
      ) : connections.length !== 0 ? (
        <ContactCard
          connections={connections}
          users={users}
        />
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          No Notifications.
        </div>
      )}


    </div>

  )
}



// Information to be recieved: 