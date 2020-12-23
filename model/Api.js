import axios from 'axios';

let randomString="Vxdr3aefd.Tg30m0r1THF";
let token = 'Bearer '+randomString;

const Api = axios.create({
  baseURL: "/",
  timeout: 50000,
  headers: {'Authorization': token, 'Content-Type': 'application/json' }
});

Api.interceptors.response.use( (response) =>{
 if (response.status && response.status === 300) {
    //localStorage.removeItem('token');
    return;
 }
 return response;
}, (error) => { return Promise.reject(error) });

export default Api;