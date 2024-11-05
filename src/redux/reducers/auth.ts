import { User, UpdateUser } from '@types';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_AUTHENTICATE_REQUEST,
  AUTH_AUTHENTICATE_SUCCESS,
  AUTH_AUTHENTICATE_FAILURE,
  AUTH_LOGOUT,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_UPDATE_REQUEST,
  AUTH_UPDATE_SUCCESS,
  AUTH_UPDATE_FAILURE,
  AUTH_CHANGE_PASSWORD_REQUEST,
  AUTH_CHANGE_PASSWORD_SUCCESS,
  AUTH_CHANGE_PASSWORD_FAILURE,
  AUTH_DELETE_ACCOUNT_REQUEST,
  AUTH_DELETE_ACCOUNT_SUCCESS,
  AUTH_DELETE_ACCOUNT_FAILURE,
} from '@consts/actions';

type LocalState<D = undefined, E = string> =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'resolved'; data?: D }
  | { status: 'rejected'; error?: E };

export interface State {
  user?: User;
  isAuthenticated: boolean;
  signIn: LocalState;
  signUp: LocalState;
  userUpdate: LocalState;
  authentication: LocalState;
  passwordUpdate: LocalState;
  deleteAccount: LocalState;
}

type Action =
  | { type: typeof AUTH_LOGIN_REQUEST }
  | { type: typeof AUTH_LOGIN_SUCCESS; payload: User }
  | { type: typeof AUTH_LOGIN_FAILURE; payload: string }
  | { type: typeof AUTH_AUTHENTICATE_REQUEST }
  | { type: typeof AUTH_AUTHENTICATE_SUCCESS; payload: User }
  | { type: typeof AUTH_AUTHENTICATE_FAILURE; payload: string }
  | { type: typeof AUTH_LOGOUT }
  | { type: typeof AUTH_REGISTER_REQUEST }
  | { type: typeof AUTH_REGISTER_SUCCESS }
  | { type: typeof AUTH_REGISTER_FAILURE; payload: string }
  | { type: typeof AUTH_UPDATE_REQUEST }
  | { type: typeof AUTH_UPDATE_SUCCESS; payload: UpdateUser }
  | { type: typeof AUTH_UPDATE_FAILURE; payload: string }
  | { type: typeof AUTH_CHANGE_PASSWORD_REQUEST }
  | { type: typeof AUTH_CHANGE_PASSWORD_SUCCESS }
  | { type: typeof AUTH_CHANGE_PASSWORD_FAILURE; payload: string }
  | { type: typeof AUTH_DELETE_ACCOUNT_REQUEST; payload: string }
  | { type: typeof AUTH_DELETE_ACCOUNT_SUCCESS; payload: string }
  | { type: typeof AUTH_DELETE_ACCOUNT_FAILURE; payload: string };

const initial: State = {
  isAuthenticated: false,
  signIn: {
    status: 'idle',
  },
  signUp: {
    status: 'idle',
  },
  userUpdate: {
    status: 'idle',
  },
  passwordUpdate: {
    status: 'idle',
  },
  authentication: {
    status: 'idle',
  },
  deleteAccount:{
    status: 'idle'
  }
};

export default (state = initial, action: Action): State => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        signIn: { status: 'pending' },
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        signIn: { status: 'resolved' },
        user: action.payload,
        isAuthenticated: !!action.payload.account,
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...initial,
        signIn: { status: 'rejected', error: action.payload },
      };
    case AUTH_AUTHENTICATE_REQUEST:
      return {
        ...state,
        authentication: {
          status: 'pending',
        },
      };
    case AUTH_AUTHENTICATE_SUCCESS:
      return {
        ...state,
        authentication: {
          status: 'resolved',
        },
        user: action.payload,
        isAuthenticated: !!action.payload.account,
      };
    case AUTH_AUTHENTICATE_FAILURE:
      return {
        ...initial,
        authentication: {
          status: 'rejected',
          error: action.payload,
        },
      };
    case AUTH_LOGOUT:
      return initial;
    case AUTH_REGISTER_REQUEST:
      return {
        ...state,
        signUp: { status: 'pending' },
      };
    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        signUp: { status: 'resolved' },
      };
    case AUTH_REGISTER_FAILURE:
      return {
        ...state,
        signUp: { status: 'rejected', error: action.payload },
      };
    case AUTH_UPDATE_REQUEST:
      return {
        ...state,
        userUpdate: {
          status: 'pending',
        },
      };
    case AUTH_UPDATE_SUCCESS:
      return {
        ...state,
        userUpdate: {
          status: 'resolved',
        },
        user: { ...state.user, ...action.payload } as User,
      };
    case AUTH_UPDATE_FAILURE:
      return {
        ...state,
        userUpdate: {
          status: 'rejected',
          error: action.payload,
        },
      };
    case AUTH_CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        passwordUpdate: {
          status: 'pending',
        },
      };
    case AUTH_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        passwordUpdate: {
          status: 'resolved',
        },
      };
    case AUTH_CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        passwordUpdate: {
          status: 'rejected',
          error: action.payload,
        },
      };
      case AUTH_DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        deleteAccount: {
          status: 'pending',
        },
      };
    case AUTH_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        deleteAccount: {
          status: 'resolved',
        },
      };
    case AUTH_CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        deleteAccount: {
          status: 'rejected',
          error: action.payload,
        },
      };
    default:
      return state;
  }
};
