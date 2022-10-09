import axios from 'axios';

const pwaDemoSession = () =>
  JSON.parse(localStorage.getItem('pwa-demo:session'));

export const createApiAxios = () => {
  const {
    authenticated: { identification, token }
  } = pwaDemoSession();

  return axios.create({
    headers: { 'X-User-Email': identification, 'X-User-Token': token }
  });
};

let apiAxiosSingleton = null;
export const apiAxios = () => {
  if (!apiAxiosSingleton) {
    apiAxiosSingleton = createApiAxios();
  }
  return apiAxiosSingleton;
};

const subscribeForWebPush = async subscription => {
  return apiAxios().post('/api/webpush/subscribe', subscription);
};

const fetchFeed = async => {
  return apiAxios().get('/api/feed');
};

const createFeed = async todo => {
  return apiAxios().post('/api/feed', { todo: todo });
};

const deleteFeed = async id => {
  return apiAxios().delete(`/api/feed/${id}`);
};

const updateFeed = async (id, todo) => {
  return apiAxios().put(`/api/feed/${id}`, { todo: todo });
};

export default {
  subscribeForWebPush,
  fetchFeed,
  createFeed,
  deleteFeed,
  updateFeed
};