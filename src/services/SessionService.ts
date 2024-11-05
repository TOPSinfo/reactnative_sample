import { NewSession, Session } from '@types';
import ApiService from './ApiService';
import buildQuery from '@utils/buildQuery';

type Query = {
  filter?: 'active' | 'closed';
  orderby?: 'history';
};

const url = '/api/users/me/sessions';
const url1 = '/api/users/me'

const SessionService = {
  getSessions: (query?: Query) =>
    ApiService.get<Session[]>(`${url}${query ? buildQuery(query) : ''}`),

  // TODO ADD TYPES HERE AND HANDLE THE START / END SESSION IN REDUX INSTEAD OF REFRESHING THE SESSIONS LIST ALL THE TIME
  startSession: (newSession: NewSession) =>
    ApiService.post<Session>(`${url}`, newSession),

  endSession: (id: string, endSessionData: any) => ApiService.post<Session>(`${url}/${id}/end`, endSessionData),

  changeCurrentVehicle: (data: any) =>
    ApiService.post<Session>(`${url1}/setlpnedit`, data),

  changeAutoRenew: (data: any) =>
    ApiService.post<Session>(`${url1}/setautorenew`, data),

  extendSession: (id: string, rateId: string) =>
    ApiService.post<Session>(`${url}/${id}/extend`, {
      rate: { recordID: rateId },
  }),
};

export default SessionService;
