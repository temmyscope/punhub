import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const token = async() => await SecureStore.getItemAsync('token');

const Api = axios.create({
  baseURL: "http://127.0.0.1:5000/api/",
  timeout: 50000,
  headers: { 'Authorization': token() ?? '', 'Content-Type': 'application/json' }
});

Api.interceptors.response.use( (response) => {
 if (response.status && response.status === 300) {
    SecureStore.deleteItemAsync('token');
 }
 return response;
}, (error) => { return Promise.reject(error) });

const loggedIn = async() => {
  const userToken = await token();
  return (userToken !== null && userToken.length > 32) ? true : false;
};

export default Api;
export { loggedIn };