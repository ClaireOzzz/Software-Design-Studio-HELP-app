import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

//icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import NotificationCard from './NotificationCard';


export default function NotificationViewAll() {
    let navigate = useNavigate();
    let params = useParams();

    return (

    <div style={{zIndex:'2', width:'100%'}}>
    
        {/* back button */}
        <Button variant="text" size="small" textAlign='left' sx={{ paddingTop: '10%', paddingLeft: '5%', mb: '5%' }} onClick={() => {
          navigate("/notification_list");
         }}>

            <ArrowBackIosIcon sx={{ color: "#D22108" }} />
            <Typography color="#D22108" variant="button" fontsize='15' fontWeight='900' >
                BACK
             </Typography>
        </Button>
         
        <NotificationCard />

     </div>

    )
}