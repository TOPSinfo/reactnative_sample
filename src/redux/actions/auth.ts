import { AppThunk } from '@redux/store';
import { createAction } from 'redux-actions';
import AsyncStorage from '@react-native-community/async-storage';

import { User, UpdateUser, ReactivateSignupOverlayPassProps } from '@types';
import AuthService from '@services/AuthService';
import { goToAuth, goHome, goBack, goTo, showOverlay, dismissOverlay } from '@navigation/actions';
import { setVehicles, clearVehicles } from './vehicles';
import { setCards, clearCards } from './cards';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  AUTH_AUTHENTICATE_REQUEST,
  AUTH_AUTHENTICATE_SUCCESS,
  AUTH_AUTHENTICATE_FAILURE,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_UPDATE_REQUEST,
  AUTH_UPDATE_SUCCESS,
  AUTH_UPDATE_FAILURE,
  AUTH_CHANGE_PASSWORD_REQUEST,
  AUTH_CHANGE_PASSWORD_SUCCESS,
  AUTH_CHANGE_PASSWORD_FAILURE,
  AUTH_FORGOT_PASSWORD_REQUEST,
  AUTH_FORGOT_PASSWORD_SUCCESS,
  AUTH_FORGOT_PASSWORD_FAILURE,
  AUTH_DELETE_ACCOUNT_REQUEST,
  AUTH_DELETE_ACCOUNT_SUCCESS,
  AUTH_DELETE_ACCOUNT_FAILURE,
  SET_USER_LANGUAGE_REQUEST,
  SET_USER_LANGUAGE_SUCCESS,
  SET_USER_LANGUAGE_FAILURE,
  REACTIVATE_SIGNUP_ACCOUNT_REQUEST,
  REACTIVATE_SIGNUP_ACCOUNT_SUCCESS,
  REACTIVATE_SIGNUP_ACCOUNT_FAILURE,
  ACCOUNT_REACTIVATION_REQUEST,
  ACCOUNT_REACTIVATION_SUCCESS,
  ACCOUNT_REACTIVATION_FAILURE
} from '@consts/actions';
import { showNotification } from '@redux/actions/notifications';
import { toggleLoader } from '@redux/slices/loader';
import AccountService from '@services/AccountService';
import { ApiError } from '@types';
import { StorageItem } from '@consts/storage';
import { setReactivate, setDeletedUserId } from '@redux/slices/testmode';
import { NavigationScreenIds } from '@consts/navigation';
import messaging from '@react-native-firebase/messaging';


export const login = (
  ...params: Parameters<typeof AuthService.login>
): AppThunk => async dispatch => {
  const request = createAction<void>(AUTH_LOGIN_REQUEST);
  const success = createAction<User>(AUTH_LOGIN_SUCCESS);
  const failure = createAction<string>(AUTH_LOGIN_FAILURE);
  dispatch(setReactivate(false))
  dispatch(setDeletedUserId(null))
  dispatch(request());
  dispatch(toggleLoader(true));

  try {
    const token = await messaging().getToken();
    params.push(token)
    const loginRes = await AuthService.login(...params);
    if (!loginRes) {
      console.warn('ERROR WITH LOGIN', loginRes);
    }
    const { vehicles, cards, ...user } = await AccountService.getMyAccount();
    await AsyncStorage.setItem(StorageItem.Language, user.language);
    dispatch(success(user));
    dispatch(setCards(cards));
    dispatch(setVehicles(vehicles ?? []));
    goHome();
  } catch (e) {
    dispatch(failure((e as Error).message));
    if (e.data.code == 'Deleted') {
      // dispatch(setDeletedUserId(JSON.parse(e.data.context)))
      // dispatch(setReactivate(true))
      showOverlay<ReactivateSignupOverlayPassProps>('OVERLAY_REACTIVATE_SCREEN', {
        dispatch: dispatch,
        userId: JSON.parse(e.data.context)
      })
    }
    dispatch(showNotification({ message: e.message, type: 'error' }));
  } finally {
    dispatch(toggleLoader(false));
  }
};

export const logout = (): AppThunk => async dispatch => {
  const clear = createAction(AUTH_LOGOUT);

  dispatch(toggleLoader(true));

  try {
    await AuthService.logout();

    dispatch(clearCards());
    dispatch(clearVehicles());
    dispatch(clear());

    goToAuth();
  } catch (e) {
    // continue business as usual
    // TODO SHOULD WE LOGOUT IF THE API CALL FAILS?
    console.warn('logOut error', e);
  } finally {
    dispatch(toggleLoader(false));
  }
};

export const authenticate = (): AppThunk => async dispatch => {
  const request = createAction<void>(AUTH_AUTHENTICATE_REQUEST);
  const success = createAction<User>(AUTH_AUTHENTICATE_SUCCESS);
  const failure = createAction<void>(AUTH_AUTHENTICATE_FAILURE);

  dispatch(request());

  try {
    const { vehicles, cards, ...user } = await AuthService.authenticate();
    AsyncStorage.setItem(StorageItem.Language, user.language);
    dispatch(success(user));
    dispatch(setCards(cards));
    dispatch(setVehicles(vehicles ?? []));

    goHome();
  } catch {
    dispatch(failure());
    goToAuth();
  }
};

export const register = (
  ...params: Parameters<typeof AuthService.register>
): AppThunk => async dispatch => {
  const request = createAction<void>(AUTH_REGISTER_REQUEST);
  const success = createAction<void>(AUTH_REGISTER_SUCCESS);
  const failure = createAction<void>(AUTH_REGISTER_FAILURE);

  dispatch(request());
  dispatch(toggleLoader(true));
  // dispatch(setReactivate(false))
  // dispatch(setDeletedUserId(null))

  try {
    await AuthService.register(...params);

    const [account] = params;
    const { email, newPassword } = account;

    dispatch(success());
    dispatch(login(email, newPassword));
  } catch (e) {
    const { code, message, data } = e as ApiError;
    if (e.data.code == 'Deleted') {
      // dispatch(setDeletedUserId(JSON.parse(e.data.context)))
      // dispatch(setReactivate(true))
      showOverlay<ReactivateSignupOverlayPassProps>('OVERLAY_REACTIVATE_SCREEN', {
        dispatch: dispatch,
        userId: JSON.parse(e.data.context)
      })
    }
    let errorMessage = '';

    if (data && data.errors) {
      const errorFields = ['first_name', 'last_name', 'email', 'phone_number'];

      errorFields.forEach(ef => {
        if (data.errors[ef]) {
          errorMessage += data.errors[ef] + '\n';
        }
      });
      errorMessage = errorMessage.trim();
    } else if (data && data.context && data.context === 'phoneNumber') {
      // TODO: SRSLY THIS ERROR FOR UNIQUE PHONE IS NOT HANDLED IN THE NORMAL VALIDATION ON BACKEND LIKE THE OTHERS???  🙃
      errorMessage = data.message;
    } else if (data && data.context && data.context === 'Transaction Not Allowed') {
      // TODO: SRSLY THIS ERROR FOR UNIQUE PHONE IS NOT HANDLED IN THE NORMAL VALIDATION ON BACKEND LIKE THE OTHERS???  🙃
      errorMessage = data.message;
    }else if (data && data.context && data.context === 'Expired Card') {
      // TODO: SRSLY THIS ERROR FOR UNIQUE PHONE IS NOT HANDLED IN THE NORMAL VALIDATION ON BACKEND LIKE THE OTHERS???  🙃
      errorMessage = data.message;
    }else if (
      data &&
      data.context &&
      data.message === 'Invalid Credit Card information.'
    ) {
      // TODO: Another new validation, another new if statement 🙃
      errorMessage = data.context;
    } else if (data && data.code == 'Deleted') {
      errorMessage = data.message;
    }

    // TODO FIX THIS ONCE THE ERROR MESSAGES ARE STANDARDIZED, AND CURRENTLY LEAVING THIS JUST FOR DEBUG
    const notificationMessage = data
      ? errorMessage
      : code >= 400 && code < 500
        ? message
        : 'Something went wrong. Please try again later';

    dispatch(
      showNotification({
        type: 'error',
        message: notificationMessage,
      })
    );
    dispatch(failure());
  } finally {
    dispatch(toggleLoader(false));
  }
};

export const update = (
  ...params: Parameters<typeof AccountService.updateAccount>
): AppThunk => async dispatch => {
  const request = createAction<void>(AUTH_UPDATE_REQUEST);
  const success = createAction<UpdateUser>(AUTH_UPDATE_SUCCESS);
  const failure = createAction<void>(AUTH_UPDATE_FAILURE);

  dispatch(request());
  dispatch(toggleLoader(true));

  try {
    await AccountService.updateAccount(...params);

    const [data] = params;

    dispatch(success(data));
    dispatch(
      showNotification({
        message: 'profileUpdatedSuccessfully',
        type: 'success',
      })
    );
  } catch (e) {
    dispatch(failure());
    dispatch(
      showNotification({ message: e.message ? e.message : 'errorUpdatingProfile', type: 'error' })
    );
  } finally {
    dispatch(toggleLoader(false));
  }
};

export const changePassword = (updatedPassword: any, componentId: any): AppThunk => async dispatch => {
  const request = createAction<void>(AUTH_CHANGE_PASSWORD_REQUEST);
  const success = createAction<void>(AUTH_CHANGE_PASSWORD_SUCCESS);
  const failure = createAction<void>(AUTH_CHANGE_PASSWORD_FAILURE);

  dispatch(request());
  dispatch(toggleLoader(true));

  try {
    await AuthService.changePassword(updatedPassword);

    dispatch(success());
    dispatch(
      showNotification({
        message: 'passwordChangedSuccessfully',
        type: 'success',
      })
    );
    goBack(componentId)
  } catch (e) {
    dispatch(failure());
    dispatch(
      showNotification({ message: e.message ? e.message : 'errorChangingPassword', type: 'error' })
    );
  } finally {
    dispatch(toggleLoader(false));
  }
};

export const forgotPassword = (email: string): AppThunk => async dispatch => {
  const request = createAction<void>(AUTH_FORGOT_PASSWORD_REQUEST);
  const success = createAction<void>(AUTH_FORGOT_PASSWORD_SUCCESS);
  const failure = createAction<void>(AUTH_FORGOT_PASSWORD_FAILURE);

  dispatch(toggleLoader(true));
  dispatch(request());

  try {
    const x = await AuthService.forgotPassword(email);
    dispatch(success());
    dispatch(
      showNotification({
        message: 'emailSentSuccessfully',
        type: 'success',
      })
    );
  } catch (e) {
    dispatch(failure());
    dispatch(
      showNotification({ message: e.message ? e.message : 'errorSendingEmail', type: 'error' })
    );
  } finally {
    dispatch(toggleLoader(false));
  }
};
export const deleteAccount = (email: any): AppThunk => async dispatch => {
  const request = createAction<void>(AUTH_DELETE_ACCOUNT_REQUEST);
  const success = createAction<void>(AUTH_DELETE_ACCOUNT_SUCCESS);
  const failure = createAction<void>(AUTH_DELETE_ACCOUNT_FAILURE);

  dispatch(toggleLoader(true));
  dispatch(request());

  try {
    const x = await AuthService.deleteAccount(email);
    dispatch(success());
    dispatch(logout())
    dispatch(
      showNotification({
        message: 'accountDeleted',
        type: 'success',
      })
    );
  } catch (e) {
    dispatch(failure());
    dispatch(
      showNotification({ message: e.data.message ? e.data.message : 'errorDeleteAccount', type: 'error' })
    );
  } finally {
    dispatch(toggleLoader(false));
  }
};

export const setAppLanguage = (language: any): AppThunk => async dispatch => {
  const request = createAction<void>(SET_USER_LANGUAGE_REQUEST);
  const success = createAction<void>(SET_USER_LANGUAGE_SUCCESS);
  const failure = createAction<void>(SET_USER_LANGUAGE_FAILURE);

  dispatch(toggleLoader(true));
  dispatch(request());

  try {
    const x = await AuthService.updateAppLanguage(language);
    dispatch(success());
    dispatch(
      showNotification({
        message: 'langChangeDone',
        type: 'success',
      })
    );
  } catch (e) {
    dispatch(failure());
    dispatch(
      showNotification({ message: 'langChangeError', type: 'error' })
    );
  } finally {
    dispatch(toggleLoader(false));
  }
};

export const reactivateAccount = (id: string, type: string): AppThunk => async dispatch => {
  const request = createAction<void>(REACTIVATE_SIGNUP_ACCOUNT_REQUEST);
  const success = createAction<void>(REACTIVATE_SIGNUP_ACCOUNT_SUCCESS);
  const failure = createAction<void>(REACTIVATE_SIGNUP_ACCOUNT_FAILURE);

  dispatch(toggleLoader(true));
  dispatch(request());
  try {
    const x = await AuthService.reactivateAccount(id, type);
    dispatch(success());

    dismissOverlay(NavigationScreenIds.OVERLAY_REACTIVATE_SCREEN)
    dispatch(
      showNotification({
        message: x.message ? x.message : 'reactivateMessage',
        type: 'success',
      })
    );
    if (type == 'signin') {
      goTo(NavigationScreenIds.SIGN_IN_SCREEN, 'SIGN_UP_SCREEN', {
        disableSidebar: true,
        props: { title: 'Sign Up' },
      })
    }
  } catch (e) {
    dispatch(failure());
    dispatch(
      showNotification({ message: e.message ? e.message : 'Something went wrong', type: 'error' })
    );
  } finally {
    dispatch(toggleLoader(false));
  }
};

export const accountReactivation = (id: string): AppThunk => async dispatch => {
  const request = createAction<void>(ACCOUNT_REACTIVATION_REQUEST);
  const success = createAction<void>(ACCOUNT_REACTIVATION_SUCCESS);
  const failure = createAction<void>(ACCOUNT_REACTIVATION_FAILURE);

  dispatch(toggleLoader(true));
  dispatch(request());
  try {
    const x = await AuthService.accountReactivation(id);
    dispatch(success());
    dispatch(
      showNotification({
        message: x.message,
        type: 'success',
      })
    );
  } catch (e) {
    dispatch(failure());
    dispatch(
      showNotification({ message: e.message, type: 'error' })
    );
  } finally {
    dispatch(toggleLoader(false));
  }
};
