import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import equal from 'fast-deep-equal';

import { parkingLotsSelector } from '@redux/selectors';
import { getParkingLotInfo, getParkingLots } from '@redux/actions/parking';

const useParking = () => {
  const dispatch = useDispatch();
  const lots = useSelector(parkingLotsSelector, equal);

  const actions = useMemo(
    () => ({
      getLots: () => dispatch(getParkingLots()),
      getLotInfo: (...params: Parameters<typeof getParkingLotInfo>) =>
        dispatch(getParkingLotInfo(...params)),
    }),
    [dispatch]
  );

  return { ...lots, ...actions };
};

export default useParking;
