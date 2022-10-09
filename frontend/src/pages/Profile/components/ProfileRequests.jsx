import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { CardActionArea } from '@mui/material';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import TelegramIcon from '@mui/icons-material/Telegram';
import { ReactComponent as WhatsAppIcon } from 'assets/whatsapp.svg';
import { ReactComponent as TelegramIcon } from 'assets/telegram.svg';
import { ReactComponent as ViberIcon } from 'assets/viber.svg';
import { ReactComponent as WechatIcon } from 'assets/wechat.svg';
import { ReactComponent as FacebookIcon } from 'assets/facebook-messenger.svg';
import { ReactComponent as LineIcon } from 'assets/line.svg';
import { ReactComponent as MessageIcon } from 'assets/phone-message.svg';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { FEED, PROFILE } from "navigation/routeConfig";
import { deleteRequest, repostRequest } from "utils/api";
import accommodationIcon from 'assets/accommodation.png';
import bandageIcon from 'assets/bandage.png';
import foodIcon from 'assets/food.png';
import transportIcon from 'assets/transport.png';

// Proximity imports
import { getUserCoordinates, getProximity } from "utils/locationService";
import { useState } from "react";


export default function ProfileRequests(props) {
  let navigate = useNavigate();
  let { userid } = useParams();
  const { t } = useTranslation('request'); // for translation
  const [open, setOpen] = useState(false);
  const [requestId, setRequestId] = useState();

  const tab = props.tab;
  const status = props.status;

  const contactType = {
    "Whatsapp": WhatsAppIcon,
    "Telegram": TelegramIcon,
    "Viber": ViberIcon,
    "Wechat": WechatIcon,
    "Facebook": FacebookIcon,
    "Line": LineIcon,
    "Phone": MessageIcon,
  }

  const iconType = {
    "medical": bandageIcon,
    "accommodation": accommodationIcon,
    "transport": transportIcon,
    "food": foodIcon,
  }

  // PROXIMITY START ======================================================================

  function getProximityString(lat, long, request) {

    if (!lat || !long) {
      return "";
    }
    if (request.request_type === "transport" && ([
      request.location.from.lng,
      request.location.from.lat,
      request.location.to.lng,
      request.location.to.lat,].includes(null))
    ) {
      // console.log(request.location)
      return "";
    }
    if (request.request_type !== "transport" && ([
      request.location.lng,
      request.location.lat,].includes(null))
    ) {
      // console.log(request.location)
      return "";
    }

    const latlng = getProximity(lat, long, request);

    if (request.request_type === "transport") {
      return latlng[0] + t('card.requesting_travel') + " " + latlng[1] + t("card.away")
    }
    return latlng[0] + t('card.away')
  }

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  getUserCoordinates(setLat, setLong);

  // PROXIMITY STUFF END ======================================================================
  // More stuff at Proximity field of render


  function handleDelete() {
    (async () => {
      try {
        const res = await deleteRequest(userid, requestId);
        // console.log(res.data);
        props.requestEvents();
        setOpen(false);
      }
      catch (error) {
        console.log(error);
        alert("failure");
      }
    })();
  }

  // function handleEdit(id, requestID) {
  //   (async () => {
  //     try {
  //       const res = await editRequest(id, requestID);
  //       console.log(res.data);
  //       // alert("Request deleted!");
  //       // navigate("/");
  //     }
  //     catch (error) {
  //       console.log(error);
  //       alert("failure");
  //     }
  //   })();
  // }

  function handleRepost(id, requestID) {
    (async () => {
      try {
        const res = await repostRequest(id, requestID);
        // console.log(res.data);
        props.requestEvents();
        alert("Request posted!");
        navigate(`../${PROFILE}`);
      }
      catch (error) {
        console.log(error);
        alert("failure");
      }
    })();
  }

  const handleClickOpen = (request) => {
    setRequestId(request.id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        {props.requests.map((request) => {
          return (
            <Grid item xs={12} sm={6} key={request.id}>
              <div style={{ position: 'relative' }}>
                <Card className="card request">
                  <CardActionArea
                    onClick={() => {
                      navigate("../" + FEED + "/" + request.id);
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      {/* {(tab === "sent" && status === "pending") ? (
                    <div style={{ display: 'block', marginRight: '2%' }}>
                      <DeleteIcon style={{ fill: "#D22108", width: 22, margin: "5 2 0 3", float: "right" }} onClick={() => handleDelete(params.userid, request.id)} />
                      <EditIcon style={{ fill: "#D22108", width: 22, margin: "5 3 0 2", float: "right" }} onClick={() => handleEdit(params.userid, request.id)} />
                    </div>
                  ) : (
                    <></>
                  )} */}
                      <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item xs={4} md={2} style={{ textAlign: 'center' }}>
                          <CardMedia
                            component="img"
                            image={iconType[request.request_type] || "food"}
                            alt="icon"
                            className={`${request.request_type} card-media`}
                          />
                        </Grid>
                        <Grid item xs={8} md={10}>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto', p: '0% 0.75rem 0% 0%', '&:last-child': { pb: 0 } }}>
                              <Typography gutterBottom variant="h5" component="div" className="card-title">
                                {request.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" className="card-text">
                                {request.description}
                              </Typography>
                              <Typography className="proximity">
                                {getProximityString(lat, long, request)}
                              </Typography>

                              {(request.preferred_mode_of_contact.length > 2) ? (
                                <div style={{ display: 'inline-block', margin: "5px 2px", float: "right" }}>
                                  <Typography style={{ color: "#6F6F6F", fontSize: "0.9em" }}>
                                    +{request.preferred_mode_of_contact.length - 2}
                                  </Typography>
                                </div>
                              ) : <></>}

                              {request.preferred_mode_of_contact.slice(0, 2).map((mode) => {
                                const ContactTypeIcon = contactType[mode];
                                return (ContactTypeIcon ? <ContactTypeIcon style={{ fill: "#E97E6F", width: 18, margin: "5 2", float: "right" }} key={mode} /> : "");
                              })}

                            </CardContent>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardActionArea>

                  {(tab === "sent" && status === "expired") ? (
                    <Button id={"repost-icon-" + request.title.replaceAll(' ', '-') }variant="contained" sx={{ fontSize: 14, float: "right", margin: "2% 3% 3%" }} onClick={() => handleRepost(userid, request.id)} >
                      {t('card.repost')}
                    </Button>
                  ) : (
                    <></>
                  )}
                </Card>
                {(tab === "sent" && status === "pending") &&
                  <div style={{ position: "absolute", bottom: 0, left: "0.75rem", cursor: 'pointer' }}>
                    <DeleteIcon class={"delete-icon-" + request.title.replaceAll(' ', '-') } style={{ fill: "#D22108", width: 22, margin: "5 2 0 3" }} onClick={() => handleClickOpen(request)} />
                    {/* <EditIcon style={{ fill: "#D22108", width: 22, margin: "5 3 0 2", float: "right" }} onClick={() => handleEdit(params.userid, request.id)} /> */}
                  </div>
                }
              </div>
            </Grid>
          )
        })}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          maxWidth: 'xs',
          '& .MuiDialog-paper': { borderRadius: 3, maxHeight: 435 }
        }}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('delete.msg')}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ '& .MuiDialogActions-root': { flex: 'none' } }}>
          <Button variant="contained" onClick={handleDelete}>{t('delete.deleteBtn')}</Button>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            {t('details.cancelBtn')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}