import AsyncStorage from '@react-native-community/async-storage';

import { isSet } from '@utils/isSet';
import ApiService from './ApiService';
import { StorageItem } from '@consts/storage';
import AccountService from './AccountService';
import { AccountData, OauthToken } from '@types';
import {
  enableApiErrorInterceptor,
  removeOauthInterceptor,
  setOauthRequestInterceptor,
} from '@utils/axios';
import { useDispatch } from 'react-redux';

const url = '/api/users';
const AuthService = {
  waitForNewToken: false,
  setOnAppStartInterceptors: () => {
    enableApiErrorInterceptor();
    AuthService.getAuthToken().then(token => {
      if (token) {
        setOauthRequestInterceptor(`${token.tokenType} ${token.accessToken}`);
      }
    });
  },
  saveAuthToken: (oauthData: OauthToken) => {
    AsyncStorage.setItem(StorageItem.Oauth, JSON.stringify(oauthData));
  },
  getAuthToken: async (): Promise<OauthToken | null> => {
    const authData = await AsyncStorage.getItem(StorageItem.Oauth);
    return authData ? JSON.parse(authData) : null;
  },
  authenticate: async () => {
    try {
      const hash = await AsyncStorage.getItem(StorageItem.Oauth);

      if (!isSet(hash)) {
        throw new Error();
      } else {
        return AccountService.getMyAccount();
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  login: async (email: string, password: string, token: string) => {
    const deviceToken = { device_token: token }
    return ApiService.post(`${url}/login`, {
      email,
      password,
      ...deviceToken
    }).then((response: any) => {
      if (response) {
        const expiresAt: number = response.expires_in + new Date().getTime();
        const oauthData = {
          accessToken: response.access_token,
          expiresIn: response.expires_in,
          refreshToken: response.refresh_token,
          tokenType: response.token_type,
          expiresAt,
        };
        AuthService.saveAuthToken(oauthData);
        setOauthRequestInterceptor(
          `${oauthData.tokenType} ${oauthData.accessToken}`
        );
        return response;
      }
      return response;
    });
  },
  refreshOauthToken: async (callback?: any) => {
    let oauthToken = await AuthService.getAuthToken();
    if (oauthToken) {
      AuthService.waitForNewToken = true;
      removeOauthInterceptor();

      return ApiService.post(`${url}/token/refresh`, {
        access_token: oauthToken.accessToken,
        refresh_token: oauthToken.refreshToken,
      })
        .then((response: any) => {
          const expiresAt: number = response.expires_in + new Date().getTime();
          const newOauthToken = {
            ...oauthToken,
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
            expiresIn: response.expires_in,
            expiresAt: expiresAt,
            tokenType: oauthToken?.tokenType || 'Bearer',
          };
          AuthService.saveAuthToken(newOauthToken);

          setOauthRequestInterceptor(
            `${newOauthToken.tokenType} ${newOauthToken.accessToken}`
          );

          AuthService.waitForNewToken = false;
          if (typeof callback === 'function') {
            callback(`${newOauthToken.tokenType} ${newOauthToken.accessToken}`);
          }
        })
        .catch(e => {
          AuthService.waitForNewToken = false;
          AsyncStorage.removeItem(StorageItem.Oauth);
          throw e;
        });
    }
  },

  logout: async () => {
    return ApiService.get(`${url}/logout`).then(res => {
      AsyncStorage.removeItem(StorageItem.Oauth);
      removeOauthInterceptor();
      return res;
    });
  },

  register: (data: AccountData) => {
    const formattedData = {
      ...data,
      cards: data.cards
        ? data.cards.map(({ month, year, primary, ...rest }) => ({
          isDefault: primary,
          expirationDate: `${year}/${month}`,
          ...rest,
        }))
        : data.cards,
    };

    return ApiService.post(url, formattedData);
  },

  changePassword: async (params: any) =>
    AccountService.updateAccount(params),

  forgotPassword: (email: string) => {
    return ApiService.put(`${url}/reset`, { email })
  },

  deleteAccount: (email: string) => {
    return ApiService.post(`${url}/deleteAccount`, email)
  },

  updateAppLanguage: (language: string) => {
    return ApiService.post(`${url}/setLanguage`, language)
  },

  reactivateAccount: (id: string, type: string) => {
    return ApiService.get(`${url}/checkloginuser?userid=${id}&type=${type}`)
  },

  accountReactivation: (id: string) => {
    return ApiService.get(`${url}/reactivate/${id}`)
  },

  uploadDeviceToken: (data:any) => {
    return AccountService.updateDeviceToken(data)
  }

};

export default AuthService;
