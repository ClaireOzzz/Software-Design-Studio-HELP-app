import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';
// import mui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//icons
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';

// local files
import { getRequestDetails, createNotification } from "utils/api";
import { ACCEPT_REQUEST, FEED } from "navigation/routeConfig";
import FeedBanner from "../Feed/components/FeedBanner";
// import Warning from "./Warning";

export default function RequestDetails(props) {
  const { t, i18n } = useTranslation(); // for translation
  let navigate = useNavigate(); // for url navigation
  let params = useParams(); // use to obtain request id from url
  const [requestDetails, setRequestDetails] = useState({}); // to store request details
  const [open, setOpen] = useState(false);

  // use to toggle contact display
  const contactType = {
    "Whatsapp": WhatsAppIcon,
    "Telegram": TelegramIcon,
  }

  // send notification
  const sendNotification = (userID, requestID) => {
    // accept notification
    (async () => {
      try {
        const res = await createNotification(userID, requestID);
        console.log(res.data);
        // setOpen(false);
        navigate(ACCEPT_REQUEST);
        setOpen(false);
      }
      catch (error) {
        console.log(error);
      }
    })();
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
            <Box sx={{ typography: `${requestDetails.quantity.adults} Adults` }}>{requestDetails.quantity.adults} Adults</Box> : ""
          }
          {requestDetails.quantity.Child !== 0 ?
            <Box sx={{ typography: `${requestDetails.quantity.children} Children` }}>{requestDetails.quantity.children} Children</Box> : ""
          }
          {requestDetails.quantity.Infant !== 0 ?
            <Box sx={{ typography: `${requestDetails.quantity.infants} Infant(s)` }}>{requestDetails.quantity.infants} Infant(s)</Box> : ""
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

  // handles button click
  const handleClickOpen = () => {
    setOpen(true);
  };

  // handles 'cancel' button click
  const handleCancel = () => {
    setOpen(false);
  }

  const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' }
  };

  return (
    <div className="request-details" style={{ paddingBottom: '80px' }}>

      <FeedBanner backPage={FEED} icon={requestDetails.request_type} title={requestDetails.title} username={requestDetails.username} />
      <Container maxWidth="lg">
        {Object.keys(lngs).map((lng) => (
          <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
            {lngs[lng].nativeName}
          </button>
        ))}

        <Box b={10} sx={{ padding: '0 5px' }}>

          <Typography gutterBottom variant="h6" className="details-title">
            {t('description.quatity')}
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
            Choose how you want to be contacted
          </Typography>

          {handleContactDisplay(requestDetails.preferred_mode_of_contact)}

        </Box>

        <Box textAlign='center'>
          <Button className="accept-request mt-3" variant="contained" sx={{ fontSize: 18 }} onClick={handleClickOpen}>
            Click to Help
          </Button>
        </Box>
      </Container>

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          maxWidth: 'xs',
          '& .MuiDialog-paper': { borderRadius: 3, width: '70%', maxHeight: 435 }
        }}
      >
        <DialogTitle id="alert-dialog-title" textAlign={'center'} variant="h5" color="#D22108" component="div" sx={{ fontWeight: 'bold', textTransform: "uppercase" }}>
          {"WARNING"}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ marginBottom: '10px' }}>
            Beware of your safety! Your safety comes first. Beware of fraudsters and criminals.
          </Typography>
          <Typography sx={{ marginBottom: '10px' }}>
            As you use our HELP app, you will be contacted by other parties directly. HELP is unable to verify the authenticity of the offers and requests for help. We encourage you to take reasonable steps to verify the legitimacy of the other party and avoid being deceived. We cannot and do not validate or research on users of our app.
          </Typography>
          <Typography sx={{ marginBottom: '10px' }}>
            Click <a href="https://tonytangebirah.wixsite.com/help/fraud-and-safety-policy">here</a> for some tips to help you.
          </Typography>
          <Typography sx={{ marginBottom: '10px' }}>
            Click 'Continue' to proceed, or 'Cancel' to go back.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ '& .MuiDialogActions-root': { flex: 'none' } }}>
          <Button variant="contained" sx={{ fontSize: 18 }} onClick={() => sendNotification(params.userID, requestDetails.id)}>Continue</Button>
          <Button variant="outlined" sx={{ fontSize: 18 }} onClick={handleCancel}>Cancel</Button>
        </DialogActions>
        {/* <Box>
            <DialogActions sx={{ '& .MuiDialogActions-root': { flex: 'none' } }}>
                <Button variant="contained" sx={{ fontSize: 18 }} onClick={() => sendNotification(params.userID, requestDetails.id)}>Continue</Button>
                <Button variant="outlined" sx={{ fontSize: 18 }} onClick={handleCancel}>Cancel</Button>
            </DialogActions>
          </Box> */}
      </Dialog>
    </div>
  )
}

