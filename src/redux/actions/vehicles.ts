import { createAction } from 'redux-actions';

import { AppThunk } from '@redux/store';
import { Vehicle, NewVehicle, UpdateVehicle } from '@types';
import VehicleService from '@services/VehicleService';
import {
  VEHICLES_REQUEST,
  VEHICLES_SUCCESS,
  VEHICLES_FAILURE,
  VEHICLES_SET,
  VEHICLES_CLEAR,
  VEHICLE_EDIT_SUCCESS,
  VEHICLE_EDIT_REQUEST,
  VEHICLE_EDIT_FAILURE,
  VEHICLE_DELETE_REQUEST,
  VEHICLE_DELETE_SUCCESS,
  VEHICLE_ADD_REQUEST,
  VEHICLE_ADD_SUCCESS,
  VEHICLE_ADD_FAILURE,
} from '@consts/actions';
import { showNotification } from '@redux/actions/notifications';
import { toggleLoader } from '@redux/slices/loader';

export const getVehicles = (): AppThunk => async dispatch => {
  const request = createAction(VEHICLES_REQUEST);
  const success = createAction<Vehicle[]>(VEHICLES_SUCCESS);
  const failure = createAction(VEHICLES_FAILURE);

  dispatch(request());
  dispatch(toggleLoader(true));
  
  try {
    const vehicles = await VehicleService.getAll();
    // dispatch(setVehicles(vehicles ?? []));
    dispatch(success(vehicles instanceof Array ? vehicles : []));
  } catch (e) {
    dispatch(failure());
  }
  finally {
    dispatch(toggleLoader(false));
  }
};

export const removeVehicle = (
  ...params: Parameters<typeof VehicleService.remove>
): AppThunk => async dispatch => {
  const request = createAction<void>(VEHICLE_DELETE_REQUEST);
  const success = createAction<string>(VEHICLE_DELETE_SUCCESS);
  const failure = createAction<void>(VEHICLE_EDIT_FAILURE);

  dispatch(request());
  dispatch(toggleLoader(true));

  try {
    await VehicleService.remove(...params);

    dispatch(success(...params));
    dispatch(
      showNotification({
        message: 'vehicleRemovedSuccessfully',
        type: 'success',
      })
    );
  } catch {
    dispatch(failure());
    dispatch(
      showNotification({ message: 'errorRemovingVehicle', type: 'error' })
    );
  } finally {
    dispatch(toggleLoader(false));
  }
};

export const addVehicle = (
  ...params: Parameters<typeof VehicleService.add>
): AppThunk => async dispatch => {
  const request = createAction<void>(VEHICLE_ADD_REQUEST);
  const success = createAction<NewVehicle & { id: string }>(
    VEHICLE_ADD_SUCCESS
  );
  const failure = createAction<void>(VEHICLE_ADD_FAILURE);

  dispatch(request());
  dispatch(toggleLoader(true));

  try {
    const { id } = await VehicleService.add(...params);
    const [vehicle] = params;

    dispatch(toggleLoader(false));
    dispatch(getVehicles())
    // dispatch(success({ id, ...vehicle }));
    dispatch(
      showNotification({
        message: 'vehicleAddedSuccessfully',
        type: 'success',
      })
    );
  } catch (e) {
    // dispatch(toggleLoader(false));
    dispatch(failure());
    dispatch(
      showNotification({ message:e?.message?e.message: 'errorAddingVehicle', type: 'error' })
    );
  }finally {
    dispatch(getVehicles())
    // dispatch(toggleLoader(false));
  }
};

export const updateVehicle = (
  ...params: Parameters<typeof VehicleService.update>
): AppThunk => async dispatch => {
  const request = createAction(VEHICLE_EDIT_REQUEST);
  const success = createAction<{ id: string; vehicle: UpdateVehicle }>(
    VEHICLE_EDIT_SUCCESS
  );
  const failure = createAction(VEHICLE_EDIT_FAILURE);

  dispatch(request());
  dispatch(toggleLoader(true));

  try {
    await VehicleService.update(...params);

    const [id, vehicle] = params;
    // dispatch(success({ id, vehicle }));
    dispatch(
      showNotification({
        message: 'vehicleUpdatedSuccessfully',
        type: 'success',
      })
    );
  } catch (e) {

    dispatch(failure());
    dispatch(
      showNotification({ message: e.message?e.message:'errorUpdatingVehicle', type: 'error' })
    );
  } finally {
    dispatch(getVehicles())
    // dispatch(toggleLoader(false));
  }
};

export const setVehicles = createAction<Vehicle[]>(VEHICLES_SET);

export const clearVehicles = createAction(VEHICLES_CLEAR);
