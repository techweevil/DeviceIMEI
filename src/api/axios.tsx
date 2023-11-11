import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.scalefusion.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token 2931c7eccc274d74b744558ec9db60b0'
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

export default instance;
