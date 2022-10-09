import React from "react";
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';


export default function EmptyNotificationPage() {
    const { t } = useTranslation();
    return (
        <div>
            <Typography sx={{ color: '#D22108', fontWeight: 'bold', fontSize: 22 }}>
                {t('noti.empty')}
            </Typography>
        </div>
    );
}


