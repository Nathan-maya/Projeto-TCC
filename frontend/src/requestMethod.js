import axios from 'axios';

const BASE_URL = 'http://192.168.68.115:8080/api/';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
