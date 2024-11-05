import { createAction } from 'redux-actions';

import { Lot } from '@types';
import { AppThunk } from '@redux/store';
import ParkingLotsService from '@services/ParkingLotsService';
import {
  GET_LOTS_LOADING,
  GET_LOTS_SUCCESS,
  GET_LOTS_FAILURE,
  GET_LOT_LOADING,
  GET_LOT_SUCCESS,
  GET_LOT_FAILURE,
} from '@consts/actions';
import { toggleLoader } from '@redux/slices/loader';

export const getParkingLotsLoading = createAction<boolean>(GET_LOTS_LOADING);

export const getParkingLotsSuccess = createAction<Lot[]>(GET_LOTS_SUCCESS);

export const getParkingLotsFailure = createAction<string>(GET_LOTS_FAILURE);

export const getParkingLotLoading = createAction<boolean>(GET_LOT_LOADING);

export const getParkingLotSuccess = createAction<Lot | null>(GET_LOT_SUCCESS);

export const getParkingLotFailure = createAction<string>(GET_LOT_FAILURE);

export const getParkingLots = (): AppThunk => async dispatch => {
  dispatch(getParkingLotsLoading(true));

  try {
    const locations = await ParkingLotsService.getParkingLocations();
    const lots = locations.map(location => ({ location }));
    dispatch(getParkingLotsSuccess(lots));
  } catch (e) {
    dispatch(getParkingLotsFailure((e as Error).message));
  } finally {
    dispatch(getParkingLotsLoading(false));
  }
};

export const getParkingLotInfo = (
  locationId: string
): AppThunk => async dispatch => {
  dispatch(toggleLoader(true));
  try {
    const lot = await ParkingLotsService.getParkingLocationInfo(locationId);
    dispatch(getParkingLotSuccess(lot));
  } catch (e) {
    dispatch(getParkingLotFailure((e as Error).message));
  } finally {
    dispatch(toggleLoader(false));
  }
};
