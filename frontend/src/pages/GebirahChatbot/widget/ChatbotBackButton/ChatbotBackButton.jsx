import React from "react";
import { useNavigate } from "react-router-dom";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ChatbotBackButton = () => {
  let navigate = useNavigate();

  return (
    <Button variant="text" size="small" onClick={() => navigate(-1)}>
        <ArrowBackIosIcon sx={{ color: "#FFFFFF" }} />
        <Typography className="close-request" color="#FFFFFF" variant="button" fontSize={15} fontWeight='900' >
            BACK
        </Typography>
    </Button>
  );
};

export default ChatbotBackButton;