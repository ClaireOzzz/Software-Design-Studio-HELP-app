
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// import mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import Divider from '@mui/material/Divider';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// import local files
import { FEED } from "navigation/routeConfig";



export default function NotificationCard() {
    const [filters, setFilters] = useState(["pending"])
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    let navigate = useNavigate(); // for url navigation
    
    let profile =[
      {
          "profileImage": "johnsmith-icon",
          "name": "John Smith",
          "username": "johnsmith"
      },
      {
          "profileImage": "janedoe-icon",
          "name": "Jane Doe",
          "username": "janedoe"
      }
    ];

    return (
    <div >
      
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        marginTop={'2%'}
        >
          
            <Grid item xs={12} sm={6} >
              <Card >
                <CardActionArea >
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                       >
                      <Grid item xs={3} md={0} sx={{ pl:'3%'}}>
                        <Avatar
                          alt={profile.name}
                          src={profile.profileImage}
                          sx={{ width: 65, height: 65 }}
                        />
                      </Grid>
                      <Grid item xs={9} md={10}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <CardContent sx={{ flex: '1 0 auto', p: '0% 0.75rem 0% 0%', '&:last-child': { pb: 0, mb: '3%', mt:'3%' } }}>
                            <Typography gutterBottom variant="body2" component="div" >
                              @JohnSmith
                            </Typography>
                            <Typography variant="body2" color="text.secondary" >
                              wants to reach out regarding...
                            </Typography>
                            <Typography className="proximity" >
                              3 mins ago
                            </Typography>
                            
                          </CardContent>

                          <Box justifyContent="space-between" sx={{display: 'flex', m: '3% 25% 5% 0%' }}>
                               <Button variant="contained" sx={{borderRadius:8, p: '1%  10% 1% 10%'}} onClick={handleClickOpen} >Accept</Button>
                               <Button variant="outlined" sx={{borderRadius:8, p: '1%  10% 1% 10%'}} >Reject</Button>
                          </Box>
                          
                          {/* POPUP */}
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            sx={{ maxWidth :'xs',
                              '& .MuiDialog-paper': { borderRadius:3, width: '70%', maxHeight: 435 } 
                            }}>
                            <DialogTitle id="alert-dialog-title" textAlign={'center'} variant="h5" color="#D22108" component="div" sx={{ fontWeight: 'bold', pt:'10%'}}>
                              {"HELP ACCEPTED!"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description" textAlign={'center'} >
                                {"We have archived your request. Go to Profile > My Requests > Accepted if you wish to repost it."}
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions >
                              <Button variant="contained" sx={{display: 'flex', m:'auto', borderRadius:3, p: '3% 30% 3% 30%', mb:'10%'}} onClick={handleClose}>
                                OK
                              </Button>
                            </DialogActions>
                          </Dialog>
                          {/* END OF POPUP */}

                        </Box>
                      </Grid>

                      <Divider />

                    </Grid>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          
    
      </Grid>
     </div>
    )
}

