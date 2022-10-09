import React from "react";
import { useNavigate } from "react-router-dom";
// import mui

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

//local files

import EducationIcon from 'assets/education.png';
import EmploymentIcon from 'assets/employment.png';
import VolunteerIcon from 'assets/volunteer.png';
import DonateIcon from 'assets/donate.png';

const ViewMore = () => {
    let navigate = useNavigate()
    let types = ["Education ",  "Volunteer", "Donate", "Employment"]
    const iconType = {
        "Education ": EducationIcon,
        "Employment": EmploymentIcon,
        "Volunteer": VolunteerIcon,
        "Donate": DonateIcon,
    }
    // CHANGE LINKS BELOW
    const linked = {
        "Education ": "https://www.bbc.com/news",
        "Employment": "https://www.nytimes.com/",
        "Volunteer": "https://www.theguardian.com/international",
        "Donate": "https://edition.cnn.com/",
    }

    return (
        <div>
            <Typography variant="h4" color="#E97E6F" component="div" sx={{ fontWeight: 'bold', m: '6% 3% 1% 5%' }}>
                More Information
            </Typography>
            <Divider />
            <Container max_width="lg" sx={{mt:'7%'}} >
                <Grid container spacing={2}>
                    {
                        types.map((type, index) => {
                            return(
                                <Grid item xs={6} key={index} spacing={3}>
                                    <Link href={linked[type]} underline="none">
                                        <Card className={`${type}-card card`} sx={{p:2, justifyContent:"center"}} >
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
                                    </Link>    
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

export default ViewMore;