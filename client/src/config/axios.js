import axios from 'axios';

// When using Vite proxy, baseURL should be empty or '/'
// The proxy will handle forwarding /api/* to http://localhost:3000

axios.defaults.withCredentials = true;

export default axios;