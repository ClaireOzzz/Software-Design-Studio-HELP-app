import { React, useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

const GOOGLE_MAPS_API_KEY = 'AIzaSyB3o4KOTL6IpypI0a0DYJrjwIAm-d9x19k';

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

export default function LocationInput({ type, setLocationTo }) {
  const { t } = useTranslation('request'); // for translation
  const [value, setValue] = useState(null);
  // const [valueFrom, setValueFrom] = useState(null);
  // const [valueTo, setValueTo] = useState(null);
  const [inputValue, setInputValue] = useState('');
  // const [inputValueFrom, setInputValueFrom] = useState('');
  // const [inputValueTo, setInputValueTo] = useState('');
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);

  // const name = props.name;
  // const type = props.type;

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);



  return (
    <>
      <Grid item style={{ width: "100%" }}>
        <FormLabel name="LocationFrom" component="div" sx={{ fontWeight: "bold", color: "#D22108" }} required>
          {t('details.to')}
        </FormLabel>

        <Autocomplete
          name="Location"
          id="location-autocomplete"
          // sx={{ width: 300 }}
          fullWidth
          required
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.description
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          value={value}
          // value={valueFrom}
          onChange={(event, newValue) => {
            if (newValue === null) {
              newValue = "";
            }
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            // setInputValueFrom(newInputValue);
            setLocationTo(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder={t("new.location_tip")} fullWidth required/>
          )}
          renderOption={(props, option) => {
            const matches = option.structured_formatting.main_text_matched_substrings;
            const parts = parse(
              option.structured_formatting.main_text,
              matches.map((match) => [match.offset, match.offset + match.length]),
            );

            return (
              <li {...props}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Box
                      component={LocationOnIcon}
                      sx={{ color: 'text.secondary', mr: 2 }}
                    />
                  </Grid>
                  <Grid item xs>
                    {parts.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          fontWeight: part.highlight ? 700 : 400,
                        }}
                      >
                        {part.text}
                      </span>
                    ))}

                    <Typography variant="body2" color="text.secondary">
                      {option.structured_formatting.secondary_text}
                    </Typography>
                  </Grid>
                </Grid>
              </li>
            );
          }}
        />
      </Grid>
    </>
  );
}