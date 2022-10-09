import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

// import mui related
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CardActionArea } from '@mui/material';
import Divider from '@mui/material/Divider';

//icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import NotificationCard from './NotificationCard';
import ContactCard from './ContactCard';
import EmptyNotificationPage from './EmptyNotificationPage';

export default function NotificationList() {
    let navigate = useNavigate();
    let params = useParams();

    return (
      
    <div style={{width:'100%'}} >
      <Box
      style={{
        background: '#D22108',
        position: 'relative',
        overflow: 'hidden',
        mb: '2%'
        }}>
          <Button variant="text" size="small" textAlign='left' sx={{ paddingTop: '10%', paddingLeft: '5%'}} onClick={() => {
            navigate("/feed");
          }}>

            <ArrowBackIosIcon sx={{ color: "white" }} />
            <Typography color="#FFFFFF" variant="button" fontsize='15' fontWeight='900' >
              BACK
            </Typography>
          </Button>

          <div textAlign='left' >
            <Typography variant="h4" color="#FFFFFF" component="div" sx={{ fontWeight: 'bold', m:'10% 0% 3% 6%'}}>
              Notifications
            </Typography>
          </div>

      </Box>

      <NotificationCard /> 
            
      <Divider sx={{ mt: 2 }}/>
      <Button variant="text" size="small" align='center' sx={{ p:'0% 0% 3% 32%', pt: '2%' }} onClick={() => {
          navigate("/view_all");
        }}>
          <Typography color="#D22108"  variant="button" fontsize='15' fontWeight='900' align='center' >
            View All Offers
          </Typography>
      </Button>
      
      <Divider sx={{width:'100%', borderBottomWidth: 8}} />

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

      <ContactCard />

      
    </div>

    )
}



// Information to be recieved: 