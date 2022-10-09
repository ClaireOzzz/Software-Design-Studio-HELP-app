import { React, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import mui
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Slider from '@mui/material/Slider';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

import { Box, Container, Grid, Button, TextField, FormControl, Select, MenuItem, Typography } from '@mui/material'
//icons
import { ReactComponent as AcceptedIcon } from 'assets/AcceptedIcon.svg';
//local files
import FeedBanner from "../../Feed/components/FeedBanner";
import Counter from "./Counter"
//utils 
import { createRequest } from "utils/api";

import { FEED, USER } from "navigation/routeConfig"
import { USERNAME, USER_ID } from "../../../utils/constants";


// import { ReactComponent as EmptyBox } from 'assets/EmptyBox.svg';

const NewRequestForm = props => {
    let { type, userid } = useParams()
    let navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [preferredLocation, setPreferredLocation] = useState("")
    const [locationTo, setLocationTo] = useState("")
    const [locationFrom, setLocationFrom] = useState("")
    const [description, setDescription] = useState("")
    const [contactOptions, setContactOptions] = useState([])
    const [expiry, setExpiry] = useState("threeDays")
    const [numPeopleInNeed, setNumPeopleInNeed] = useState({ "adults": 0, "children": 0, "infants": 0 })

    let setQuantityValue = e => {
        let value = e.target.value
        if (value < 0 || isNaN(value)) {
            return 0
        }
        setQuantity(value)
    }

    let handleSubmit = e => {
        e.preventDefault()
        let payload; 
        let commonFields = {
            "user_id": userid,
            "status": "pending",
            "title": title,
            "description": description,
            "expiry": expiry,
            "request_type": type,
            "preferred_mode_of_contact": contactOptions,
        }
        switch(type) {
            case "medical":
                payload = {
                    ...commonFields,
                    quantity: {"qty": quantity},       
                }
               break;
            case "accommodation":
                payload = {
                    ...commonFields,
                    quantity: numPeopleInNeed,
                    location: preferredLocation
                }
                break;
            case "transport":
                payload = {
                    ...commonFields,
                    quantity: numPeopleInNeed,
                    location: {
                        to: locationTo,
                        from: locationFrom
                    },
                }
                break; 
            case "food":
                payload = {
                    ...commonFields,
                    quantity: numPeopleInNeed,
                }
                break; 
            default: 
                break;
        }
        (async () => {
            try {
              const res = await createRequest(payload);
              console.log(res.data);
              alert("Request created successfully")
              navigate(`/${USER}/${USER_ID}/${FEED}`)
            }
            catch (error) {
              console.log(error);
              alert("failure")
            }
          })();
    }

    return (
        <Box style={{ paddingBottom: '80px' }}>
            <FeedBanner backPage={`${FEED}/new`} title={`Request: ${type.charAt(0).toUpperCase() + type.slice(1)}`} username={USERNAME} icon={type}/>
            <Container max_width="lg">
                <form>
                    <Grid container alignItems="center" justify="center" direction="column" spacing={2}>
                        <Grid item style={{ width: "100%" }}>
                            <FormLabel name="title" component="div" sx={{ fontWeight: "bold", color: "#D22108" }}>
                                Title
                            </FormLabel>
                            <TextField
                                id="title-input"
                                name="Title"
                                placeholder="Title"
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        {
                            type === "medical" ?
                            <Grid item style={{ width: "100%" }}>
                                <FormLabel name="quantity" component="div" sx={{ fontWeight: "bold", color: "#D22108" }}>
                                    Quantity
                                </FormLabel>
                                <TextField
                                    id="quantity-input"
                                    name="Quantity"
                                    placeholder="Quantity"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    value={quantity}
                                    onChange={setQuantityValue}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            : ""
                        }
                        {
                            type !== "medical" ?
                            <Grid item>
                                <FormLabel name="numPeopleInNeed" component="div" sx={{ fontWeight: "bold", color: "#D22108" }}>
                                    Number of people in need
                                </FormLabel>
                                <Counter label="Adults" count={numPeopleInNeed["adults"]} setCount={val => setNumPeopleInNeed({ ...numPeopleInNeed, "adults": val })} />
                                <Counter label="Children" count={numPeopleInNeed["children"]} setCount={val => setNumPeopleInNeed({ ...numPeopleInNeed, "children": val })} />
                                <Counter label="Infants" count={numPeopleInNeed["infants"]} setCount={val => setNumPeopleInNeed({ ...numPeopleInNeed, "infants": val })} />
                            </Grid>
                            : ""
                        }
                        {
                            type === "accommodation" ?
                            <Grid item style={{ width: "100%" }}>
                                <FormLabel name="PreferredLocation" component="div" sx={{ fontWeight: "bold", color: "#D22108" }}>
                                    Preferred location
                                </FormLabel>
                                <TextField
                                    id="from-input"
                                    name="PreferredLocation"
                                    placeholder="Location"
                                    value={preferredLocation}
                                    onChange={e => setPreferredLocation(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            : ""
                        }
                        {
                            type === "transport" ?
                            <Grid item style={{ width: "100%" }}>
                                <FormLabel name="from" component="div" sx={{ fontWeight: "bold", color: "#D22108" }}>
                                    From
                                </FormLabel>
                                <TextField
                                    id="from-input"
                                    name="From"
                                    placeholder="Location"
                                    value={locationFrom}
                                    onChange={e => setLocationFrom(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            : ""
                        }
                        {
                            type === "transport" ?
                            <Grid item style={{ width: "100%" }}>
                                <FormLabel name="To" component="div" sx={{ fontWeight: "bold", color: "#D22108" }}>
                                    To
                                </FormLabel>
                                <TextField
                                    id="to-input"
                                    name="To"
                                    placeholder="Location"
                                    value={locationTo}
                                    onChange={e => setLocationTo(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            : ""
                        }

                        <Grid item style={{ width: "100%" }}>
                            <FormLabel name="ContactOptions" component="div" sx={{ fontWeight: "bold", color: "#D22108" }}>
                                Choose how you want to be contacted
                            </FormLabel>
                            <FormControl required style={{ width: "100%" }}>
                                <Select
                                    id ="contactOptions"
                                    name="ContactOptions"
                                    value={contactOptions}
                                    multiple
                                    onChange={e => setContactOptions(e.target.value)}
                                    enabled
                                >
                                    <MenuItem key="Facebook" value="Facebook">
                                        Facebook Messenger
                                    </MenuItem>
                                    <MenuItem key="Line" value="Line">
                                        LINE
                                    </MenuItem>
                                    <MenuItem key="Phone" value="Phone">
                                        Phone text message
                                    </MenuItem>
                                    <MenuItem key="Telegram" value="Telegram">
                                        Telegram
                                    </MenuItem>
                                    <MenuItem key="Viber" value="Viber">
                                        Viber
                                    </MenuItem>
                                    <MenuItem key="Wechat" value="Wechat">
                                        WeChat
                                    </MenuItem>
                                    <MenuItem key="Whatsapp" value="Whatsapp">
                                        Whatsapp
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item style={{ width: "100%" }}>
                            <FormLabel name="description" component="div" sx={{ fontWeight: "bold", color: "#D22108" }}>
                                Description
                            </FormLabel>
                            <TextField
                                id="description-input"
                                name="Description"
                                placeholder="Description"
                                type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                fullWidth
                                size="large"
                                variant="outlined"
                                multiline={true}
                                rows={4}
                                required
                            />
                        </Grid>
                        <Grid item style={{ width: "100%" }}>
                            <FormLabel name="expiry" component="div" sx={{ fontWeight: "bold", color: "#D22108" }}>
                                Expiry date of listing
                            </FormLabel>
                            <FormControl required style={{ width: "100%" }}>
                                <Select
                                    id ="expiry"
                                    name="Expiry"
                                    value={expiry}
                                    onChange={e => setExpiry(e.target.value)}
                                    enabled={true}
                                >

                                    <MenuItem key="threeDay" value="3">
                                        Three days
                                    </MenuItem>
                                    <MenuItem key="fiveDay" value="5">
                                        Five days
                                    </MenuItem>
                                    <MenuItem key="oneWeek" value="7">
                                        One week
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item justifyContent="center">
                            <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </Container>
        </Box>
    )
}

export default NewRequestForm;