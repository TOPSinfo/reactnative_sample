import { Lot } from '@types';
import {
  GET_LOTS_LOADING,
  GET_LOTS_SUCCESS,
  GET_LOTS_FAILURE,
  GET_LOT_LOADING,
  GET_LOT_SUCCESS,
  GET_LOT_FAILURE,
} from '@consts/actions';

export interface State {
  lots: Lot[];
  error: string | null;
  loading: boolean;
  lotInfoLoading: boolean;
  currentLot: any
}

const initial: State = {
  lots: [],
  error: null,
  loading: false,
  lotInfoLoading: false,
  currentLot: null
};

type Action =
  | { type: typeof GET_LOTS_SUCCESS; payload: Lot[] }
  | { type: typeof GET_LOTS_LOADING; payload: boolean }
  | { type: typeof GET_LOTS_FAILURE; payload: string }
  | { type: typeof GET_LOT_SUCCESS; payload: Lot }
  | { type: typeof GET_LOT_LOADING; payload: boolean }
  | { type: typeof GET_LOT_FAILURE; payload: string };

export default (state = initial, action: Action): State => {
  switch (action.type) {
    case GET_LOTS_SUCCESS:
      return {
        ...state,
        error: null,
        lots: action.payload,
        loading: false,
      };
    case GET_LOTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_LOTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_LOT_SUCCESS:
      const newLots = state.lots.map(value => {
        return value.location.recordID === action.payload.location.recordID
          ? action.payload
          : value;
      });
      return {
        ...state,
        error: null,
        lots: newLots,
        currentLot: action.payload
      };
    case GET_LOT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_LOT_LOADING:
      return {
        ...state,
        lotInfoLoading: action.payload,
      };
    default:
      return state;
  }
};
