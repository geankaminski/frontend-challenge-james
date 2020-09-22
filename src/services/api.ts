import axios from 'axios';

/*
 * Sometimes API stops responding. So I use this https://api.jsonbin.io/b/5f6785857243cd7e824006d3
 */

const api = axios.create({
  baseURL:
    'https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments',
});

export default api;
