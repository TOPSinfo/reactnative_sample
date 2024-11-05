import { Vehicle, UpdateVehicle } from '@types';
import {
  VEHICLES_REQUEST,
  VEHICLES_SUCCESS,
  VEHICLES_FAILURE,
  VEHICLE_ADD_REQUEST,
  VEHICLES_SET,
  VEHICLES_CLEAR,
  VEHICLE_EDIT_SUCCESS,
  VEHICLE_EDIT_REQUEST,
  VEHICLE_EDIT_FAILURE,
  VEHICLE_DELETE_REQUEST,
  VEHICLE_DELETE_SUCCESS,
  VEHICLE_DELETE_FAILURE,
  VEHICLE_ADD_SUCCESS,
  VEHICLE_ADD_FAILURE,
} from '@consts/actions';

export interface State {
  value: Vehicle[];
  loading?: boolean;
}

type Action =
  | { type: typeof VEHICLES_REQUEST }
  | { type: typeof VEHICLES_SUCCESS; payload: Vehicle[] }
  | { type: typeof VEHICLES_FAILURE }
  | { type: typeof VEHICLES_SET; payload: Vehicle[] }
  | { type: typeof VEHICLES_CLEAR }
  | { type: typeof VEHICLE_DELETE_REQUEST }
  | { type: typeof VEHICLE_DELETE_SUCCESS; payload: string }
  | { type: typeof VEHICLE_DELETE_FAILURE }
  | { type: typeof VEHICLE_ADD_REQUEST }
  | { type: typeof VEHICLE_ADD_SUCCESS; payload: Vehicle }
  | { type: typeof VEHICLE_ADD_FAILURE }
  | { type: typeof VEHICLE_EDIT_REQUEST }
  | {
      type: typeof VEHICLE_EDIT_SUCCESS;
      payload: { id: string; vehicle: UpdateVehicle };
    }
  | { type: typeof VEHICLE_EDIT_FAILURE };

const initial: State = {
  value: [],
};

export default (state = initial, action: Action): State => {
  switch (action.type) {
    case VEHICLES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VEHICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        value: action.payload,
      };
    case VEHICLES_SET:
      return {
        ...state,
        value: action.payload,
      };
    case VEHICLES_FAILURE:
      return {
        ...initial,
        loading: false,
      };
    case VEHICLE_ADD_REQUEST:
      return {
        ...state,
      };
    case VEHICLE_ADD_SUCCESS:
      const [defaultVehicle, ...value] = state.value;

      return {
        ...state,
        value: defaultVehicle
          ? [defaultVehicle, action.payload, ...value]
          : [action.payload, ...value],
      };
    case VEHICLE_ADD_FAILURE:
      return {
        ...state,
      };
    case VEHICLE_EDIT_REQUEST:
      return {
        ...state,
      };
    case VEHICLE_EDIT_SUCCESS:
      const { id, vehicle } = action.payload;

      return {
        ...state,
        value: state.value.map(item =>
          item.id === id ? { ...item, ...vehicle } : item
        ),
      };
    case VEHICLE_EDIT_FAILURE:
      return {
        ...state,
      };
    case VEHICLE_DELETE_REQUEST:
      return {
        ...state,
      };
    case VEHICLE_DELETE_SUCCESS:
      return {
        ...state,
        value: state.value.filter(veh => veh.id !== action.payload),
      };
    case VEHICLE_DELETE_FAILURE:
      return {
        ...state,
      };
    case VEHICLES_CLEAR:
      return initial;
    default:
      return state;
  }
};
