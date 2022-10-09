import React from "react";
// import mui
import Typography from '@mui/material/Typography';
// import svg
import { ReactComponent as EmptyBox } from 'assets/EmptyBox.svg';

export default function EmptyFeed() {

  return (
    <div className="empty-feed">
      <EmptyBox />

      <Typography sx={{ color: '#D22108', fontWeight: 'bold', fontSize: 22 }}>
        There are no requests
      </Typography>
      <Typography component="div" sx={{ fontSize: 18 }}>
        Post a request or come back later.
      </Typography>
    </div>
  )
}
