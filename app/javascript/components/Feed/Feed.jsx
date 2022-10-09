import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import mui related
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea
          onClick={() => {
            navigate("/feed/" + 1);
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default Feed;