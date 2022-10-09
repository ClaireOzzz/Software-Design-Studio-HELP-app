import React from "react";
// import mui
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function LoadingDisplay() {

  return (
    <div className="mt-3 alignCentre">
      <CircularProgress />
      <Typography sx={{ paddingTop: '1rem' }}>Loading...</Typography>
    </div>
  )
}
