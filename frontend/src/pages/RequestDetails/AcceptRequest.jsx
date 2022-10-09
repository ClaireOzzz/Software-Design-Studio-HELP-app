import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

// import mui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//icons
import { ReactComponent as AcceptedIcon } from 'assets/AcceptedIcon.svg';
// local files
import { USER, FEED } from "navigation/routeConfig";

const RequestAccept = () => {
  let { userid } = useParams();
  let navigate = useNavigate(); // for url navigation
  const { t } = useTranslation('request'); // for translation

  return (
    <div className="empty-feed">
      
      {/* Request Accepted */}
      <Typography gutterBottom variant="h4" component="div" textAlign="center" sx={{ fontSize: 26, fontWeight: "bold", color: "#D22108", alignItems: 'center', mt: "-50%" }}>
        {t('accept_request.thanks')}
      </Typography>

      {/* Image */}
      <AcceptedIcon style={{
        height: 210,
        width: 210,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '15% auto',
        marginTop: "-1%"
      }} />

      {/* You will be notified */}
      <Typography gutterBottom component="div" sx={{ fontSize: 18, textAlign: "center", alignItems: 'center', m: "-10%", mt: "-6%" }}>
        {t("accept_request.description")}
      </Typography>

      {/* Return to feed button */}
      <Box textAlign='center' marginTop='1%'>
        <Button variant="contained" size="large" sx={{ fontSize: 18, fontWeight: "bold", mt: '20%', backgroundColor: "#D22108", p: "2% 11% 2% 11%" }} onClick={() => navigate(`/${USER}/${userid}/${FEED}`)}>
          {t("accept_request.btn")}
        </Button>
      </Box>


    </div>
  )
}


export default RequestAccept;

