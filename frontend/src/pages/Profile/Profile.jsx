import React, { useEffect, useState } from "react";
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ProfileRequests from './ProfileRequests';
import EmptyProfileRequests from './EmptyProfileRequests';

export default function Profile() {
    // const [tab, setTab] = useState([]);
    // const [dropdown, setDropdown] = useState([]);
    const [requests, setRequests] = useState([]);
    const [type, setType] = useState("sent");
    const [status, setStatus] = useState("pending");
    // const [description, setDescription] = useState("Your pending requests");
    const [description, setDescription] = useState([{"description": "Your pending requests"}]);

    useEffect(() => {
        async function requestEvents() {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/user/1/requests?type='+type+'&status='+status);
                console.log(response.data);
                setRequests(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        requestEvents();
    }, [type, status]);

    let profile =[
        {
            "profileImage": "johnsmith-icon",
            "name": "John Smith",
            "username": "johnsmith"
        },
        {
            "profileImage": "janedoe-icon",
            "name": "Jane Doe",
            "username": "janedoe"
        }
    ];

    let sentFilters = [
        {
            "type": "sent",
            "status": "pending",
            "description": "Your pending requests"
        },
        {
            "type": "sent",
            "status": "accepted",
            "description": "Your fulfilled requests"
        },
        {
            "type": "sent",
            "status": "expired",
            "description": "Your expired requests"
        }
    ];

    let outreachFilters = [
        {
            "type": "outreach",
            "status": "pending",
            "description": "Waiting for requester to connect"
        },
        {
            "type": "outreach",
            "status": "accepted",
            "description": "Requests you have accepted"
        }
    ];

    const myRequests = () => {
        setType("sent");
        setStatus("pending");
        setDescription([{"description": "Your pending requests"}]);
    };

    const myOutreach = () => {
        setType("outreach");
        setStatus("pending");
        setDescription([{"description": "Waiting for requester to connect"}]);
    };

    const changeStatus = (e) => {
        setStatus(e.target.value);
        const value = e.target.value;
        const filtered = type === "sent" ? sentFilters.filter((s) => s.status === value) : outreachFilters.filter((o) => o.status === value);
        setDescription(filtered);
    };

    return (
        <div>
            <Box sx={{ paddingTop: '10%', display: 'flex', justifyContent: 'center' }}>
                <Avatar
                    alt={profile.name}
                    src={profile.profileImage}
                    sx={{ width: 80, height: 80 }}
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography gutterBottom="false" class="name">
                    John Smith
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography color="#FFF3F3" component="subtitle2" class="profile-username">
                    @johnsmith
                </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button onClick={myRequests}>My Requests</Button>
                    <Button onClick={myOutreach}>My Outreach</Button>
                </ButtonGroup>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
                <FormControl sx={{ minWidth: 200 }} size="small">
                    <InputLabel id="demo-select-small">Select status</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        displayEmpty
                        value={status}
                        label="Status"
                        onChange={changeStatus}
                    >
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"accepted"}>Accepted</MenuItem>

                        {type === "sent" ?
                            <MenuItem value={"expired"}>Expired</MenuItem> :
                            <></>
                        }

                    </Select>
                </FormControl>
            </Box>

            <Box>
                <Typography sx={{color: '#D22108', fontWeight: 'bold', marginLeft: '10%', marginTop: '5%'}}>
                    {description.map((p) => (
                        <div>{p.description}</div>
                    ))}
                </Typography>
            </Box>

            {requests.length === 0 ?
                <EmptyProfileRequests /> :
                <ProfileRequests tab={type} status={status} />
            }
        </div>
    )
}
