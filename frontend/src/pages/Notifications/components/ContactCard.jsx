import React from "react";
import { useNavigate } from "react-router-dom";

// import mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';


export const ContactCard = ({ connections, users }) => {
  let navigate = useNavigate(); // for url navigation

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      {connections.map((connection) => {
        return (
          <Grid item xs={12} sm={6}>
            <Card className="contact-card">
              <CardActionArea >
                <Box sx={{ flexGrow: 1 }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item xs={3} md={0} sx={{ pl: '3%' }}>
                      <Avatar
                        alt={users[connection.donor_id-1].username}
                        src={users[connection.donor_id-1].username}
                        sx={{ width: 65, height: 65 }}
                      />
                    </Grid>
                    <Grid item xs={9} md={10}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto', p: '0% 0.75rem 0% 0%', '&:last-child': { pb: '2%' } }}>

                          <Typography variant="body2" color="text.secondary" paddingTop="2%">
                            {`Congratulations! You’re now connected with @${users[connection.donor_id-1].username}. You may contact him/her via Whatsapp at ${users[connection.donor_id-1].contacts.Whatsapp} or via Telegram at @${users[connection.donor_id-1].contacts.Telegram}.`}
                          </Typography>
                          <Typography className="proximity">
                            3 mins ago
                          </Typography>

                        </CardContent>

                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}