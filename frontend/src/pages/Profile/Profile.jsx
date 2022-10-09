import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ProfileRequests from './components/ProfileRequests';
import EmptyProfileRequests from './EmptyProfileRequests';

import { USERNAME } from "../../utils/constants";
import { getProfileRequests } from "../../utils/api";

export default function Profile() {
    // const [tab, setTab] = useState([]);
    // const [dropdown, setDropdown] = useState([]);
    let { userid } = useParams()
    const [requests, setRequests] = useState([]);
    const [type, setType] = useState("sent");
    const [status, setStatus] = useState("pending");
    // const [description, setDescription] = useState("Your pending requests");
    const [description, setDescription] = useState([{"description": "Your pending requests"}]);
    
    let username = {
        1: "Ludwig123", 
        2: "999_NotARussian_999",
        3: "OksanaKovalenko",
        4: "Lurker1234"
    } 
    
    useEffect(() => {
        
        async function requestEvents() {
            try {
                const response = await getProfileRequests(userid, type, status);
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
            "description": "Waiting for you to accept offer"
        },
        {
            "type": "sent",
            "status": "expired",
            "description": "Your expired requests"
        },
        {
            "type": "sent",
            "status": "completed",
            "description": "Successfully connected with donor"
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
            "status": "completed",
            "description": "Requests you have accepted"
        },
        {
            "type": "outreach",
            "status": "expired",
            "description": "Requester failed to connect"
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
            <Box sx={{ paddingTop: '10%', display: 'flex', justifyContent: 'center'}}>
                <Avatar
                    alt={profile.name}
                    src={profile.profileImage}
                    sx={{ width: 80, height: 80 }}
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography gutterBottom="false" class="name">
                    {username[userid]}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography color="#FFF3F3" component="subtitle2" class="profile-username">
                    @{username[userid]}
                </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button onClick={myRequests} sx={{ background: type === 'sent' ? '#FFDADA' : '#FFFFFF'}}>Help Requested</Button>
                    <Button onClick={myOutreach} sx={{ backgroundColor: type === 'outreach' ? '#FFDADA' : '#FFFFFF'}}>Help Offered</Button>
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
                        {type === "sent" ?
                            <MenuItem value={"accepted"}>Accepted</MenuItem> : ""
                        }
                        <MenuItem value={"completed"}>Completed</MenuItem>
                        <MenuItem value={"expired"}>Expired</MenuItem>
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
                <ProfileRequests requests={requests} tab={type} status={status} />
            }
        </div>
    )
}
