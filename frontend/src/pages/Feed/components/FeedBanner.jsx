import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
// import mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// images
import accommodationIcon from 'assets/accommodation.png';
import bandageIcon from 'assets/bandage.png';
import foodIcon from 'assets/food.png';
import transportIcon from 'assets/transport.png';
//icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const FeedBanner = props => {
    let navigate = useNavigate();
    const { t } = useTranslation(); // for translation

    const iconType = {
        "medical": bandageIcon,
        "accommodation": accommodationIcon,
        "transport": transportIcon,
        "food": foodIcon,
    }
    return (
        <Box
            sx={{
            background: '#D22108',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex', 
            mb: 2,
            pb: 2
            }}>

            <img
            src={iconType[props.icon]}
            style={{
                position: 'absolute',
                right: '-50px',
                top: '25%',
                opacity: '0.4',
                height: '70%',
                objectFit: 'cover',
                zIndex: '1'
            }}
            alt="icon"
            />

            <Container maxWidth="lg" sx={{ zIndex: '2', width: '100%' }}>
            <div className="mt-3">
                <Button variant="text" size="small" onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon sx={{ color: "#FFFFFF" }} />
                    <Typography className="close-request" color="#FFFFFF" variant="button" fontSize={15} fontWeight='900' >
                        {t('back')}
                    </Typography>
                </Button>


                <Typography variant="h5" color="#FFFFFF" component="div" sx={{ fontWeight: 'bold', m: '1rem 0 0 5px' }}>
                    {props.title}
                </Typography>

                <Typography color="#D22108" className="username">
                    @ {props.username}
                </Typography>

                {/* <Box flexDirection='row-reverse' display='flex' sx={{ fontSize: 14, letterSpacing: 10 }} >
                    <LocationOnIcon sx={{ color: "white" }} />
                    <Typography color="#FFFFFF" variant="overline" >
                        less than 50 km
                    </Typography>
                </Box> */}
            </div>
            </Container>
        </Box>     
    )
}

export default FeedBanner