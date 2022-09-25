import axios from 'axios';
import Cookies from 'js-cookie';

const $http = axios.create({
  params: {
    appid: import.meta.env.VITE_API_KEY,
  },
});

export { $http };
