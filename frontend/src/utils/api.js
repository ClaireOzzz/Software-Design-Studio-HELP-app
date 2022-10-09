import axios from 'axios';

export const API_HOST = () => {
  return axios.create({
    // define baseURL (change this to gcloud link if need to deploy)
    // baseURL: `http://localhost:3000`
    baseURL: `https://gebirah-help-api-qdur742kca-as.a.run.app/`
  });
};

// get all requests
export const getAllRequests = async (userid) => {
  return await API_HOST().get(`/api/v1/feed/requests?user_id=${userid}`);
};

// get request details by id
export const getRequestDetails = async (id) => {
  return await API_HOST().get(`/api/v1/feed/requests/${id}`);
};

// create new request 
export const createRequest = async (payload) => {
  return await API_HOST().post('/api/v1/feed/requests', payload);
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