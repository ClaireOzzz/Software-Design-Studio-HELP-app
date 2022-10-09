import axios from 'axios';

export const API_HOST = () => {
  return axios.create({
    // define baseURL (change this to gcloud link if need to deploy)
    // baseURL: `http://localhost:3000`
    // baseURL: `https://gebirah-help-api-qdur742kca-as.a.run.app/`
    baseURL: process.env.NODE_ENV === "production" ? `https://gebirah-help-api-qdur742kca-as.a.run.app/` : `http://127.0.0.1:3000`
  });
};

export const ML_REQUEST_HOST = () => {
  return axios.create({
    baseURL: process.env.NODE_ENV === "production" ? `https://create-request-ml-service-qdur742kca-as.a.run.app/` : `http://127.0.0.1:8000`
  });
}

export const CHATBOT_HOST = () => {
  return axios.create({
    baseURL: process.env.NODE_ENV === "production" ? `https://gebirah-help-chatbot-qdur742kca-as.a.run.app` : `http://127.0.0.1:7000`
  });
}

export const UXO_OBJECT_DETECTION_HOST = () => {
  return axios.create({
    baseURL: process.env.NODE_ENV === "production" ? `https://gebirah-help-uxo-detection-qdur742kca-as.a.run.app/uxo_detections/predict`: `http://127.0.0.1:6000`
    // baseURL: `https://gebirah-help-uxo-detection-qdur742kca-as.a.run.app/uxo_detections/predict`
  });
}

// export const API_HOST = () => {axios.create({
//   baseURL: `https://gebirah-help-api-qdur742kca-as.a.run.app/`
// })}

// get all requests
export const getAllRequests = async (userid) => {
  return await API_HOST().get(`/api/v1/feed/requests?user_id=${userid}`);
};

// get request details by id
export const getRequestDetails = async (id) => {
  return await API_HOST().get(`/api/v1/feed/requests/${id}`);
};

// get feed requests with filters
// to refactor 
export const getFilteredRequest = async (userid, categories, search, proximity, lat, lng) => {
  let uri = `/api/v1/feed/requests?user_id=${userid}`

  // Categories
  if (!Array.isArray(categories)) (categories = []); // null handling
  for (let category of categories) { uri += `&category[]=${category.toLowerCase()}` }

  // Proximity
  uri = proximity && lat && lng ? uri+`&proximity=${proximity}&lat=${lat}&lng=${lng}` : uri ;
  uri = search ? uri + `&search=${search}` : uri;
  
  return await API_HOST().get(uri);
};

// create new request 
export const createRequest = async (payload) => {
  return await API_HOST().post('/api/v1/feed/requests', payload);
}

// delete existing request
export const deleteRequest = async (id, requestID) => {
  return await API_HOST().delete(`/api/v1/users/${id}/requests/${requestID}`);
}

// edit existing request
export const editRequest = async (id, requestID) => {
  return await API_HOST().put(`/api/v1/users/${id}/requests/${requestID}`);
}

// repost expired or completed request
export const repostRequest = async (id, requestID) => {
  return await API_HOST().post(`/api/v1/users/${id}/requests/${requestID}/repost`);
}

// get all notifications
export const getAllNotifications = async (id) => {
  return await API_HOST().get(`/api/v1/users/${id}/notifications`);
};

// get all users
export const getAllUsers = async () => {
  return await API_HOST().get(`/api/v1/users`);
};

// accept/reject notification
export const handleNotification = async (userID, notificationID, type) => {
  return await API_HOST().post(`/api/v1/users/${userID}/notifications/${notificationID}/${type}`);
};

// create notification
export const createNotification = async (userID, requestID) => {
  return await API_HOST().post(`/api/v1/feed/requests/${requestID}/accept`, { user_id: userID });
};

// get successful connections
export const getSuccessfulConnections = async (id) => {
  return await API_HOST().get(`/api/v1/users/${id}/connections?status=true`);
};

// get profile requests 
export const getProfileRequests = async (id, type, status) => {
  return await API_HOST().get(`/api/v1/users/${id}/requests?status=${status}&type=${type}`);
}

// get profile details by id
export const getProfileInfo = async (id) => {
  return await API_HOST().get(`/api/v1/users/${id}`);
};

//get labels and summaries 
export const getLabelsAndSummariesML = async (text) => {
  return await ML_REQUEST_HOST().post('/predict', { "text": text });
}


const GOOGLE_MAPS_API_KEY = 'AIzaSyB3o4KOTL6IpypI0a0DYJrjwIAm-d9x19k';

// get all requests
export const reverseGeocode = async (latlng) => {
  return await API_HOST().get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${GOOGLE_MAPS_API_KEY}`);
};


export const getChatbotMessage = async (text) => {
  return await CHATBOT_HOST().post('/api/v1/chatbots/text_input', { "text": text });
}

export const getUXOBoundingBoxes = async(imageBytes) => {
  return await UXO_OBJECT_DETECTION_HOST().post('', { "imageBytes": imageBytes });
  
}
