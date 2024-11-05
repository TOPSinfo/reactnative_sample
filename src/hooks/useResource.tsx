import { useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';
import {
  RESOURCE_GET_REQUEST,
  RESOURCE_GET_SUCCESS,
  RESOURCE_GET_FAILURE,
} from '@consts/actions';
import { toggleLoader } from '@redux/slices/loader';
import { goTo, showOverlay } from '@navigation/actions';
import { NewSessionPassProps, OverlayItemPickerPassProps, OverlayRatePopupProps, OverlaySessionPopup, ScreenPassProps } from '@types';
import ResourceService from '@services/ResourceService';
import useVehicles from './useVehicles';
import { startSession, endSession } from '@redux/actions/sessions';
import { showNotification } from '@redux/actions/notifications';
import { NavigationIds } from '@consts/navigation';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const useResource = () => {
  const dispatch = useDispatch();
  const request = createAction<void>(RESOURCE_GET_REQUEST);
  const success = createAction<any>(RESOURCE_GET_SUCCESS);
  const failure = createAction<string>(RESOURCE_GET_FAILURE);
  const { vehicles } = useVehicles();
  const { t } = useTranslation()
  dispatch(request());

  function _startSessionViaQR(resource: any, finalData: any, currentVehicle: any, rate?: string) {
    const sessionData: any = {
      vehicle: {
        type: 'vehicle',
        name:
          currentVehicle! !== undefined
            ? currentVehicle!.name
            : vehicles[0].name,
        licensePlate:
          currentVehicle! !== undefined
            ? currentVehicle!.licensePlate
            : vehicles[0].licensePlate,
      },
      location: {
        type: 'location',
        recordID: resource?.location.recordID,
      },
      rate: {
        recordID: rate ? rate : resource?.rates[0].recordID,
      },
      stalls: {
        is_manual: false,
        stallID: null,
      },
      equipment: {
        recordID: finalData[1],
      },
    };
    dispatch(startSession(sessionData, null));
  }

  function _endSessionViaQR(matchedData: any, finalData: any) {
    if (matchedData.length>0) {
      const endSessionData = {
        equipment: {
          recordID: finalData[1],
        },
      };
      if (matchedData.length > 1) {
        showOverlay<OverlaySessionPopup>('SESSION_OVERLAY', {
          session: matchedData,
          onSubmit: item => {
            dispatch(toggleLoader(true));
            dispatch(endSession(item, endSessionData))
          },
        });
      } else {
        dispatch(toggleLoader(true));
        dispatch(endSession(matchedData[0].recordID, endSessionData));
      }
    } else {
      dispatch(
        showNotification({
          type: 'error',
          message: t('noActiveSessionforGate'),
        })
      );
    }
  }
  const _redirectToSessionScreen = (resource: any) => {
    goTo<NewSessionPassProps>(NavigationIds.MAP_SCREEN, 'NEW_SESSION_SCREEN', {
      disableSidebar: true,
      props: {
        lotId: resource.location.recordID,
        locationData: resource,
        title: t("startParkingSession"),
      },
    });
  };

  const selectRates = (resource: any, finalData: any) => {
    showOverlay<OverlayRatePopupProps>('RATE_OVERLAY', {
      resourseData: resource,
      onSubmit: item => selectVehicle(resource, finalData, item),
    })
  }
  const selectVehicle = (resource: any, finalData: any, rate?: string) => {
    if (vehicles.length > 1) {
      showOverlay<OverlayItemPickerPassProps>('OVERLAY_ITEM_PICKER_SCREEN', {
        items: vehicles,
        initialSelectedItem: vehicles[0],
        onSubmit: item => _startSessionViaQR(resource, finalData, item, rate),
        fromQR: true,
        editVehicle: false
      });
    } else {
      if (vehicles.length == 0) {
        dispatch(
          showNotification({
            type: 'error',
            message: t('addVehicle'),
          })
        )
      } else {
        _startSessionViaQR(resource, finalData, vehicles[0])
      }
    }

  }

  function _checkNewSessionScreen(resource: any) {
    if (resource?.location && resource?.location.recordID) {
      _redirectToSessionScreen(resource);
    } else {
      dispatch(
        showNotification({
          type: 'error',
          message: 'No Location found',
        })
      )
    }
  }
  const actions = {
    getResource: async (qrData: string, sessions: any) => {
      try {
        dispatch(toggleLoader(true));
        if (!qrData.includes('https://ppass.app/loc/')) {
          throw new Error(t('invalidQR'));
        }
        const splitData = qrData.split('/loc/');
        const finalData = splitData[1].split('/');
        const resource = await ResourceService.get(qrData);
        if (resource?.location) {
          if (finalData.length === 2) {
            if (
              resource?.location.entrygates.find(
                (item: any) => item.equipment_id === finalData[1]
              )
            ) {
              if (resource.location?.isPrepaid) {
                selectRates(resource, finalData)
              } else {
                selectVehicle(resource, finalData)
              }
            } else if (
              resource?.location.exitgates.find(
                (item: any) => item.equipment_id === finalData[1]
              )
            ) {
              const matchedData = sessions.filter(
                (_item: any) =>
                  _item.locationInfo.location.recordID ===
                  resource.location.recordID
              );
              _endSessionViaQR(matchedData, finalData);
            } else {
              throw new Error(t('noGateFound'));
            }
          } else {
            _checkNewSessionScreen(resource);
          }
          success(resource);
        } else {
          throw new Error(t('invalidQR'));
        }
      } catch (error) {
        dispatch(
          showNotification({
            type: 'error',
            message: error.message ? error.message : t('invalidQR'),
          })
        );
        dispatch(failure(error.message));
      } finally {
        // dispatch(toggleLoader(false));
      }
    },
  };
  return { ...actions };
};

export default useResource;
