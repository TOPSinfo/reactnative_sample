import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import equal from 'fast-deep-equal';

import { sessionsSelector } from '@redux/selectors';
import {
  endSession,
  getSessionHistory,
  getSessions,
  startSession,
  extendSession,
  changeActiveVehicle
} from '@redux/actions/sessions';

const useSessions = () => {
  const dispatch = useDispatch();
  const sessions = useSelector(sessionsSelector, equal);

  const actions = useMemo(
    () => ({
      getSessions: () => dispatch(getSessions()),
      getSessionHistory: () => dispatch(getSessionHistory()),
      startSession: (...params: Parameters<typeof startSession>) =>
        dispatch(startSession(...params)),
      endSession: (...params: Parameters<typeof endSession>) =>
        dispatch(endSession(...params)),
      vehicleChange: (...params: Parameters<typeof extendSession>) =>
        dispatch(changeActiveVehicle(params)),
      extendSession: (...params: Parameters<typeof extendSession>) =>
        dispatch(extendSession(...params)),
    }),
    [dispatch]
  );

  return { ...sessions, ...actions };
};

export default useSessions;
