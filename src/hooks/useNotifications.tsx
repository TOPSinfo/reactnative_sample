import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import equal from 'fast-deep-equal';

import { notificationsSelector } from '@redux/selectors';
import {
  hideNotification,
  showNotification,
} from '@redux/actions/notifications';

const useNotifications = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector(notificationsSelector, equal);

  const actions = useMemo(
    () => ({
      showNotification: (...params: Parameters<typeof showNotification>) =>
        dispatch(showNotification(...params)),
      hideNotification: (...params: Parameters<typeof hideNotification>) =>
        dispatch(hideNotification(...params)),
    }),
    [dispatch]
  );

  return {
    notifications,
    ...actions,
  };
};

export default useNotifications;
