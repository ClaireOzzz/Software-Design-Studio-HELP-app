import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import mui related
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FilterListIcon from '@mui/icons-material/FilterList';

// import our own files
import api from 'api/api';

const Feed = () => {
  let navigate = useNavigate();
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    // call api function
    // api.fetchFeed().then(response => {
    //     setEventList(response.data);
    //   });
  }, []);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'right', paddingRight: '10%', paddingTop: '10%' }}>
        <NotificationsIcon style={{fill: "#D22108", width: 30}} />
      </Box>

      <Box sx={{ textAlign: 'left', paddingLeft: '10%', marginTop: '5%' }}>
        <Button variant="contained" size="small" class="filter-button">
          <FilterListIcon style={{fill: "#FFFFFF", width: 20, paddingRight: 5, paddingLeft: 5}} />
          <span style={{color: "#FFFFFF", paddingRight: 5}}>Filter</span>
        </Button>
      </Box>

      <Card sx={{ maxWidth: 345 }} class="card">
        <CardActionArea
          onClick={() => {
            navigate("/feed/" + 1);
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <CardMedia class="card-media"
              style={{height: 60, padding: '5%', verticalAlign: 'middle', justifyContent: 'center'}}
              component="img"
              image={require('../../../assets/images/bandage.png')}
              alt="bandage"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto', p: '0% 5% 0% 0%', '&:last-child': { pb: 0 } }}>
                <Typography gutterBottom variant="h5" component="div" class="card-title">
                  NEED BANDAGES
                </Typography>
                <Typography variant="body2" color="text.secondary" class="card-text">
                  Hi everyone, I ran out of bandages at home, is anyone able to help me?
                </Typography>
              </CardContent>
            </Box>
          </Box>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 345 }} class="card">
        <CardActionArea
          onClick={() => {
            navigate("/feed/" + 1);
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <CardMedia class="card-media"
              style={{height: 60, padding: '5%', verticalAlign: 'middle', justifyContent: 'center'}}
              component="img"
              image={require('../../../assets/images/food.png')}
              alt="food"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto', p: '0% 5% 0% 0%', '&:last-child': { pb: 0 } }}>
                <Typography gutterBottom variant="h5" component="div" class="card-title">
                  I need some rice
                </Typography>
                <Typography variant="body2" color="text.secondary" class="card-text">
                  My family is starving. We have not eaten in 3 days, appreciate it if someone can give us some food...
                </Typography>
              </CardContent>
            </Box>
          </Box>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 345 }} class="card">
        <CardActionArea
          onClick={() => {
            navigate("/feed/" + 1);
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <CardMedia class="card-media"
              style={{height: 60, padding: '5%', verticalAlign: 'middle', justifyContent: 'center'}}
              component="img"
              image={require('../../../assets/images/accommodation.png')}
              alt="accommodation"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto', p: '0% 5% 0% 0%', '&:last-child': { pb: 0 } }}>
                <Typography gutterBottom variant="h5" component="div" class="card-title">
                  Need a place to stay
                </Typography>
                <Typography variant="body2" color="text.secondary" class="card-text">
                  Hello, my house has been destroyed by the war. I'm looking for a place to stay for 1-2 months in the meantime.
                </Typography>
              </CardContent>
            </Box>
          </Box>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 345 }} class="card">
        <CardActionArea
          onClick={() => {
            navigate("/feed/" + 1);
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <CardMedia class="card-media"
              style={{height: 60, padding: '5%', verticalAlign: 'middle', justifyContent: 'center'}}
              component="img"
              image={require('../../../assets/images/transport.png')}
              alt="transport"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto', p: '0% 5% 0% 0%', '&:last-child': { pb: 0 } }}>
                <Typography gutterBottom variant="h5" component="div" class="card-title">
                  Finding a free ride
                </Typography>
                <Typography variant="body2" color="text.secondary" class="card-text">
                  Hi guys, I need a ride urgently to visit someone. Thanks in advance.
                </Typography>
              </CardContent>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
      
    </div>
  )
}

export default Feed;