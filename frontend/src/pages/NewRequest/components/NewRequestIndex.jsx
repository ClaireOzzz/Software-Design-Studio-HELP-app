import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';
// import mui
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';

import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

import FooterSpacer from "components/FooterSpacer"


//local files
import FeedBanner from "../../Feed/components/FeedBanner";

import { FEED } from "navigation/routeConfig"

import accommodationIcon from 'assets/accommodation.png';
import bandageIcon from 'assets/bandage.png';
import foodIcon from 'assets/food.png';
import transportIcon from 'assets/transport.png';

import { getLabelsAndSummariesML } from "utils/api";

const NewRequestIndex = () => {
    let [description, setDescription] = useState("");
    let [title, setTitle] = useState("");
    let [label, setLabel] = useState("");
    let [aiLabel, setAILabel] = useState("");
    let [aiTitle, setAITitle] = useState("");
    let [displayErr, setDisplayErr] = useState(false);
    let [displayPending, setDisplayPending] = useState(false);

    useEffect(() => {
        if (description.split(" ").length > 10) {
            setAITitle("");
            setAILabel("");
            setLabel("");
            setTitle("");
            setDisplayPending(true);
            const delayDebounceFn = setTimeout(() => {
                // console.log("sending request")
                // console.log(searchTerm)
                (async () => {
                    let res = await getLabelsAndSummariesML(description);
                    let summary = res["data"]["summarized_text"]
                    let predictedLabel = res["data"]["label"]
                    // console.log(res["data"]["label"])
                    setTitle(summary)
                    setAITitle(summary);
                    setLabel(predictedLabel);
                    setAILabel(predictedLabel);
                    setDisplayPending(false);
                })()
                // Send Axios request here
            }, 500)
            return () => clearTimeout(delayDebounceFn)
        } else {
            setAITitle("");
            // setLabel("");
            setAILabel("");
            setDisplayPending(false);
        }
    }, [description])


    let navigate = useNavigate()
    const { t } = useTranslation('request'); // for translation
    let types = ["medical", "accommodation", "transport", "food"]
    const iconType = {
        "medical": bandageIcon,
        "accommodation": accommodationIcon,
        "transport": transportIcon,
        "food": foodIcon,
    }

    const gotoForm = (e) => {
        e.preventDefault();
        if (label === "") {
            setDisplayErr(true);
        }
        navigate(`${label}`, { state: { "description": description, "title": title, "label": label } })
    }

    return (
        <div>
            <FeedBanner backPage={FEED} title={t('new.requesting_for')} username={localStorage.getItem('help-login-username')} />
            <Container max_width="lg">
                <form onSubmit={gotoForm}>
                    <Grid item style={{ width: "100%" }}>
                        <FormLabel name="description" component="div" sx={{ fontWeight: "bold", color: "#D22108" }} required>
                            {t('details.description')}
                        </FormLabel>
                        <TextField
                            required
                            id="description-input"
                            name="Description"
                            placeholder={t('details.description')}
                            type="text"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            fullWidth
                            size="large"
                            variant="outlined"
                            multiline={true}
                            rows={4}
                        />
                    </Grid>
                    <Grid item style={{ width: "100%" }}>
                        <Typography sx={{ mt: 2 }}>
                            {!(description.split(" ").length > 10) &&
                                <Trans i18nKey="new.AI_detect" t={t}>
                                    <span style={{ fontWeight: "bold", color: "#D22108" }}>AI Autodetection in place</span> , type at least <span style={{ fontWeight: "bold", color: "#D22108" }}>10 words</span>  for detection
                                </Trans>
                            }
                            {displayPending &&
                                <><CircularProgress size={16} /> <span style={{ fontWeight: "bold", color: "#D22108" }}>{t('new.AI_pending')}</span></>
                            }
                            {(label !== "" && aiLabel !== "") &&
                                <span>{t('new.AI_suggest_cat')} <span style={{ fontWeight: "bold", color: "#D22108" }}>{aiLabel}</span></span>
                            }
                        </Typography>
                        <Typography sx={{ mt: 1 }}>{t('new.current_selected')} <span style={{ fontWeight: "bold", color: "#D22108" }}>{(label.length !== 0) && t(`types.${label.toLowerCase()}`)}</span></Typography>

                        <Grid id="category-input" container >
                            {
                                types.map((type, index) => {
                                    return (
                                        <Grid item xs={6} sm={3} key={index}>
                                            <Card className={`${type}-card ${type}-icon card ${type === label.toLowerCase() ? "card-highlight" : ""}`} sx={{ p: 0.5, justifyContent: "center" }} onClick={() => setLabel(type.charAt(0).toUpperCase() + type.substring(1).toLowerCase())}>
                                                <CardMedia sx={{ objectFit: "contain" }}
                                                    component="img"
                                                    image={iconType[type]}
                                                    height={45}
                                                    alt={type}
                                                />
                                                <Typography align="center" sx={{ fontSize: "1em", mt: 1, fontWeight: "bold", color: "#D22108" }}>
                                                    {t(`types.${type.charAt(0) + type.slice(1)}`)}
                                                </Typography>
                                            </Card>
                                        </Grid>
                                    )
                                }
                                )
                            }
                        </Grid>
                    </Grid>


                    <Typography sx={{ mb: 2 }}>
                        {displayErr &&
                            <span style={{ fontWeight: "bold", color: "#D22108" }}>{t('new.select_category')}</span>
                        }
                    </Typography>

                    <FormLabel name="title" component="div" sx={{ fontWeight: "bold", color: "#D22108" }} required>
                        {(aiTitle === "") ?
                            <span style={{ fontWeight: "bold", color: "#D22108" }}>{t('new.title')}</span> :
                            <span style={{ fontWeight: "bold", color: "#D22108" }}>{t('new.AI_suggest_title')}</span>
                        }
                    </FormLabel>
                    <TextField
                        id="title-input"
                        name="Title"
                        placeholder={t('new.title')}
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        fullWidth
                        size="large"
                        variant="outlined"
                        multiline={true}
                        required
                    />
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ mt: 2, alignSelf: "right", fontWeight: "bold", backgroundColor: "#D22108" }}
                        type="submit"
                    >
                        {t('new.next')}
                    </Button>
                    <FooterSpacer />
                </form>
            </Container>

        </div>
    )
}

export default NewRequestIndex;