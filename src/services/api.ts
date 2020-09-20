import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments',
});

export default api;
