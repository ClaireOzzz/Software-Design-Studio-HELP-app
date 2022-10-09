import React from "react";

import Typography from '@mui/material/Typography';

import { ReactComponent as EmptyBox } from 'assets/EmptyBox.svg';

export default function EmptyProfileRequests() {
    return (
        // <div>
        //     <Typography sx={{ color: '#D22108', fontWeight: 'bold', fontSize: 22, marginLeft: '10%'}}>
        //         It's empty!
        //     </Typography>
        // </div>
        <div className="empty-profile-requests">
            <EmptyBox />

            <Typography sx={{ color: '#D22108', fontWeight: 'bold', fontSize: 22 }}>
                It's empty!
            </Typography>
        </div>
    );
}