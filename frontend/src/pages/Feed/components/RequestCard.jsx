import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// import mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
// import local files
import { FEED } from "navigation/routeConfig";
import accommodationIcon from 'assets/accommodation.png';
import bandageIcon from 'assets/bandage.png';
import foodIcon from 'assets/food.png';
import transportIcon from 'assets/transport.png';

// expects requests as array, pass as props to component
export const RequestCard = ({ requests }) => {
  let navigate = useNavigate(); // for url navigation

  // use to toggle contact display
  const contactType = {
    "Whatsapp": WhatsAppIcon,
    "Telegram": TelegramIcon,
  }

  // use to toggle request icon base on request type
  const iconType = {
    "medical": bandageIcon,
    "accommodation": accommodationIcon,
    "transport": transportIcon,
    "food": foodIcon,
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      {requests.map((request) => {
        return (
          <Grid item xs={12} sm={6} key={request.id}>
            <Card className="card request">
              <CardActionArea
                onClick={() => {
                  navigate(`${request.id}`);
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
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  );
};

RequestCard.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    username: PropTypes.string,
    title: PropTypes.string,
    expiry: PropTypes.string,
    description: PropTypes.string,
    request_type: PropTypes.string,
    quantity: PropTypes.shape({
      Adults: PropTypes.number,
      Children: PropTypes.number,
      Infants: PropTypes.number,
    }),
    status: PropTypes.string,
    timestamp: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    preferred_mode_of_contact: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    tags: PropTypes.arrayOf(PropTypes.string),
  }))
};
