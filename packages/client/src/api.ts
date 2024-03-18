import axios from 'axios';

export function getApi(url: string) {
  return axios.create({
    baseURL: url,
    timeout: 1000,
  });
}
