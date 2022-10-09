import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { PROFILE } from "navigation/routeConfig";
import accommodationIcon from '../../../assets/accommodation.png';
import bandageIcon from '../../../assets/bandage.png';
import foodIcon from '../../../assets/food.png';
import transportIcon from '../../../assets/transport.png';

export default function ProfileRequests(props) {
    let navigate = useNavigate();
    // const [requests, setRequests] = useState([]);

    const tab = props.tab;
    const status = props.status;

    const contactType = {
        "Whatsapp": WhatsAppIcon,
        "Telegram": TelegramIcon,
      }
    
    const iconType = {
        "medical": bandageIcon,
        "accommodation": accommodationIcon,
        "transport": transportIcon,
        "food": foodIcon,
    }

    // useEffect(() => {
    //     (async () => {
    //         try {
    //         const res = await getAllRequests();
    //         console.log(res.data);
    //         // setIsLoading(false);
    //         setRequests(res.data);
    //         }
    //         catch (error) {
    //         // setIsLoading(false);
    //         setRequests(undefined);
    //         console.log(error);
    //         }
    //     })();
    // }, []);

    return (
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          {props.requests.map((request) => {
            return (
              <Grid item xs={12} sm={6} key={request.id}>
                <Card className="card request">
                  <CardActionArea
                    onClick={() => {
                      navigate(PROFILE + "/" + request.id);
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
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
                                25m away
                              </Typography>

                              {request.preferred_mode_of_contact.map((mode) => {
                                const ContactTypeIcon = contactType[mode];
                                return (ContactTypeIcon ? <ContactTypeIcon style={{ fill: "#E97E6F", width: 20, margin: "5 2 2 2", float: "right" }} key={mode} /> : "");
                              })} 
                            </CardContent>
                          </Box>
                        </Grid>
                      </Grid>
                      {(tab === "sent" && status === "pending") ? (
                        <div style={{ display: 'inline-block' }}>
                            <DeleteIcon style={{ fill: "#D22108", width: 22, margin: "5 2 2 2", float: "right" }} />
                            <EditIcon style={{ fill: "#D22108", width: 22, margin: "5 2 2 2", float: "right" }} />
                        </div>
                      ) : (tab === "sent" && (status === "completed" || status === "expired")) ? (
                        <Button variant="contained" sx={{ fontSize: 14, float: "right", margin: "2% 3% 3%" }} >
                            Repost
                        </Button>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })}
        </Grid>
    );
}