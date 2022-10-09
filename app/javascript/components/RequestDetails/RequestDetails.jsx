import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
// import mui related
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

//icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { WhatsappOutlined } from "@mui/icons-material";
import TelegramIcon from '@mui/icons-material/Telegram';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// import our own files
import api from 'api/api';

// states for navgivation


const RequestDetails = () => {
  let navigate = useNavigate();
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    // call api function
    // api.fetchRequestDetails().then(response => {
    //     setEventList(response.data);
    //   });
  }, []);

  return (
    <div>

        <Box
          style={{
          backgroundImage: `url(https://i.postimg.cc/0yQgnhLh/Screenshot-2022-06-20-at-12-54-07-PM.png)`
          }}>

         <Button variant="text" size="small" textAlign='left' onClick={() => {
            navigate("/feed");
          }}>
          <ArrowBackIosIcon sx={{color: "white"}} />
          <Typography color="#FFFFFF" variant="button" fontsize='17' >
            BACK
          </Typography>
         </Button>
      

          <Typography variant="h4" color="#FFFFFF" component="div" sx={{ fontWeight: 'bold', pt: 10, b: 1, m: 2 }}>
            Anyone offering a free ride?
          </Typography>

         <Box sx={{ width: "23%", borderRadius: '16px', backgroundColor: '#FFFFFF', m: 2 }}>
          <Typography color="#D22108" component="subtitle2">
            @johnsmith
          </Typography>
         </Box>

         <Box textAlign='right' sx={{ fontSize: 10, letterSpacing: 10 }} >
          <Typography color="#FFFFFF" variant="overline" >
            less than 50 km
          </Typography>
          <LocationOnIcon sx={{color: "white"}}/>
         </Box>


        </Box>
        


      <Box m={3} pt={0} b={10}>

        <Typography gutterBottom variant="h6" component="subtitle" class="card-title">
         Family Size
        </Typography>

        <Box sx={{ typography: '4 Adults'  }}>4 Adults</Box>
        <Box sx={{ typography: '2 Children' }}>2 Children</Box>
        <Box sx={{ typography: '1 Infant(s)' }}>2 Infants</Box>

        <Typography gutterBottom variant="h6" component="div" class="card-title">
         From 
        </Typography>

        <Typography gutterBottom component="div">
          Yavoriv, Lviv Oblast, Ukraine
        </Typography>

        <Typography gutterBottom variant="h6" component="div" class="card-title">
         To
        </Typography>

        <Typography gutterBottom component="div">
          Kamianka-Buzka, Lviv Oblast, Ukraine
        </Typography>

        <Typography gutterBottom variant="h6" component="div" class="card-title">
          Description
        </Typography>

        <Typography gutterBottom component="div">
          Hi guys, I need a ride urgently to visit someone. Thanks in advance.
        </Typography>

        <Typography gutterBottom variant="h6" component="div" class="card-title">
         Preferred Mode of Contact
        </Typography>

        <WhatsappOutlined /> <TelegramIcon />

      </Box>

      <Box textAlign='center'>
        <Button variant="contained" size="large">
         Accept Request
        </Button>
      </Box>


    </div>
  )
}

export default RequestDetails;
