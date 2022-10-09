import React from "react";
import { useNavigate } from "react-router-dom";
// import mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

//icons
import { ReactComponent as AcceptedIcon } from 'assets/AcceptedIcon.svg';
//local files
import FeedBanner from "../../Feed/components/FeedBanner";

import { FEED } from "navigation/routeConfig"
import { USERNAME } from "../../../utils/constants";

import accommodationIcon from 'assets/accommodation.png';
import bandageIcon from 'assets/bandage.png';
import foodIcon from 'assets/food.png';
import transportIcon from 'assets/transport.png';


// import { ReactComponent as EmptyBox } from 'assets/EmptyBox.svg';

const NewRequestIndex = () => {
    let navigate = useNavigate()
    let types = ["medical", "accommodation", "transport", "food"]
    const iconType = {
        "medical": bandageIcon,
        "accommodation": accommodationIcon,
        "transport": transportIcon,
        "food": foodIcon,
    }
    return (
        <div>
            <FeedBanner backPage={FEED} title="I'm requesting for ..." username={USERNAME}/>
            <Container max_width="lg">
                <Grid container spacing={2}>
                    {
                        types.map((type, index) => {
                            return(
                                <Grid item xs={6} key={index} spacing={3}>
                                    <Card className={`${type}-card card`} sx={{p:2, justifyContent:"center"}} onClick={()=>navigate(`${type}`)}>
                                        <CardMedia sx={{objectFit:"contain"}}
                                            component="img"
                                            image={iconType[type]}
                                            height={80}
                                            alt={type}
                                        />
                                        <Typography align="center" sx={{mt:1, fontWeight: "bold", color: "#D22108" }}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </Typography>   
                                    </Card>
                                </Grid>
                            )
                        }
                        )
                    }     
                </Grid>
            </Container>
        </div>
    )
}

export default NewRequestIndex;