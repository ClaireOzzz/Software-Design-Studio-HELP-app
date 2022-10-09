import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Container from '@mui/material/Container';
import SettingsIcon from '@mui/icons-material/Settings';

import ProfileRequests from './components/ProfileRequests';
import EmptyProfileRequests from './components/EmptyProfileRequests';

import { getProfileInfo, getProfileRequests } from "utils/api";
import { SETTINGS } from "navigation/routeConfig";

export default function Profile() {
  const { t } = useTranslation(); // for translation
  let { userid } = useParams();
  let navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    id: 0,
    username: "",
  });
  const [requests, setRequests] = useState([]);
  const [type, setType] = useState("sent");
  const [status, setStatus] = useState("pending");
  const [description, setDescription] = useState(t('profile.request_pending'));
  const [requestToggle, setRequestToggle] = useState("request");

  useEffect(() => {
    async function getUserProfile() {
      try {
        const res = await getProfileInfo(userid);
        // console.log(res.data);
        setUserDetails(res.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    getUserProfile();
    // eslint-disable-next-line
  }, [type, status]);

  useEffect(() => {
    requestEvents();
    // eslint-disable-next-line
  }, [type, status]);


  async function requestEvents() {
    try {
      const response = await getProfileRequests(userid, type, status);
      // console.log(response.data);
      setRequests(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  let sentFilters = [
    {
      "type": "sent",
      "status": "pending",
      "description": t('profile.request_pending')
    },
    {
      "type": "sent",
      "status": "accepted",
      "description": t('profile.waiting_accept')
    },
    {
      "type": "sent",
      "status": "expired",
      "description": t('profile.request_expired')
    },
    {
      "type": "sent",
      "status": "completed",
      "description": t('profile.request_complete')
    }
  ];

  let outreachFilters = [
    {
      "type": "outreach",
      "status": "pending",
      "description": t('profile.waiting_connect')
    },
    {
      "type": "outreach",
      "status": "completed",
      "description": t('profile.request_accept')
    },
    {
      "type": "outreach",
      "status": "expired",
      "description": t('profile.fail_connect')
    }
  ];

  const handleChange = (event, requestType) => {
    if (requestType === "request") {
      setType("sent");
      setStatus("pending");
      setDescription(t('profile.request_pending'));
      setRequestToggle(requestType);
    } else if (requestType === "offer") {
      setType("outreach");
      setStatus("pending");
      setDescription("Waiting for requester to connect");
      setRequestToggle(requestType);
    }
  };

  const changeStatus = (e) => {
    setStatus(e.target.value);
    const value = e.target.value;
    const filtered = type === "sent" ? sentFilters.filter((s) => s.status === value) : outreachFilters.filter((o) => o.status === value);
    setDescription(filtered[0].description);
  };

  return (
    <Container maxWidth="lg">
      <div style={{ paddingBottom: '80px' }}>
        <div style={{ textAlign: 'end', padding: '20px 0 0' }}>
          <SettingsIcon className="settings-icon" sx={{ color: '#D22108', cursor: 'pointer', fontSize: '1.7rem' }} onClick={() => navigate(`../${SETTINGS}`)} />
        </div>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar
            alt={userDetails.username}
            sx={{ width: 80, height: 80 }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography className="name">
            {userDetails.username}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography color="#FFF3F3" variant="subtitle2" className="profile-username">
            @{userDetails.username}
          </Typography>
        </Box>
        <div style={{ width: 'fit-content', margin: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <ToggleButtonGroup
              color="primary"
              value={requestToggle}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="request" sx={{ border: '1px solid #d2210880' }}>{t('profile.help_requested')}</ToggleButton>
              <ToggleButton value="offer" sx={{ border: '1px solid #d2210880' }}>{t('profile.help_offered')}</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <FormControl sx={{ width: '100%' }} size="small">
              <InputLabel id="demo-select-small">{t('profile.status')}</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                displayEmpty
                value={status}
                label={t('profile.status')}
                onChange={changeStatus}
              >
                <MenuItem value={"pending"}>{t('profile.pending')}</MenuItem>
                {type === "sent" ?
                  <MenuItem value={"accepted"}>{t('profile.accepted')}</MenuItem> : ""
                }
                <MenuItem value={"completed"}>{t('profile.completed')}</MenuItem>
                <MenuItem value={"expired"}>{t('profile.expired')}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>


        {requests.length === 0 ?
          <EmptyProfileRequests /> :
          <Box>
            <Typography sx={{ color: '#D22108', fontWeight: 'bold', textAlign: "center", padding: '10px 0' }}>
              {description}
            </Typography>
            <hr style={{ border: '1px solid #D22108' }} />
            <ProfileRequests requests={requests} tab={type} status={status} requestEvents={requestEvents} />
          </Box>
        }

      </div>
    </Container>
  )
}
