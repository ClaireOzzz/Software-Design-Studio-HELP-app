import React from "react";
import { useTranslation } from 'react-i18next';
// import mui
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function LoadingDisplay() {
  const { t } = useTranslation(); // for translation

  return (
    <div className="mt-3 alignCentre">
      <CircularProgress />
      <Typography sx={{ paddingTop: '1rem' }}>{t('loading')}</Typography>
    </div>
  )
}
