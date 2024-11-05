import { useDispatch, useSelector } from 'react-redux';
import equal from 'fast-deep-equal';

import { cardsSelector } from '@redux/selectors';
import { useMemo } from 'react';
import {
  addCard,
  getCards,
  removeCard,
  setDefaultCard,
} from '@redux/actions/cards';

const useCards = () => {
  const dispatch = useDispatch();
  const cards = useSelector(cardsSelector, equal);

  const actions = useMemo(
    () => ({
      addCard: (...params: Parameters<typeof addCard>) =>
        dispatch(addCard(...params)),
      removeCard: (...params: Parameters<typeof removeCard>) =>
        dispatch(removeCard(...params)),
      setDefaultCard: (...params: Parameters<typeof setDefaultCard>) =>
        dispatch(setDefaultCard(...params)),
      getCards: () => dispatch(getCards()),
    }),
    [dispatch]
  );

  return { ...cards, ...actions };
};

export default useCards;
