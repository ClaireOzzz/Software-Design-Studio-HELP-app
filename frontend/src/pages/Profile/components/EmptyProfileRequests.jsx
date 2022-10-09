import React from "react";
import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';

import { ReactComponent as EmptyBox } from 'assets/EmptyBox.svg';

export default function EmptyProfileRequests() {
    const { t } = useTranslation(); // for translation
    return (
        <div className="empty-profile-requests">
            <EmptyBox />

            <Typography sx={{ color: '#D22108', fontWeight: 'bold', fontSize: 22 }}>
                {t('empty_request')}
            </Typography>
        </div>
    );
}