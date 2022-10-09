import React, { useEffect, useState } from "react";

import Typography from '@mui/material/Typography';


export default function EmptyNotificationPage() {
    return (
        <div>
            <Typography sx={{ color: '#D22108', fontWeight: 'bold', fontSize: 22 }}>
                No notifications at the moment...
            </Typography>
        </div>
    );
}


