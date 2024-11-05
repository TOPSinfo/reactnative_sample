import { AppThunk } from '@redux/store';
import { createAction } from 'redux-actions';

import { Notification } from '@types';
import { NOTIFICATION_ADD, NOTIFICATION_REMOVE } from '@consts/actions';
import { dismissOverlay, showOverlay } from '@navigation/actions';
import { NavigationIds } from '@consts/navigation';

export const showNotification = (
  notification: Omit<Notification, 'id'>
): AppThunk => (dispatch, getState) => {
  const addNotification = createAction(NOTIFICATION_ADD);
  (notification as Notification).id = Date.now();
  const notifications = getState().notifications.notifications;

  if (notifications.length === 0) {
    showOverlay('NOTIFICATION_OVERLAY_SCREEN');
  }

  dispatch(addNotification(notification));
};

export const hideNotification = (notificationId: number): AppThunk => (
  dispatch,
  getState
) => {
  const removeNotification = createAction(NOTIFICATION_REMOVE);

  const oldNotifications = getState().notifications.notifications;

  dispatch(removeNotification(notificationId));

  const notifications = getState().notifications.notifications;

  /*CHECKING THE PREVIOUS STATE JUST IN CASE THE ACTION GETS CALLED MULTIPLE TIMES AND THE OVERLAY IS ALREADY CLOSED
   (CAUSED BY THE ORIGINAL NOTIFICATION ANIMATION END CALLBACK IS CALLED EVEN IF
   THE ANIMATION IS CANCELED BY PRESSING THE NOTIFICATION, AND THE ON PRESS GENERATES ANOTHER REMOVE ACTION ) */
  if (oldNotifications.length === 1 && notifications.length === 0) {
    dismissOverlay(NavigationIds.NOTIFICATION_OVERLAY_SCREEN);
  }
};
