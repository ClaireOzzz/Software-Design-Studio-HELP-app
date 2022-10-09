import { React, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

// import mui
import FormLabel from '@mui/material/FormLabel';
import { Box, Container, Grid, Button, TextField, FormControl, Select, MenuItem } from '@mui/material';

//local files
import FeedBanner from "../../Feed/components/FeedBanner";
import Counter from "./Counter";
import LocationInputFrom from "./LocationInputFrom";
import LocationInputTo from "./LocationInputTo";

//utils 
import { createRequest } from "utils/api";
import { getUserCoordinates } from "utils/locationService";
import { FEED } from "navigation/routeConfig";

const NewRequestForm = props => {
  let { type, userid } = useParams();
  type = type.toLowerCase();

  let navigate = useNavigate();
  const { t } = useTranslation('request'); // for translation
  let location = useLocation();
  // console.log(location.state.title)

  const [title, setTitle] = useState(location.state && location.state.title ? location.state.title : "");
  const [quantity, setQuantity] = useState(1);
  const [locationTo, setLocationTo] = useState("");
  const [locationFrom, setLocationFrom] = useState("");
  const [description, setDescription] = useState(location.state && location.state.description ? location.state.description : "");
  const [contactOptions, setContactOptions] = useState([]);
  const [expiry, setExpiry] = useState(3);
  const [numPeopleInNeed, setNumPeopleInNeed] = useState({ "adults": 0, "children": 0, "infants": 0 });
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  getUserCoordinates(setLat, setLong);

  let setQuantityValue = e => {
    let value = e.target.value;
    if (value < 0 || isNaN(value)) {
      return 0;
    }
    setQuantity(value);
  }

  let setLocationFromInput = (input) => {
    if (input && input !== "Current Location") return { name: locationFrom };
    return { lat: lat, lng: long };
  }

  let handleSubmit = e => {
    e.preventDefault();

    let payload;

    let expiryDate = new Date();
    let today = new Date();

    expiryDate.setDate(today.getDate() + expiry); // expiry is a number encoding the number of days before post expires

    let commonFields = {
      "user_id": userid,
      "status": "pending",
      "title": title,
      "description": description,
      "expiry": expiryDate,
      "request_type": type,
      "preferred_mode_of_contact": contactOptions,
    }
    switch (type) {
      case "medical":
        payload = {
          ...commonFields,
          quantity: { "qty": quantity },
          location: setLocationFromInput(locationFrom)
        }
        break;
      case "accommodation":
        payload = {
          ...commonFields,
          quantity: numPeopleInNeed,
          location: setLocationFromInput(locationFrom)
        }
        break;
      case "transport":
        payload = {
          ...commonFields,
          quantity: numPeopleInNeed,
          location: {
            to: { name: locationTo },
            from: setLocationFromInput(locationFrom)
          },
        }
        break;
      case "food":
        payload = {
          ...commonFields,
          quantity: numPeopleInNeed,
          location: setLocationFromInput(locationFrom)
        }
        break;
      default:
        break;
    }

    (async () => {
      try {
        // console.log(payload)
        const res = await createRequest(payload);
        // console.log(res.data);
        navigate("success")
      }
      catch (error) {
        console.log(error);
        alert("failure")
      }
    })();
  }

  return (
    <Box style={{ paddingBottom: '80px' }}>
      <FeedBanner backPage={`${FEED}/new`} title={`${t('new.request')}: ${t(`types.${type.charAt(0) + type.slice(1)}`)}`} username={localStorage.getItem('help-login-username')} icon={type} />
      <Container max_width="lg">
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="center" justify="center" direction="column" spacing={2}>
            <Grid item style={{ width: "100%" }}>
              <FormLabel name="title" component="div" sx={{ fontWeight: "bold", color: "#D22108" }} required>
                {t('new.title')}
              </FormLabel>
              <TextField
                id="title-input"
                name="Title"
                placeholder={t('new.title')}
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                fullWidth
                multiline={true}
                required
              />
            </Grid>
            {
              type === "medical" ?
                <>
                  <Grid item style={{ width: "100%" }}>
                    <FormLabel name="quantity" component="div" sx={{ fontWeight: "bold", color: "#D22108" }} required>
                      {t('new.quantity')}
                    </FormLabel>
                    <TextField
                      id="quantity-input"
                      name="Quantity"
                      placeholder={t('new.quantity')}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      value={quantity}
                      onChange={setQuantityValue}
                      fullWidth
                      required
                    />
                  </Grid>
                  <LocationInputFrom name="Location" type={type} setLocationFrom={setLocationFrom} />
                </>
                : ""
            }
            {
              type !== "medical" ?
                <Grid item>
                  <FormLabel name="numPeopleInNeed" component="div" sx={{ fontWeight: "bold", color: "#D22108" }} required>
                    {t('details.num_quantity')}
                  </FormLabel>
                  <Counter label={t('details.adults')} count={numPeopleInNeed["adults"]} setCount={val => setNumPeopleInNeed({ ...numPeopleInNeed, "adults": val })} />
                  <Counter label={t('details.children')} count={numPeopleInNeed["children"]} setCount={val => setNumPeopleInNeed({ ...numPeopleInNeed, "children": val })} />
                  <Counter label={t('details.infants')} count={numPeopleInNeed["infants"]} setCount={val => setNumPeopleInNeed({ ...numPeopleInNeed, "infants": val })} />
                </Grid>
                : ""
            }
            {
              type === "accommodation" ?
                <LocationInputFrom name="Location" type={type} setLocationFrom={setLocationFrom} />
                : ""
            }
            {
              type === "food" ?
                <LocationInputFrom name="Location" type={type} setLocationFrom={setLocationFrom} />
                : ""
            }
            {
              type === "transport" ?
                <LocationInputFrom name="Location" type={type} setLocationFrom={setLocationFrom} />
                : ""
            }
            {
              type === "transport" ?
                <LocationInputTo name="Location" type={type} setLocationTo={setLocationTo} />
                : ""
            }

            <Grid item style={{ width: "100%" }}>
              <FormLabel name="ContactOptions" component="div" sx={{ fontWeight: "bold", color: "#D22108" }}  required>
                {t('details.contacts')}
              </FormLabel>
              <FormControl required style={{ width: "100%" }}>
                <Select
                  id="contactOptions"
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
              <FormLabel name="description" component="div" sx={{ fontWeight: "bold", color: "#D22108" }} required>
                {t('details.description')}
              </FormLabel>
              <TextField
                id="description-input"
                name="Description"
                placeholder={t('details.description')}
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                fullWidth
                size="large"
                // variant="outlined"
                multiline={true}
                rows={4}
                required
              />
            </Grid>
            <Grid item style={{ width: "100%" }}>
              <FormLabel name="expiry" component="div" sx={{ fontWeight: "bold", color: "#D22108" }} required>
                {t('new.expired')}
              </FormLabel>
              <FormControl required style={{ width: "100%" }}>
                <Select
                  id="expiry"
                  name="Expiry"
                  value={expiry}
                  onChange={e => setExpiry(e.target.value)}
                  enabled={true}
                >

                  <MenuItem key="threeDay" value={3}>
                    {t('new.3d')}
                  </MenuItem>
                  <MenuItem key="fiveDay" value={5}>
                    {t('new.5d')}
                  </MenuItem>
                  <MenuItem key="oneWeek" value={7}>
                    {t('new.1wk')}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item justifyContent="center">
              <Button variant="contained" color="primary" type="submit">
                {t('new.submitBtn')}
              </Button>
            </Grid>
          </Grid>

        </form>
      </Container>
    </Box>
  )
}

export default NewRequestForm;


// interface propState {
//   description: string;
//   title: string;
//   label: string;
// } 
