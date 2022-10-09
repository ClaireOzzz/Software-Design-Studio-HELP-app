import React from "react";
import { useNavigate } from "react-router-dom";
// import mui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

//icons
import { ReactComponent as AcceptedIcon } from 'assets/AcceptedIcon.svg';

const RequestSuccess = () => {
  let navigate = useNavigate(); // for url navigation

  return (
    <div className="empty-feed">

      {/* Request Accepted */}
      <Typography gutterBottom variant="h4" component="div" textAlign= "center" sx={{fontWeight: "bold", color: "#D22108", alignItems: 'center', mt:"-50%", m:"8%"}}>
        REQUEST SUCCESSFUL!
      </Typography>


      {/* Image */}
      <AcceptedIcon style={{
            height: 210,
            width: 210,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '10% auto',
            marginTop: "-1%"
          }}/>

      {/* You will be notified */}
      <Typography gutterBottom component="div" sx={{ fontWeight:"520", fontSize: 20,textAlign: "center", alignItems: 'center', m: "-10%", mt: "-6%"}}>
        Help will arrive soon!!
      </Typography>

      {/* Return to feed button */}
      <Box textAlign='center' marginTop='1%'>
        <Button variant="contained" size="large" sx={{fontSize: 18, fontWeight: "bold", mt:'20%', backgroundColor: "#D22108", p:"2% 11% 2% 11%" }} onClick={() => navigate('/feed')}>
          Return to Feed
        </Button>
      </Box>
    </div>
  )
}


export default RequestSuccess;

