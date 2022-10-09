import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import mui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// images
import accommodationIcon from 'assets/accommodation.png';
import bandageIcon from 'assets/bandage.png';
import foodIcon from 'assets/food.png';
import transportIcon from 'assets/transport.png';
// local files
import { getRequestDetails } from "utils/api";
import { ACCEPT_REQUEST, FEED } from "navigation/routeConfig";

export default function RequestDetails() {
  let navigate = useNavigate(); // for url navigation
  let params = useParams(); // use to obtain request id from url
  const [requestDetails, setRequestDetails] = useState({}); // to store request details

  // use to toggle contact display
  const contactType = {
    "Whatsapp": WhatsAppIcon,
    "Telegram": TelegramIcon,
  }

  // use to toggle bg image base on request types
  const iconType = {
    "medical": bandageIcon,
    "accomodation": accommodationIcon,
    "transport": transportIcon,
    "food": foodIcon,
  }

  // get request details on page load
  useEffect(() => {
    (async () => {
      try {
        const res = await getRequestDetails(params.requestid);
        console.log(res.data);
        setRequestDetails(res.data);
      }
      catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  // handles quantity display
  const handleQuantity = (quantity) => {
    if (quantity) {
      return (
        <>
          {requestDetails.quantity.Adult !== 0 ?
            <Box sx={{ typography: `${requestDetails.quantity.Adult} Adults` }}>{requestDetails.quantity.Adult} Adults</Box> : ""
          }
          {requestDetails.quantity.Child !== 0 ?
            <Box sx={{ typography: `${requestDetails.quantity.Child} Children` }}>{requestDetails.quantity.Child} Children</Box> : ""
          }
          {requestDetails.quantity.Infant !== 0 ?
            <Box sx={{ typography: `${requestDetails.quantity.Infant} Infant(s)` }}>{requestDetails.quantity.Infant} Infant(s)</Box> : ""
          }
        </>
      )
    }
  }

  // handles contact display
  const handleContactDisplay = (mode) => {
    if (mode) {
      return (
        <>
          {requestDetails.preferred_mode_of_contact.map((mode) => {
            const ContactTypeIcon = contactType[mode];
            return (ContactTypeIcon ? <ContactTypeIcon sx={{ fontSize: 27, marginTop: '1%', fill: "#E97E6F" }} key={mode} /> : "");
          })}
        </>
      )
    }
  }

  return (
    <div className="request-details" style={{ paddingBottom: '80px' }}>

      <Box
        sx={{
          background: '#D22108',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex'
        }}>

        <img
          src={iconType[requestDetails.request_type]}
          style={{
            position: 'absolute',
            right: '-50px',
            top: '25%',
            opacity: '0.4',
            height: '70%',
            objectFit: 'cover',
            zIndex: '1'
          }}
          alt="icon"
        />

        <Container maxWidth="lg" sx={{ zIndex: '2', width: '100%' }}>
          <div className="mt-3">
            <Button variant="text" size="small" onClick={() => {
              navigate(FEED);
            }}>

              <ArrowBackIosIcon sx={{ color: "white" }} />
              <Typography className="close-request" color="#FFFFFF" variant="button" fontSize={15} fontWeight='900' >
                BACK
              </Typography>
            </Button>


            <Typography variant="h4" color="#FFFFFF" component="div" sx={{ fontWeight: 'bold', m: '1rem 0 0 5px' }}>
              {requestDetails.title}
            </Typography>

            <Typography color="#D22108" className="username">
              @ {requestDetails.username}
            </Typography>

            <Box flexDirection='row-reverse' display='flex' sx={{ fontSize: 14, letterSpacing: 10 }} >
              <LocationOnIcon sx={{ color: "white" }} />
              <Typography color="#FFFFFF" variant="overline" >
                less than 50 km
              </Typography>
            </Box>
          </div>
        </Container>
      </Box>
      <Container maxWidth="lg">

        <Box b={10} sx={{ padding: '0 5px' }}>

          <Typography gutterBottom variant="h6" className="details-title" style={{ marginTop: 20 }}>
            Family Size
          </Typography>
          {handleQuantity(requestDetails.quantity)}
          {requestDetails.request_type === "transport" ?
            <>
              <Typography gutterBottom variant="h6" component="div" className="details-title">
                From
              </Typography>

              <Typography gutterBottom component="div">
                Yavoriv, Lviv Oblast, Ukraine
              </Typography>

              <Typography gutterBottom variant="h6" component="div" className="details-title">
                To
              </Typography>

              <Typography gutterBottom component="div">
                Kamianka-Buzka, Lviv Oblast, Ukraine
              </Typography>
            </>
            : ""
          }

          <Typography gutterBottom variant="h6" component="div" className="details-title">
            Description
          </Typography>

          <Typography gutterBottom component="div">
            {requestDetails.description}
          </Typography>

          <Typography gutterBottom variant="h6" component="div" className="details-title" >
            Preferred Mode of Contact
          </Typography>

          {handleContactDisplay(requestDetails.preferred_mode_of_contact)}

        </Box>

        <Box textAlign='center'>
          <Button className="accept-request mt-3" variant="contained" sx={{ fontSize: 18 }} onClick={() => navigate(ACCEPT_REQUEST.split("/")[1])}>
            Accept Request
          </Button>
        </Box>
      </Container>


    </div>
  )
}

