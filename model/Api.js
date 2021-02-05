import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const token = () => SecureStore.getItemAsync('token')
.then(token => token).catch(err => console.log(err));

const Api = axios.create({
  baseURL: "http://127.0.0.1:5000/api/", timeout: 50000
});

Api.interceptors.request.use( async(config) => {
  const userToken = await token();
  return {
    ...config, headers: { 'Authorization': userToken ?? '', 'Content-Type': 'application/json' }
  };
}, () => []);

Api.interceptors.response.use((response) => response, (error) => Promise.reject(error));

const loggedIn = async() => {
  const userToken = await token();
  return ( userToken && userToken !== null && (typeof userToken === "string") && userToken !== "") ? 
  true : false;
};

export default Api;
export { loggedIn };