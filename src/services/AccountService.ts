import { Account } from '@types';
import ApiService from './ApiService';

const accountUrl = '/api/users';

const AccountService = {
  getMyAccount: () => ApiService.get<Account>(`${accountUrl}/me`),

  createAccount: (data: any) => ApiService.post(`${accountUrl}`, data),

  updateAccount: (data: Partial<Account>) => {
    return ApiService.put(`${accountUrl}/me`, data);
  },
  updateDeviceToken: (data:any) =>{
    return ApiService.put(`${accountUrl}/deviceToken`, data);
  }
};

export default AccountService;
