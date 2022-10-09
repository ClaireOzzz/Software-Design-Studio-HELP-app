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
import DoneIcon from '@mui/icons-material/Done';
// import local files
import { SETTINGS } from "navigation/routeConfig";

export default function LanguageSettings() {
  let navigate = useNavigate();
  const { t, i18n } = useTranslation();


  // use for displaying language option
  const lang = {
    en: t("languages.english"),
    de: t("languages.german"),
    el: t("languages.greek"),
    ru: t("languages.russian"),
    uk: t("languages.ukrainian")
  }

  const handleLang = (lng) => {
    localStorage.setItem('i18nextLng', lng);
    i18n.changeLanguage(lng);
    navigate("../../" + SETTINGS);
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
            <Button variant="text" size="small" onClick={() => navigate(-1)}>
              <ArrowBackIosIcon sx={{ color: "#FFFFFF" }} />
              <Typography className="close-request" color="#FFFFFF" variant="button" fontSize={15} fontWeight='900' >
                {t('back')}
              </Typography>
            </Button>

            <Typography variant="h5" color="#FFFFFF" component="div" sx={{ fontWeight: 'bold', m: '1rem 0 0 5px' }}>
              {t('setting.sel_lang')}
            </Typography>
          </div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <List sx={{ width: '100%' }} component="nav" aria-label="mailbox folders">
          {Object.keys(lang).map((key, index) => {
            return (
              <div key={index}>
                <Divider />
                <ListItem button onClick={() => handleLang(key)}>
                  <ListItemText primary={`${lang[key]} (${key.toUpperCase()})`} />
                  {(localStorage.getItem("i18nextLng") || i18n.resolvedLanguage) === key ?
                    <DoneIcon sx={{ color: '#D22108' }} /> :
                    ""
                  }
                </ListItem>
                <Divider />
              </div>
            )
          })}
        </List>
      </Container>
    </div>
  )
}
