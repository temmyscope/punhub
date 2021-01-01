import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const Api = axios.create({
  baseURL: "/api",
  timeout: 50000,
  headers: {
    'Authorization': SecureStore.getItemAsync('token'),
    'Content-Type': 'application/json' 
  }
});

Api.interceptors.response.use( (response) =>{
 if (response.status && response.status === 300) {
    SecureStore.deleteItemAsync('token');
    return;
 }
 return response;
}, (error) => { return Promise.reject(error) });

const login = (email, password) => {
  Api.post('/login', { email: email, password: password })
  .then(data => {
    SecureStore.setItemAsync('token', data.data.token);
  });
}

export default Api;
export { login };