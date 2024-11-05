import { useRef, useCallback, MutableRefObject } from 'react';

const useRefCallback = <T extends unknown>(): [
  MutableRefObject<T | null>,
  (node: any) => void
] => {
  const ref = useRef(null);

  const setRef = useCallback(node => {
    ref.current = node;
  }, []);

  return [ref, setRef];
};

export default useRefCallback;
