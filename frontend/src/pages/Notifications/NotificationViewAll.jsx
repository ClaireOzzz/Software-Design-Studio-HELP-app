import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LoadingDisplay from "components/LoadingDisplay";
import { NotificationCard } from './components/NotificationCard';
import { getAllNotifications, getAllUsers } from "utils/api";


export default function NotificationViewAll() {
    let navigate = useNavigate();
    let { userid } = useParams();
    const [notifications, setNotifications] = useState([]); // to store notifications
    const [users, setUsers] = useState([]); // to store users
    const [isLoading, setIsLoading] = useState(true); // for loading display trigger

    // get all notifications and user on page load
    useEffect(() => {
        setIsLoading(true);
        handleUpdateNotification();
    }, []);

    const handleUpdateNotification = () => {
        (async () => {
            try {
                const res = await getAllNotifications(userid);
                console.log(res.data);
                setNotifications(res.data);
                const user_res = await getAllUsers();
                console.log(user_res.data);
                setUsers(user_res.data);
                setIsLoading(false);
            }
            catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        })();
    }

    return (

        <div style={{ zIndex: '2', width: '100%' }}>

            {/* back button */}
            <Button variant="text" size="small" textAlign='left' sx={{ paddingTop: '10%', paddingLeft: '5%', mb: '5%' }} onClick={() => {
                navigate(-1);
            }}>

                <ArrowBackIosIcon sx={{ color: "#D22108" }} />
                <Typography color="#D22108" variant="button" fontsize='15' fontWeight='900' >
                    BACK
                </Typography>
            </Button>

            {/* if loaded, check whether there is notification, */}
            {/* else, display empty message */}
            {isLoading ? (
                <div style={{ marginBottom: '3rem' }}>
                    <LoadingDisplay />
                </div>
            ) : notifications.length !== 0 ? (
                <NotificationCard
                    notifications={notifications}
                    users={users}
                    handleUpdateNotification={handleUpdateNotification}
                />
            ) : (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                    No Notifications.
                </div>
            )}

        </div>

    )
}