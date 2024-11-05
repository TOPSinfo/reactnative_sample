import ApiService from './ApiService';
import { Lot } from '@types';
import { Alert } from 'react-native';

const url = '/api/mobile/resource';

const ResourceService = {
  get: async (data: string, type?: any) => {
    if (type) {
      return ApiService.get<Lot>(`${url}?data=${data}&type=${type}`)
    } else {
      const splitData = data.split('/loc/');
      const finalData = splitData[1].split('/')
      if (finalData.length) {
        if (finalData.length == 1) {
         return ApiService.get<Lot>(`/1.6/location/rec/${finalData[0]}`)
        }
        if (finalData.length == 2) {
          return ApiService.get<Lot>(`${url}?data=${finalData[1]}`)
        }
      } else {
        throw new Error('Invalid QR value');
      }
    }
  },
};

export default ResourceService;
