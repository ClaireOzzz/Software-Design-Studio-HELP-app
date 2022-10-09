import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { getFilteredRequest } from "utils/api";


export default function SearchBar(props) {
  const { t } = useTranslation(); // for translation
  // PROXIMITY STUFF: SAME AS IN REQUESTCARD! (to refactor) ========================================
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  const geolocationAPI = navigator.geolocation;

  const getUserCoordinates = () => {

    if (!geolocationAPI) {
      console.log("no location service :(")
      setLat(null);
      setLong(null);

    } else {
      geolocationAPI.getCurrentPosition((position) => {
        const { coords } = position;
        setLat(coords.latitude);
        setLong(coords.longitude);

      }, (error) => {
        // console.log("some geolocation error")
        // console.log(error)
        setLat(null);
        setLong(null);
      })
    }
  }



  getUserCoordinates();


  // PROXIMITY STUFF END ======================================================================

  const categories = [
    //put types here
    { title: 'Food', trans: t('search.food') },
    { title: 'Transport', trans: t('search.transport') },
    { title: 'Medical', trans: t('search.medical')},
    { title: 'Accommodation', trans:t('search.accommodation')},
    { title: '50km' },
    { title: '10km' },
    { title: '< 1km' },
    
  ];

  let { userid } = useParams();
  const options = categories.map((option) => {

    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[<, 0-9]/.test(firstLetter) ? t('search.proximity') : t('search.suggest_cat'),
      ...option,
    };
  });

  const filter = (e, values) => {
    const valid_categories = ["medical", "transport", "accommodation", "food"]
    const valid_proximities = {
      '50km': 50,
      '10km': 10,
      '< 1km': 1
    }
    // list of search terms into lowercase
    const searches = values.map(e => e.title.toLowerCase());

    // Check search terms for category options
    const categories = searches.filter(e => valid_categories.includes(e));

    // Check search terms for proximity options, map to their integer equivalents, take MIN as upper limit.
    const proximities = searches.filter(e => Object.keys(valid_proximities).includes(e))
      .map(e => valid_proximities[e]);
    const proximity = proximities.length === 0 ? null : Math.min(...proximities);

    // console.log(values);
    // console.log(categories);
    // console.log(proximities);
    // console.log(proximity);

    let search = e.target.value; // failsafe


    // accept notification
    (async () => {
      try {
        const res = await getFilteredRequest(
          userid,
          categories,
          search,
          proximity,
          lat,
          long
        );

        console.log(res.data);
        props.setRequests(res.data);
        
      }
      catch (error) {
        console.log(error);
      }
    })();
  }


  return (
    <Box sx={{ flex:'auto' }}>
      <Autocomplete
        className="search-bar filter-button"
        multiple
        onChange={filter}
        id="tags-outlined"
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.trans || option.title}
        defaultValue={[]}
        //freesolo allows user to search outside of tags
        freeSolo
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            className="search-option"
            {...params}
            label={t('search.search_txt')}
            placeholder={t('search.tip')}
          />
        )}

        //To adjust dropdown list height
        ListboxProps={
          {
            style: {
              maxHeight: '600px',
            }
          }
        }
      />
    </Box>
  )
}





