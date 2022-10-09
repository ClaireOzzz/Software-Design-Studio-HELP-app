
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';

// import mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { handleNotification } from "utils/api";
import { timeFrom } from "utils";

export const NotificationCard = ({ notifications, users, handleUpdateNotification }) => {
  let { userid } = useParams();
  const { t } = useTranslation();
  const location = useLocation(); // get current url path
  const [open, setOpen] = useState(false);
  const [popUpStatus, setPopUpSatus] = useState("accepted");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleUpdateNotification();
  };

  const handleNotificationAction = (userID, notificationId, type) => {
    // accept notification
    (async () => {
      try {
        const res = await handleNotification(userID, notificationId, type);
        // console.log(res.data);
        setPopUpSatus(type === "accept" ? t('noti.accepted') : t('noti.rejected'))
        handleClickOpen();
      }
      catch (error) {
        console.log(error);
      }
    })();
  }

  function displayNoti() {
    if (location.pathname.includes("/all")) {
      return notifications;
    } else {
      return notifications.slice(0, 3);
    }
  }

  return (
    <>
      <List sx={{ width: '100%' }}
        aria-label="notifications">

        {displayNoti().map((notification) => {
          return (
            <>
              <ListItem alignItems="flex-start" className="notification-card">
                <ListItemAvatar>
                  <Avatar
                    alt={users[notification.from_id - 1].username}
                    src={users[notification.from_id - 1].username}
                    sx={{ width: 50, height: 50, mr: '15px' }}
                  />
                </ListItemAvatar>
                <ListItemText
                  secondary={
                    <React.Fragment>
                      @{notification.message}
                      <Typography className="proximity" >
                        {timeFrom(new Date(notification.updated_at))}
                      </Typography>
                      <div style={{ paddingTop: '15px', textAlign: 'end' }}>
                        <Button className="accept-button" variant="contained" sx={{ borderRadius: 8, p: '3px 20px' }} onClick={() => handleNotificationAction(userid, notification.id, "accept")} >{t('noti.accept')}</Button>
                        <Button className="reject-button" variant="outlined" sx={{ borderRadius: 8, p: '3px 20px', ml: '15px' }} onClick={() => handleNotificationAction(userid, notification.id, "reject")} >{t('noti.decline')}</Button>
                      </div>
                    </React.Fragment>
                  }
                />

              </ListItem>
              <Divider />
            </>
          )
        })}
      </List>

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
          <Trans i18nKey="noti.help" popUpStatus={popUpStatus}>
            HELP {{ popUpStatus }}!
          </Trans>
        </DialogTitle>
        {popUpStatus === t('noti.accepted') &&
          <DialogContent>
            <DialogContentText id="alert-dialog-description" textAlign={'center'} >
              <Trans i18nKey="noti.archived_msg" popUpStatus={popUpStatus}>
                Go to <span style={{ color: "#D22108" }}>Profile &gt; Help Requested &gt; Completed</span> to view your completed requests.
              </Trans>
            </DialogContentText>
          </DialogContent>
        }
        <DialogActions >
          <Button variant="contained" sx={{ display: 'flex', m: 'auto', borderRadius: 3, p: '3% 30% 3% 30%', mb: '10%' }} onClick={handleClose}>
            {t('noti.ok')}
          </Button>
        </DialogActions>
      </Dialog>
      {/* END OF POPUP */}
    </>
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
