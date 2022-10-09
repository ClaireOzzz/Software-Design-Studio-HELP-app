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
import { ReactComponent as WhatsAppIcon } from 'assets/whatsapp.svg';
import { ReactComponent as TelegramIcon } from 'assets/telegram.svg';
import { ReactComponent as ViberIcon } from 'assets/viber.svg';
import { ReactComponent as WechatIcon } from 'assets/wechat.svg';
import { ReactComponent as FacebookIcon } from 'assets/facebook-messenger.svg';
import { ReactComponent as LineIcon } from 'assets/line.svg';
import { ReactComponent as MessageIcon } from 'assets/phone-message.svg';

// local files
import { getRequestDetails, createNotification } from "utils/api";
import { ACCEPT_REQUEST, FEED } from "navigation/routeConfig";
import FeedBanner from "../Feed/components/FeedBanner";
// import Warning from "./Warning";

export default function RequestDetails(props) {
  let navigate = useNavigate(); // for url navigation
  let params = useParams(); // use to obtain request id from url
  const { t } = useTranslation('request'); // for translation
  const [requestDetails, setRequestDetails] = useState({}); // to store request details
  const [open, setOpen] = useState(false);

  // use to toggle contact display
  const contactType = {
    "Whatsapp": WhatsAppIcon,
    "Telegram": TelegramIcon,
    "Viber": ViberIcon,
    "Wechat": WechatIcon,
    "Facebook": FacebookIcon,
    "Line": LineIcon,
    "Phone": MessageIcon,
  }

  // send notification
  const sendNotification = (userID, requestID) => {
    // accept notification
    (async () => {
      try {
        const res = await createNotification(userID, requestID);
        // console.log(res.data);
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
        // console.log(res.data);
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
      if (requestDetails.request_type === "medical") {
        return (
          <>
            <Typography gutterBottom variant="h6" className="details-title">
              {t('new.quantity')}
            </Typography>
            <Box>{requestDetails.quantity.qty}</Box>
          </>
        )
      }
      return (
        <>
          <Typography gutterBottom variant="h6" className="details-title">
            {t('details.num_quantity')}
          </Typography>
          {requestDetails.quantity.Adult !== 0 ?
            <Box>{requestDetails.quantity.adults} {t('details.adults')}</Box> : ""
          }
          {requestDetails.quantity.Child !== 0 ?
            <Box>{requestDetails.quantity.children} {t('details.children')}</Box> : ""
          }
          {requestDetails.quantity.Infant !== 0 ?
            <Box>{requestDetails.quantity.infants} {t('details.infants')}</Box> : ""
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
            return (ContactTypeIcon ? <ContactTypeIcon style={{ fill: "#E97E6F", width: 18, margin: "5 2 2 2" }} key={mode} /> : "");
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

  return (
    <div className="request-details" style={{ paddingBottom: '80px' }}>

      <FeedBanner backPage={FEED} icon={requestDetails.request_type} title={requestDetails.title} username={requestDetails.username} />
      <Container maxWidth="lg">

        <Box b={10} sx={{ padding: '0 5px' }}>
          {handleQuantity(requestDetails.quantity)}
          {requestDetails.request_type === "transport" ?
            <>
              <Typography gutterBottom variant="h6" component="div" className="details-title">
                {t('details.from')}
              </Typography>

              <Typography gutterBottom component="div">
                {requestDetails.location.from.name}
              </Typography>

              <Typography gutterBottom variant="h6" component="div" className="details-title">
                {t('details.to')}
              </Typography>

              <Typography gutterBottom component="div">
                {requestDetails.location.to.name}
              </Typography>
            </>
            : ""
          }
          {/* {requestDetails.request_type === "transport" ?
            <>
              <Typography gutterBottom variant="h6" component="div" className="details-title">
                {t('details.meeting_location')}
              </Typography>

              <Typography gutterBottom component="div">
                {requestDetails.location.from.name}
              </Typography>
            </>
            : ""
          } */}

          <Typography gutterBottom variant="h6" component="div" className="details-title">
            {t('details.description')}
          </Typography>

          <Typography gutterBottom component="div">
            {requestDetails.description}
          </Typography>

          <Typography gutterBottom variant="h6" component="div" className="details-title" >
            {t('details.preferred_contacts')}
          </Typography>

          {handleContactDisplay(requestDetails.preferred_mode_of_contact)}

        </Box>
        {requestDetails.user_id !== Number(localStorage.getItem('help-login-id')) &&
          <Box textAlign='center'>
            <Button className="accept-request mt-3" variant="contained" sx={{ fontSize: 18 }} onClick={handleClickOpen}>
              {t('details.acceptBtn')}
            </Button>
          </Box>
        }
      </Container>

      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          maxWidth: 'xs',
          '& .MuiDialog-paper': { borderRadius: 3, width: '70%', maxHeight: 435 }
        }}
      >
        <DialogTitle id="alert-dialog-title" textAlign={'center'} variant="h5" color="#D22108" component="div" sx={{ fontWeight: 'bold', textTransform: "uppercase" }}>
          {t('details.warning')}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ marginBottom: '10px' }}>
            {t('details.beware')}
          </Typography>
          <Typography sx={{ marginBottom: '10px' }}>
            {t('details.be_responsible')}
          </Typography>
          <Typography sx={{ marginBottom: '10px' }}>
            <Trans i18nKey="details.tips" t={t}>
              Click <a href="https://tonytangebirah.wixsite.com/help/fraud-and-safety-policy" target="_blank" rel="noreferrer">here</a> for some tips to help you.
            </Trans>
          </Typography>
          <Typography sx={{ marginBottom: '10px' }}>
            {t('details.continue')}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ '& .MuiDialogActions-root': { flex: 'none' } }}>
          <Button variant="contained" sx={{ fontSize: 18 }} onClick={() => sendNotification(params.userid, requestDetails.id)}>{t('details.continueBtn')}</Button>
          <Button variant="outlined" sx={{ fontSize: 18 }} onClick={handleCancel}>{t('details.cancelBtn')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

