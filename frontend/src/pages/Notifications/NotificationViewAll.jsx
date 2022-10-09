import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import LoadingDisplay from "components/LoadingDisplay";
import { NotificationCard } from './components/NotificationCard';
import { getAllNotifications, getAllUsers } from "utils/api";


export default function NotificationViewAll() {
    let navigate = useNavigate();
    let { userid } = useParams();
    const { t } = useTranslation();
    const [notifications, setNotifications] = useState([]); // to store notifications
    const [users, setUsers] = useState([]); // to store users
    const [isLoading, setIsLoading] = useState(true); // for loading display trigger

    // get all notifications and user on page load
    useEffect(() => {
        setIsLoading(true);
        handleUpdateNotification();
        // eslint-disable-next-line
    }, []);

    const handleUpdateNotification = () => {
        (async () => {
            try {
                const res = await getAllNotifications(userid);
                // console.log(res.data);
                setNotifications(res.data);
                const user_res = await getAllUsers();
                // console.log(user_res.data);
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

        <div style={{ paddingBottom: '80px' }}>
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    mb: 2,
                    pb: 2
                }}>

                <Container maxWidth="lg" sx={{ zIndex: '2', width: '100%' }}>
                    <div className="mt-3">
                        <Button variant="text" size="small" onClick={() => navigate(-1)}>
                            <ArrowBackIosIcon />
                            <Typography className="close-request" variant="button" fontSize={15} fontWeight='900' >
                                {t('back')}
                            </Typography>
                        </Button>
                    </div>
                </Container>
            </Box>
            <Container maxWidth="lg">

                {/* if loaded, check whether there is notification, */}
                {/* else, display empty message */}
                {isLoading ? (
                    <div style={{ marginBottom: '3rem' }}>
                        <LoadingDisplay />
                    </div>
                ) : notifications.length !== 0 ? (
                    <>
                        <Divider />
                        <NotificationCard
                            notifications={notifications}
                            users={users}
                            handleUpdateNotification={handleUpdateNotification}
                        />
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                        No Notifications.
                    </div>
                )}

            </Container>
        </div>
    )
}