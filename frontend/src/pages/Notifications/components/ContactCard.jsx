import React from "react";
import { useParams } from "react-router-dom";
import { Trans } from 'react-i18next';

// import mui
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { timeFrom } from "utils";


export const ContactCard = ({ connections, users }) => {
  let { userid } = useParams();

  const getOtherUser = (connection) => {
    return (connection.donor_id === parseInt(userid)) ? connection.donee_id : connection.donor_id
  }


  return (
    <List sx={{ width: '100%' }}
      aria-label="notifications">

      {connections.map((connection) => {
        // The id of the user that is NOT the current user, indexed to 0.
        const otherUserId = getOtherUser(connection) - 1;
        let username = users[otherUserId].username;
        return (
          <>
            <ListItem alignItems="flex-start" className="contact-card">
              <ListItemAvatar>
                <Avatar
                  alt={username}
                  src={username}
                  sx={{ width: 50, height: 50, mr: '15px' }}
                />
              </ListItemAvatar>
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Trans i18nKey="noti.contacts" username={username}>
                      Congratulations! You're now connected with @{{username}}. You may contact him/her via: 
                    </Trans>
                    {loadContactsAsString(users[otherUserId].contacts)}
                    <Typography className="proximity" >
                      {timeFrom(new Date(connection.updated_at))}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
          </>
        )
      })}
    </List>
  )
}

function loadContactsAsString(contacts_hash) {
  let out = [];
  for (let key in contacts_hash) {
    out.push(` ${key}: ${contacts_hash[key]}`);
  }
  return out.join(", ");
}
