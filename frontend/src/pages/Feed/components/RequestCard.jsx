import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
// import mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
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

// import local files
import accommodationIcon from 'assets/accommodation.png';
import bandageIcon from 'assets/bandage.png';
import foodIcon from 'assets/food.png';
import transportIcon from 'assets/transport.png';
import { getUserCoordinates, getProximity } from "utils/locationService";

// expects requests as array, pass as props to component
export const RequestCard = ({ requests }) => {
  let navigate = useNavigate(); // for url navigation
  const { t } = useTranslation('request'); // for translation

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
                            {
                              getProximityString(lat, long, request)

                            }
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
