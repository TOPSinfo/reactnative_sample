import { createAction } from '@reduxjs/toolkit';
import { Navigation } from 'react-native-navigation';

import { NewSession, Session } from '@types';
import store, { AppThunk } from '@redux/store';
import {
  SESSIONS_REQUEST,
  SESSIONS_SUCCESS,
  SESSIONS_FAILURE,
  START_SESSION_REQUEST,
  START_SESSION_SUCCESS,
  START_SESSION_FAILURE,
  END_SESSION_REQUEST,
  END_SESSION_SUCCESS,
  END_SESSION_FAILURE,
  SESSION_HISTORY_REQUEST,
  SESSION_HISTORY_SUCCESS,
  SESSION_HISTORY_FAILURE,
  EXTEND_SESSION_REQUEST,
  EXTEND_SESSION_SUCCESS,
  EXTEND_SESSION_FAILURE,
  SESSION_CHANGE_VEHICLE_REQUEST,
  SESSION_CHANGE_VEHICLE_SUCCESS,
  SESSION_CHANGE_VEHICLE_FAILURE,
  SESSION_AUTO_RENEW_REQUEST,
  SESSION_AUTO_RENEW_SUCCESS,
  SESSION_AUTO_RENEW_FAILURE
} from '@consts/actions';
import SessionService from '@services/SessionService';
import { toggleLoader } from '@redux/slices/loader';
import { showNotification } from '@redux/actions/notifications';
import { activeScreenSet } from '@navigation';
import { setSessionLoader, setTabCurrentView } from '@redux/slices/tab';

export const startStopAutoRenew = (data: any): AppThunk => async dispatch => {
  const request = createAction<void>(SESSION_AUTO_RENEW_REQUEST);
  const success = createAction<Session[]>(SESSION_AUTO_RENEW_SUCCESS);
  const failure = createAction<string>(SESSION_AUTO_RENEW_FAILURE);

  dispatch(request());
  dispatch(toggleLoader(true));

  try {
    const autoRenew = await SessionService.changeAutoRenew(data);
  } catch (e) {
    dispatch(failure(e.message));
  } finally {
    dispatch(getSessions())
  }
};

export const getSessions = (): AppThunk => async dispatch => {
  const request = createAction<void>(SESSIONS_REQUEST);
  const success = createAction<Session[]>(SESSIONS_SUCCESS);
  const failure = createAction<string>(SESSIONS_FAILURE);
  const sessionData = store.getState().sessions.value

  dispatch(request());
  if(sessionData?.length){
    dispatch(setSessionLoader(true))
  }else{
    dispatch(toggleLoader(true));
  }

  try {
    const sessions = await SessionService.getSessions({ filter: 'active' });
    dispatch(success(sessions));
  } catch (e) {
    dispatch(failure(e.message));
  } finally {
    dispatch(setSessionLoader(false))
    dispatch(toggleLoader(false));
  }
};

export const changeActiveVehicle = (data: any): AppThunk => async dispatch => {
  const request = createAction<void>(SESSION_CHANGE_VEHICLE_REQUEST);
  const success = createAction<Session[]>(SESSION_CHANGE_VEHICLE_SUCCESS);
  const failure = createAction<string>(SESSION_CHANGE_VEHICLE_FAILURE);

  dispatch(request());
  dispatch(toggleLoader(true));

  try {
    const sessions = await SessionService.changeCurrentVehicle(data);
    dispatch(
      showNotification({
        message: 'changeActiveVehicle',
        type: 'success',
      })
    )
  } catch (e) {
    dispatch(failure(e.message));
    dispatch(
      showNotification({
        message: e.message ? e.message : 'errorEditVehicle',
        type: 'error',
      })
    )
  } finally {
    dispatch(getSessions())
    // dispatch(toggleLoader(false));
  }
};

export const getSessionHistory = (): AppThunk => async dispatch => {
  const request = createAction<void>(SESSION_HISTORY_REQUEST);
  const success = createAction<Session[]>(SESSION_HISTORY_SUCCESS);
  const failure = createAction<string>(SESSION_HISTORY_FAILURE);
  const sessionData = store.getState().sessions.history

  dispatch(request());
  if(sessionData?.length){
    dispatch(setSessionLoader(true))
  }else{
    dispatch(toggleLoader(true));
  }

  try {
    const sessions = await SessionService.getSessions({ filter: 'closed' });
    dispatch(success(sessions));
  } catch (e) {
    dispatch(failure(e.message));
  } finally {
    dispatch(setSessionLoader(false))

    dispatch(toggleLoader(false));
  }
};

export const startSession = (
  newSession: NewSession,
  componentId: string | null
): AppThunk => async dispatch => {
  const request = createAction<void>(START_SESSION_REQUEST);
  const success = createAction<NewSession>(START_SESSION_SUCCESS);
  const failure = createAction<string>(START_SESSION_FAILURE);

  dispatch(request());
  dispatch(toggleLoader(true));
  try {
    const session = await SessionService.startSession(newSession);
    dispatch(
      showNotification({
        message: 'yourParkingSessionHasStarted',
        type: 'success',
      })
    );
    dispatch(success(session));

    activeScreenSet.clear();
    Navigation.popToRoot('SessionsScreenId')
    Navigation.mergeOptions('SessionsScreenId', {
      bottomTabs: {
        currentTabId: 'SessionsScreenId'
      }
    })
  } catch (e) {
    dispatch(failure(e?.message));
    dispatch(
      showNotification({
        type: 'error',
        message: e?.response?.data?.message ?? e?.data?.message,
      })
    );
  } finally {
    dispatch(toggleLoader(false));
  }
};

export const endSession = (sessionId: string, endSessionData: any): AppThunk => async dispatch => {
  const request = createAction<void>(END_SESSION_REQUEST);
  const success = createAction<string>(END_SESSION_SUCCESS);
  const failure = createAction<string>(END_SESSION_FAILURE);

  dispatch(request());
  dispatch(toggleLoader(true));

  try {
    await SessionService.endSession(sessionId, endSessionData);
    dispatch(
      showNotification({
        message: 'yourParkingSessionHasEnded',
        type: 'success',
      })
    );
    dispatch(success(sessionId));
    Navigation.popToRoot('SessionsScreenId')
    Navigation.mergeOptions('SessionsScreenId', {
      bottomTabs: {
        currentTabId: 'SessionsScreenId'
      }
    })
    dispatch(setTabCurrentView(true))

  } catch (e) {
    dispatch(failure(e.message));
    if (e.response?.data?.message) {
      dispatch(
        showNotification({ type: 'error', message: e.response.data.message })
      );
    } else {
      dispatch(
        showNotification({ type: 'error', message: e.message ? e.message : 'Something went wrong' })
      );
    }
  } finally {
    dispatch(toggleLoader(false));
    dispatch(getSessionHistory())
    Navigation.popToRoot('SessionsScreenId')
    dispatch(setTabCurrentView(true))

  }
};

export const extendSession = (
  ...params: Parameters<typeof SessionService.extendSession>
): AppThunk => async dispatch => {
  const request = createAction<void>(EXTEND_SESSION_REQUEST);
  const success = createAction<void>(EXTEND_SESSION_SUCCESS);
  const failure = createAction<string>(EXTEND_SESSION_FAILURE);

  dispatch(request());
  dispatch(toggleLoader(true));

  try {
    await SessionService.extendSession(...params);

    dispatch(success());
    dispatch(getSessions())
    dispatch(
      showNotification({
        type: 'success',
        message: 'sessionExtendedSuccessfully',
      })
    );
    Navigation.popToRoot('SessionsScreenId');
  } catch (e) {
    dispatch(failure(e.message));
    dispatch(showNotification({ type: 'error', message: e.message }));
  } finally {
    dispatch(toggleLoader(false));
  }
};
