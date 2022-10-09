import React, { useEffect, useState } from "react";
// import mui related
import Button from '@mui/material/Button';

// import our own files
import api from 'api/api';

const RequestDetails = () => {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    // call api function
    // api.fetchRequestDetails().then(response => {
    //     setEventList(response.data);
    //   });
  }, []);

  return (
    <div>
      <Button variant="contained">Accept Request</Button>
    </div>
  )
}

export default RequestDetails;