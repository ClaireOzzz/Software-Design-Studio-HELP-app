
import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

// import mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import Divider from '@mui/material/Divider';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { handleNotification } from "utils/api";
import { useState } from "react";

export const NotificationCard = ({ notifications, users, handleUpdateNotification }) => {
  let { userid } = useParams();
  const [open, setOpen] = useState(false);
  const [popUpStatus, setPopUpSatus] = useState("accepted");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNotificationAction = (userID, notificationId, type) => {
    // accept notification
    (async () => {
      try {
        const res = await handleNotification(userID, notificationId, type);
        handleUpdateNotification();
        console.log(res.data);
        {
          type === "accept" ?
            setPopUpSatus("Accepted") :
            setPopUpSatus("Rejected")
        }
        handleClickOpen();
      }
      catch (error) {
        console.log(error);
      }
    })();
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      {notifications.map((notification) => {
        return (
          <Grid item xs={12} sm={6} key={notification.id}>
            <Card className="notification-card">
              <CardActionArea >
                <Box sx={{ flexGrow: 1 }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item xs={3} md={2} sx={{ pl: '3%' }}>
                      <Avatar
                        alt={users[notification.from_id-1].username}
                        src={users[notification.from_id-1].username}
                        sx={{ width: 65, height: 65 }}
                      />
                    </Grid>
                    <Grid item xs={9} md={10}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto', p: '0% 0.75rem 0% 0%', '&:last-child': { pb: 0, mb: '3%', mt: '3%' } }}>
                          <Typography gutterBottom variant="body2" component="div" >
                            @{users[notification.from_id-1].username}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" >
                            {notification.message}
                          </Typography>
                          <Typography className="proximity" >
                            3 mins ago
                          </Typography>

                        </CardContent>

                        <Box justifyContent="space-between" sx={{ display: 'flex', m: '3% 25% 5% 0%' }}>
                          <Button className="accept-button" variant="contained" sx={{ borderRadius: 8, p: '1%  10% 1% 10%' }} onClick={() => handleNotificationAction(userid, notification.id, "accept")} >Accept</Button>
                          <Button className="reject-button" variant="outlined" sx={{ borderRadius: 8, p: '1%  10% 1% 10%' }} onClick={() => handleNotificationAction(userid, notification.id, "reject")} >Decline</Button>
                        </Box>
                      </Box>
                    </Grid>
                    <Divider />
                  </Grid>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        )
      })}


      {/* POPUP */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          maxWidth: 'xs',
          '& .MuiDialog-paper': { borderRadius: 3, width: '70%', maxHeight: 435 }
        }}>
        <DialogTitle id="alert-dialog-title" textAlign={'center'} variant="h5" color="#D22108" component="div" sx={{ fontWeight: 'bold', pt: '10%', textTransform: "uppercase" }}>
          {`HELP ${popUpStatus}!`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" textAlign={'center'} >
            {`We have archived your request. Go to Profile > My Requests > ${popUpStatus} if you wish to repost it.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Button variant="contained" sx={{ display: 'flex', m: 'auto', borderRadius: 3, p: '3% 30% 3% 30%', mb: '10%' }} onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {/* END OF POPUP */}
    </Grid>
  )
}

NotificationCard.propTypes = {
  notification: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    from_id: PropTypes.number,
    message: PropTypes.string,
    connection_id: PropTypes.number,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  })),
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    password: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    contacts: PropTypes.shape({
      Phone: PropTypes.number,
      Telegram: PropTypes.string,
    }),
  })),
};