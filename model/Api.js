import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const token = async() => await SecureStore.getItemAsync('token');

const loggedIn = async() => {
  return token() ? true : false;
};

const Api = axios.create({
  baseURL: "http://127.0.0.1:5000/api/",
  timeout: 50000,
  headers: {
    'Authorization': token() ?? '',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

Api.interceptors.response.use( (response) => {
 if (response.status && response.status === 300) {
    SecureStore.deleteItemAsync('token');
    return;
 }
 return response.json();
}, (error) => { return Promise.reject(error) });

const login = (email, password) => {
  return Api.post('/auth/login', { email: email, password: password })
  .then(async(data) => {
    await SecureStore.setItemAsync('token', `Bearer ${data.data.token}`);
    return true;
  }).catch(err => false );
}

const config = {
  ravePubKey: "",
  email: SecureStore.getItemAsync('email')
}

export default Api;
export { login };
export { config };
export { loggedIn };