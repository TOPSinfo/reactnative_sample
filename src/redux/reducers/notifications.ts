import { Notification } from '@types';
import { NOTIFICATION_ADD, NOTIFICATION_REMOVE } from '@consts/actions';

export interface State {
  notifications: Notification[];
}

type Action =
  | { type: typeof NOTIFICATION_ADD; payload: Notification }
  | { type: typeof NOTIFICATION_REMOVE; payload: number };

const initial: State = {
  notifications: [],
};

export default (state = initial, action: Action): State => {
  switch (action.type) {
    case NOTIFICATION_ADD:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case NOTIFICATION_REMOVE:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
