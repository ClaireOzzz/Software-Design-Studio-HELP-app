import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { getAllUsers } from "utils/api";
import { FEED, USER } from "navigation/routeConfig";

export default function Profile() {
  const { t } = useTranslation(); // for translation
  let navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function getAccounts() {
      try {
        const response = await getAllUsers();
        // console.log(response.data);
        setAccounts(response.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    getAccounts();
    // eslint-disable-next-line
  }, [])

  const handleLogin = (user) => {
    localStorage.setItem('help-login-username', user.username);
    localStorage.setItem('help-login-id', user.id);
    navigate(`../${USER}/${user.id}/${FEED}`);
  }

  return (
    <Container maxWidth="lg">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: '100%', maxWidth: '450px', border: '1px solid #D22108', borderRadius: 5, backgroundColor: '#FFF3F3' }}>
          <Typography variant="h5" gutterBottom component="div" sx={{ textAlign: 'center', p: '20px 0', m: 0, color: '#D22108' }}>
            Choose an account
          </Typography>
          <List aria-label="login" sx={{ pb: '20px' }}>
            {accounts.map((user) => {
              return (
                <div key={user.id}>
                  <ListItem alignItems="flex-start" className="login-card" disablePadding>
                    <ListItemButton onClick={() => handleLogin(user)}>
                      <ListItemAvatar>
                        <Avatar
                          alt={user.username}
                          src={user.username}
                          sx={{ width: 50, height: 50, mr: '15px' }}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={user.username} />
                    </ListItemButton>
                  </ListItem>
                  <Divider sx={{ width: '90%', margin: 'auto', borderColor: '#D22108' }} />
                </div>
              )
            })}
          </List>
        </div>
      </div>
    </Container>
  )
}
