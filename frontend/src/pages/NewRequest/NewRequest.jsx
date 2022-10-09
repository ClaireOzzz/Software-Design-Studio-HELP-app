import React from "react";
import { Outlet } from "react-router-dom";
// import mui
import Box from '@mui/material/Box';


const NewRequest = () => {
    return (
        <Box className="add-request">
            <Outlet/> 
        </Box>   
    )
}

export default NewRequest;