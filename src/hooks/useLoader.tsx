import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import equal from 'fast-deep-equal';

import { loaderSelector } from '@redux/selectors';
import { toggleLoader } from '@redux/slices/loader';

const useLoader = () => {
  const loader = useSelector(loaderSelector, equal);
  const dispatch = useDispatch();

  const actions = useMemo(
    () => ({
      toggleLoader: (...params: Parameters<typeof toggleLoader>) =>
        dispatch(toggleLoader(...params)),
    }),
    [dispatch]
  );

  return {
    ...loader,
    ...actions,
  };
};

export default useLoader;
