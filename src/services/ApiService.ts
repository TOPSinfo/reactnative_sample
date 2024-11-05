import axios, { AxiosRequestConfig } from 'axios';
import { combineUrl, combineRequestConfig } from '@utils/axios';

const ApiService = {
  get: async <T>(url: string, config?:any) =>
    axios
      .get<T>(combineUrl(url), combineRequestConfig(config))
      .then(res => res.data),
  post: async <T>(url: string, data: any, config?: AxiosRequestConfig) =>
    axios
      .post<T>(combineUrl(url), data, combineRequestConfig(config))
      .then(res => res.data),

  put: async <T>(url: string, data: any, config?: AxiosRequestConfig) =>
    axios
      .put<T>(combineUrl(url), data, combineRequestConfig(config))
      .then(res => res.data),

  remove: async <T>(url: string, config?: AxiosRequestConfig) =>
    axios
      .delete<T>(combineUrl(url), combineRequestConfig(config))
      .then(res => res.data),
};

export default ApiService;
