import React from "react";
import { useTranslation } from 'react-i18next';
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
import CoachingIcon from 'assets/coaching.png';
import FooterSpacer from "components/FooterSpacer";

const ViewMore = () => {
    const { t } = useTranslation(); // for translation
    let types = ["education", "volunteer", "donate", "employment", "counselling & coaching"]
    const iconType = {
        "education": EducationIcon,
        "employment": EmploymentIcon,
        "volunteer": VolunteerIcon,
        "donate": DonateIcon,
        "counselling & coaching": CoachingIcon,
    }
    // CHANGE LINKS BELOW
    const linked = {
        "education": "https://tonytangebirah.wixsite.com/help/education",
        "employment": "https://tonytangebirah.wixsite.com/help/employment",
        "volunteer": "https://tonytangebirah.wixsite.com/help/volunteer",
        "donate": "https://tonytangebirah.wixsite.com/help/donate",
        "counselling & coaching": "https://tonytangebirah.wixsite.com/help/counseling-coaching",
    }

    return (
        <div>
            <Typography variant="h4" color="#E97E6F" component="div" sx={{ fontWeight: 'bold', m: '6% 3% 1% 5%' }}>
                {t("other.moreInfo")}
            </Typography>
            <Divider />
            <Container max_width="lg" sx={{ mt: '7%' }} >
                <Grid container spacing={2}>
                    {
                        types.map((type, index) => {
                            return (
                                <Grid item xs={6} key={index} spacing={3}>
                                    <Link href={linked[type]} underline="none" target="_blank">
                                        <Card className={`${type}-card card`} sx={{ p: 2, justifyContent: "center" }} >
                                            <CardMedia className="services-icon" sx={{ objectFit: "contain" }}
                                                component="img"
                                                image={iconType[type]}
                                                height={80}
                                                alt={type}
                                            />
                                            <Typography className="services-name" align="center" sx={{ mt: 1, fontWeight: "bold", color: "#D22108", textTransform:"capitalize" }}>
                                                {t(`other.${type.charAt(0) + type.slice(1)}`)}
                                            </Typography>
                                        </Card>
                                    </Link>
                                </Grid>
                            )
                        }
                        )
                    }
                </Grid>
                <FooterSpacer/>
            </Container>
        </div>
    )
}

export default ViewMore;