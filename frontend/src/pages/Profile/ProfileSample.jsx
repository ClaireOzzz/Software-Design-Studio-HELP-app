import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FilterListIcon from '@mui/icons-material/FilterList';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';

import ProfileRequest from "./ProfileRequest";
import { getThemeProps } from "@mui/system";
import EmptyFeed from "../Feed/EmptyFeed";
   
// def Profile(e): 
//    return <Profile/> 
const Profile = () => {
    // const [profileRequests, setProfileRequests] = useState([])
    const [filters, setFilters] = useState(["pending"])

    // useEffect(()=> {
    //     async function requestEvents() {
    //         try {
    //           // const response = await axios.get('https://gebirah-help-api-qdur742kca-as.a.run.app/api/v1/requests');
    //           const response = await axios.get('http://localhost:3000/api/v1/requests');
    //           console.log(response.data);
    //           setProfileRequests(response.data);
    //         }
    //         catch (error) {
    //           console.log(error);
    //         }
    //       }
    //       requestEvents();
    // }, [])
    let profileRequests = [
        {
            "image": "food-icon",
            "title": "Need food",
            "description": "Really Need Food",
            "status": "pending"
        },
        {
            "image": "transport-icon",
            "title": "Need transport",
            "description": "Really Need transport",
            "status": "pending"
        },
        {
            "image": "food-icon-accepted",
            "title": "Need food",
            "description": "Really Need Food",
            "status": "accepted"
        },
        {
            "image": "transport-icon",
            "title": "Need transport",
            "description": "Really Need transport",
            "status": "pending",
        },
    ]

    // if len(profileRequests) == 0: 
    //     <EmptyFeed/>
    // else: 
    //     <div>Profile Requests is not empty</div>

    const filterRequest = e => {
        return filters.includes(e.status)
    }
    
    return (
        <div> 
            <div>profile image</div>
            {console.log(profileRequests.filter(e => e.status===filters))}
            {
                profileRequests.filter(filterRequest).map(e => <ProfileRequest image={e.image} title={e.title} description={e.description}/> )
            }
        </div>
    )
}

export default Profile 