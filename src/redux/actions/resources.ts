import { createAction } from '@reduxjs/toolkit';

import { NewSessionPassProps } from '@types';
import { AppThunk } from '@redux/store';
import {
  RESOURCE_GET_REQUEST,
  RESOURCE_GET_SUCCESS,
  RESOURCE_GET_FAILURE,
} from '@consts/actions';
import ResourceService from '@services/ResourceService';
import { toggleLoader } from '@redux/slices/loader';
import { goTo } from '@navigation/actions';
import { NavigationIds } from '@consts/navigation';
import { vehiclesSelector } from '@redux/selectors';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const getResource = (qrData: string): AppThunk => async dispatch => {
  const request = createAction<void>(RESOURCE_GET_REQUEST);
  const success = createAction<any>(RESOURCE_GET_SUCCESS);
  const failure = createAction<string>(RESOURCE_GET_FAILURE);
  const {t} = useTranslation()
  dispatch(request());
  dispatch(toggleLoader(true));

  try {
    const splitData = qrData.split('/loc/');
    const finalData = splitData[1].split('/')
    const resource = await ResourceService.get(qrData);
      if (resource?.location && resource?.location.recordID) {
        goTo<NewSessionPassProps>(
          'MapScreenId',
          'NEW_SESSION_SCREEN',
          {
            disableSidebar: true,
            props: {
              lotId: resource.location.recordID,
              locationData: resource,
              title:t("startParkingSession") ,
            },
          }
        );
      }
    success(resource);
  } catch (e) {
    dispatch(failure(e.message));
  } finally {
    dispatch(toggleLoader(false));
  }
};
