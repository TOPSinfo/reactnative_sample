import { Card } from '@types';
import {
  CARDS_CLEAR,
  CARDS_FAILURE,
  CARDS_REQUEST,
  CARDS_SET,
  CARDS_SUCCESS,
  CARD_ADD_REQUEST,
  CARD_ADD_SUCCESS,
  CARD_ADD_FAILURE,
  CARD_DELETE_REQUEST,
  CARD_DELETE_SUCCESS,
  CARD_DELETE_FAILURE,
  CARD_SETDEFAULT_REQUEST,
  CARD_SETDEFAULT_SUCCESS,
  CARD_SETDEFAULT_FAILURE,
} from '@consts/actions';

export interface State {
  value: Card[];
  error: string | null;
}

type Action =
  | { type: typeof CARDS_SET; payload: Card[] }
  | { type: typeof CARDS_CLEAR }
  | { type: typeof CARD_DELETE_REQUEST }
  | { type: typeof CARD_DELETE_SUCCESS; payload: string }
  | { type: typeof CARD_DELETE_FAILURE; payload: string }
  | { type: typeof CARD_SETDEFAULT_REQUEST }
  | { type: typeof CARD_SETDEFAULT_SUCCESS; payload: string }
  | { type: typeof CARD_SETDEFAULT_FAILURE }
  | { type: typeof CARD_ADD_REQUEST }
  | { type: typeof CARD_ADD_SUCCESS; payload: Card }
  | { type: typeof CARD_ADD_FAILURE }
  | { type: typeof CARDS_SUCCESS; payload: Card[] }
  | { type: typeof CARDS_REQUEST }
  | { type: typeof CARDS_FAILURE; payload: string };

const initial: State = {
  value: [],
  error: null,
};

export default (state = initial, action: Action): State => {
  switch (action.type) {
    case CARDS_SET:
      return {
        ...state,
        value: action.payload,
      };
    case CARDS_SUCCESS:
      return {
        ...state,
        value: action.payload,
        error: null,
      };

    case CARDS_REQUEST:
      return {
        ...state,
        error: null,
      };
    case CARDS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CARD_ADD_REQUEST:
      return {
        ...state,
      };
    case CARD_ADD_SUCCESS:
      const [...value] = state.value;

      return {
        ...state,
        value: [action.payload, ...value],
      };
    case CARD_ADD_FAILURE:
      return {
        ...state,
      };
    case CARD_SETDEFAULT_REQUEST:
      return {
        ...state,
      };
    case CARD_SETDEFAULT_SUCCESS:
      return {
        ...state,
        value: state.value.map(card => {
          return {
            ...card,
            isDefault: card.id === action.payload ? '1' : '0',
          };
        }),
      };
    case CARD_SETDEFAULT_FAILURE:
      return {
        ...state,
      };
    case CARD_DELETE_REQUEST:
      return {
        ...state,
      };
    case CARD_DELETE_SUCCESS:
      return {
        ...state,
        value: state.value.filter(card => card.id !== action.payload),
      };
    case CARD_DELETE_FAILURE:
      return {
        ...state,
      };
    case CARDS_CLEAR:
      return initial;
    default:
      return state;
  }
};
