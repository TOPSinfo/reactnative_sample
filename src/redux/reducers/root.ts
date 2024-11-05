import { combineReducers } from 'redux';

import parkingReducer, { State as ParkingState } from './parking';
import vehiclesReducer, { State as VehiclesState } from './vehicles';
import authReducer, { State as AuthState } from './auth';
import cardsReducer, { State as CardsState } from './cards';
import sessionsReducer, { State as SessionsState } from './sessions';
import notificationsReducer, {
  State as NotificationsState,
} from './notifications';
import loaderReducer, { State as LoaderState } from '../slices/loader';
import tabReducer,{State as TabState} from '../slices/tab'
import testModeReducer,{State as TestModeState} from '../slices/testmode'

export interface RootState {
  parking: ParkingState;
  vehicles: VehiclesState;
  auth: AuthState;
  cards: CardsState;
  sessions: SessionsState;
  notifications: NotificationsState;
  loader: LoaderState;
  tabReducer:TabState;
  testModeReducer:TestModeState
}

export default combineReducers<RootState>({
  parking: parkingReducer,
  vehicles: vehiclesReducer,
  auth: authReducer,
  cards: cardsReducer,
  sessions: sessionsReducer,
  notifications: notificationsReducer,
  loader: loaderReducer,
  tabReducer:tabReducer,
  testModeReducer:testModeReducer
});
