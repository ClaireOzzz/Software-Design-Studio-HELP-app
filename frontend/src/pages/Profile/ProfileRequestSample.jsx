import React from "react";

import Card from '@mui/material/Card';

const ProfileRequest = props => {
    return(
        <Card>
            <div>{props.image}</div>
            <div>{props.title}</div>
            <div>{props.description}</div>
        </Card>
    )
}

export default ProfileRequest