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
} from '@consts/actions';
import { NewSession, Session } from '@types';

export interface State {
  value?: Session[];
  history?: Session[];
  loading?: boolean;
  error: string | null;
}

type Action =
  | { type: typeof SESSIONS_REQUEST }
  | { type: typeof SESSIONS_SUCCESS; payload: Session[] }
  | { type: typeof SESSIONS_FAILURE; payload: string }
  | { type: typeof SESSION_HISTORY_REQUEST }
  | { type: typeof SESSION_HISTORY_SUCCESS; payload: Session[] }
  | { type: typeof SESSION_HISTORY_FAILURE; payload: string }
  | { type: typeof START_SESSION_REQUEST }
  | { type: typeof START_SESSION_SUCCESS; payload: NewSession }
  | { type: typeof START_SESSION_FAILURE; payload: string }
  | { type: typeof END_SESSION_REQUEST }
  | { type: typeof END_SESSION_SUCCESS; payload: string }
  | { type: typeof END_SESSION_FAILURE; payload: string }
  | { type: typeof EXTEND_SESSION_REQUEST }
  | { type: typeof EXTEND_SESSION_SUCCESS }
  | { type: typeof EXTEND_SESSION_FAILURE; payload: string };

const initial: State = {
  error: null,
};

export default (state = initial, action: Action): State => {
  switch (action.type) {
    case SESSIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SESSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        value: action.payload,
      };
    case SESSIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SESSION_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SESSION_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        history: action.payload,
      };
    case SESSION_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case START_SESSION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case START_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        // TODO ADD NEW SESSION TO SESSION LIST
      };
    case START_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case END_SESSION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case END_SESSION_SUCCESS:
      // const endSession = state.value?.find(
      //   session => session.recordID === action.payload
      // );
      // const history = state.history ? [...state.history] : [];
      return {
        ...state,
        loading: false,
        // history: endSession ? [endSession, ...history] : state.history,
        value: state.value?.filter(
          session => session.recordID !== action.payload
        )
      };
    case END_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EXTEND_SESSION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EXTEND_SESSION_SUCCESS:
      return {
        ...state,
        // loading: false,
      };
    case EXTEND_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
