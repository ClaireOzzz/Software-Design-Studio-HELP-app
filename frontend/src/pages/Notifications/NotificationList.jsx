import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
// import mui related
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
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
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]); // to store notifications
  const [users, setUsers] = useState([]); // to store users
  const [connections, setConnections] = useState([]); // to store connections
  const [isLoading, setIsLoading] = useState(true); // for loading display trigger

  // get all notifications and user on page load
  useEffect(() => {
    setIsLoading(true);
    handleUpdateNotification();
    // eslint-disable-next-line
  }, []);

  const handleUpdateNotification = () => {
    (async () => {
      try {
        const res = await getAllNotifications(userid);
        // console.log(res.data);
        setNotifications(res.data);
        const user_res = await getAllUsers();
        // console.log(user_res.data);
        setUsers(user_res.data);
        const connection_res = await getSuccessfulConnections(userid);
        // console.log(connection_res.data);
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

    <div style={{ paddingBottom: '80px' }}>
      <Box
        sx={{
          background: '#D22108',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          mb: 2,
          pb: 2
        }}>

        <Container maxWidth="lg" sx={{ zIndex: '2', width: '100%' }}>
          <div className="mt-3">
            <Button variant="text" size="small" onClick={() => navigate(-1)}>
              <ArrowBackIosIcon sx={{ color: "#FFFFFF" }} />
              <Typography className="close-request" color="#FFFFFF" variant="button" fontSize={15} fontWeight='900' >
                {t('back')}
              </Typography>
            </Button>

            <Typography variant="h5" color="#FFFFFF" component="div" sx={{ fontWeight: 'bold', m: '1rem 0 0 5px' }}>
              {t('noti.notification')}
            </Typography>
          </div>
        </Container>
      </Box>
      <Container maxWidth="lg">

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

            <div style={{ width: '100%', textAlign: 'center' }}>

              <Button variant="text" size="small" align='center' sx={{ p: '10px 0' }} onClick={() => {
                navigate("all");
              }}>
                <Typography color="#D22108" variant="button" fontSize='15' fontWeight='900' align='center' >
                  {t('noti.view_all_offers')}
                </Typography>
              </Button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            {t('noti.no_noti')}
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
            {t('noti.contact_details')}
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
            {t('noti.no_contact')}
          </div>
        )}


      </Container>
    </div>

  )
}



// Information to be recieved: 