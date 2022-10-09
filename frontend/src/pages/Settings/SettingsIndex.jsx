import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
// import mui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { PROFILE } from "navigation/routeConfig";

export default function SettingsIndex() {
  let navigate = useNavigate();
  const { t } = useTranslation();

  // use for displaying language option
  const lang = {
    en: t("languages.english"),
    de: t("languages.german"),
    el: t("languages.greek"),
    ru: t("languages.russian"),
    uk: t("languages.ukrainian")
  }

  return (
    <div style={{ paddingBottom: '80px' }}>
      <Box
        sx={{
          background: '#D22108',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          mb: 2,
          pb: 2
        }}>

        <Container maxWidth="lg" sx={{ zIndex: '2', width: '100%' }}>
          <div className="mt-3">
            <Button variant="text" size="small" onClick={() => navigate("../../" + PROFILE)}>
              <ArrowBackIosIcon sx={{ color: "#FFFFFF" }} />
              <Typography className="close-request" color="#FFFFFF" variant="button" fontSize={15} fontWeight='900' >
                {t('back')}
              </Typography>
            </Button>

            <Typography variant="h5" color="#FFFFFF" component="div" sx={{ fontWeight: 'bold', m: '1rem 0 0 5px' }}>
              {t('setting.settings')}
            </Typography>
          </div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box b={10} sx={{ padding: '0 5px' }}>
          <Typography variant="button" gutterBottom sx={{ color: '#D22108' }}>
            {t('setting.preferences')}
          </Typography>
        </Box>

        <List sx={{ width: '100%' }} component="nav" aria-label="settings language">
          <Divider />
          <ListItem className="language-select" button onClick={() => navigate("language")}>
            <ListItemText primary={t('setting.language')} />
            <Typography variant="body2" sx={{ color: '#00000099' }}>
              {lang[localStorage.getItem("i18nextLng")] || 'English'}
            </Typography>
            <KeyboardArrowRightIcon sx={{ color: '#00000099' }} />

          </ListItem>
          <Divider />
        </List>
        <div style={{ textAlign: 'center', paddingTop: '40px' }}>
          <Button variant="contained" onClick={() => navigate("/login", { replace: true })} >{t('setting.logout')}</Button>
        </div>
      </Container>
    </div>
  )
}
