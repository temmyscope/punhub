import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const token = () => SecureStore.getItemAsync('user').then(token => token).catch(err => console.log(err));

const Api = axios.create({ baseURL: "https://punhubcentral.com/api/", timeout: 50000 });

Api.interceptors.request.use( async(config) => {
  const userToken = await token();
  return {
    ...config, headers: { 'Authorization': userToken.authToken ?? '', 'Content-Type': 'application/json' }
  };
}, () => []);

Api.interceptors.response.use((response) => response, (error) => Promise.reject(error));

export default Api;