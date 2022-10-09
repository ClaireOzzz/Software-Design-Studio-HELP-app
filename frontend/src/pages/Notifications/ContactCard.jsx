import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// import mui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';


export default function ContactCard() {
    const [filters, setFilters] = useState(["pending"])
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
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
        >
            
            <Grid item xs={12} sm={6}>
                <Card >
                    <CardActionArea
                        onClick={() => {
                        navigate('/feed');
                        }}
                    >
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
                                    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                                        <CardContent sx={{ flex: '1 0 auto', p: '0% 0.75rem 0% 0%', '&:last-child': { pb: '2%' } }}>
                        
                                            <Typography variant="body2" color="text.secondary" paddingTop="2%">
                                                Congratulations! You’re now connected with @AverageJoe. You may contact him/her via Whatsapp at 912345678 or via Telegram at @hiimjoe.
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

        </Grid>
    )
}