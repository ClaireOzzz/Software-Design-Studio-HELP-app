import React from "react";
import { useTranslation } from 'react-i18next';
// import mui
import Typography from '@mui/material/Typography';
// import svg
import { ReactComponent as EmptyBox } from 'assets/EmptyBox.svg';

export default function EmptyFeed() {
  const { t } = useTranslation('request'); // for translation

  return (
    <div className="empty-feed">
      <EmptyBox />

      <Typography sx={{ color: '#D22108', fontWeight: 'bold', fontSize: 22 }}>
        {t('empty.no_request_msg')}
      </Typography>
      <Typography component="div" sx={{ fontSize: 18 }}>
        {t('empty.post_request_msg')}
      </Typography>
    </div>
  )
}
