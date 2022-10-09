import axios from 'axios';

export const API_HOST = () => {
  return axios.create({
    // define baseURL (change this to gcloud link if need to deploy)
    baseURL: `http://localhost:3000`
  });
};

// get all requests
export const getAllRequests = async () => {
  return await API_HOST().get('/api/v1/feed/requests');
};

// get request details by id
export const getRequestDetails = async (id) => {
  return await API_HOST().get(`/api/v1/feed/requests/${id}`);
};