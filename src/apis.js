import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // This is defined in package.json
  headers: {
    Accept: 'application/json'
  }
});

export const getRequiredData = (searchValue) =>
  api.get('/requiredData');