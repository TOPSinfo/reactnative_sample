import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import Config from '@config/Config';
import AuthService from '@services/AuthService';
import { ErrorService } from '@services/ErrorService';
import { ApiError } from '@types';
import { AppLanguage } from './lang';


const apiUrl = Config.apiUrl;

let oauthRequestInterceptor: number;

const globalRequestConfig = {
  
  headers: {
    Accept: 'application/json',
    ContentType: 'application/json',
    language: ''
  }

};

export const combineUrl = (url: string): string => {
  return `${apiUrl}${url}`;
};


export const combineRequestConfig =  (
  config:any
)  => {
  globalRequestConfig.headers['language'] = AppLanguage
  return { ...globalRequestConfig, ...config };
};

const replayRequest = async (params: any, authHeader?: string) => {
  const originalRequest = { ...params.originalRequest };
  if (authHeader) {
    originalRequest.headers = {
      ...originalRequest.headers,
      Authorization: authHeader,
    };
  } else {
    const oauth = await AuthService.getAuthToken();
    originalRequest.headers = {
      ...originalRequest.headers,
      Authorization: `${oauth?.tokenType} ${oauth?.accessToken}`,
    };
  }

  axios(originalRequest)
    .then(originalResponse => {
      params.resolve(originalResponse);
    })
    .catch(originalResponse => {
      params.reject(originalResponse);
    });
};

export const setOauthRequestInterceptor = (oauth: string) => {
  oauthRequestInterceptor = axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      config.headers = { ...config.headers, Authorization: oauth };
      config.headers['request-startTime'] = new Date().getTime();
      return config;
    }
  );

};

export const removeOauthInterceptor = () => {
  axios.interceptors.request.eject(oauthRequestInterceptor);
};

export const enableApiErrorInterceptor = () => {
  axios.interceptors.response.use(
    response => {
      const start = response.config.headers['request-startTime']
      const end = new Date().getTime()
      response.headers['request-duration'] = end - start
      return response;
    },
    (error: AxiosError) => {
      return new Promise((resolve, reject) => {
        // token expired
        if (error.response?.status === 499) {
          if (AuthService.waitForNewToken) {
            const intervalId = setInterval(() => {
              if (!AuthService.waitForNewToken) {
                clearInterval(intervalId);
                replayRequest({
                  originalRequest: error.config,
                  resolve,
                  reject,
                });
              }
            }, 200);
          } else {
            // console.warn('old token', AuthService.getAuthToken());
            AuthService.refreshOauthToken((authHeader: string) => {
              replayRequest(
                {
                  originalRequest: error.config,
                  resolve,
                  reject,
                },
                authHeader
              );
            }).catch(x => reject(x));
          }
        } else {
          ErrorService.apiLogError(error);

          const headers = error.response?.headers ?? {};

          if (headers.hasOwnProperty('qp-errorcode')) {
            reject({
              code: Number(headers['qp-errorcode'].replace(/\D/g, '')),
              message: headers['qp-statusmsg'] ?? '',
              data: error.response?.data,
            } as ApiError);
          } else {
            reject(error);
          }
        }
      });
    }
  );
};
