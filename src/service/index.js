import axios from 'axios';
import { API_URL } from './Constants';

const service = axios.create({
  baseURL: API_URL,
});

export default service;
