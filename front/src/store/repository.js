import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081'
});

if (localStorage.getItem('token')) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}

instance.interceptors.response.use((res) => res, ({ response }) => {
  if (response.status === 401) {
    window.location = '/login';
  }
});

export default instance;
