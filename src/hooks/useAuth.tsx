import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import equal from 'fast-deep-equal';

import { authSelector } from '@redux/selectors';
import {
  login,
  logout,
  authenticate,
  register,
  update,
  changePassword,
  forgotPassword,
  deleteAccount,
  setAppLanguage,
  reactivateAccount,
} from '@redux/actions/auth';

const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector, equal);

  const actions = useMemo(
    () => ({
      login: (...params: Parameters<typeof login>) =>
        dispatch(login(...params)),
      logout: () => dispatch(logout()),
      authenticate: () => dispatch(authenticate()),
      update: (...params: Parameters<typeof update>) =>
        dispatch(update(...params)),
      register: (...params: Parameters<typeof register>) =>
        dispatch(register(...params)),
      changePassword: (...params: Parameters<typeof changePassword>) =>
        dispatch(changePassword(...params)),
      forgotPassword: (...params: Parameters<typeof forgotPassword>) =>
        dispatch(forgotPassword(...params)),
      deleteAccount: (...params: Parameters<typeof deleteAccount>) =>
        dispatch(deleteAccount(...params)),
      setAccountLanguage: (...params: Parameters<typeof setAppLanguage>) =>
        dispatch(setAppLanguage(...params)),
      reactivateCurrentAccount: (...params: Parameters<typeof reactivateAccount>) =>
        dispatch(reactivateAccount(...params)),
    }),
    [dispatch]
  );

  return { ...auth, ...actions };
};

export default useAuth;
