import { createAction } from 'redux-actions';

import { Card } from '@types';
import {
  CARDS_SET,
  CARDS_CLEAR,
  CARDS_REQUEST,
  CARDS_SUCCESS,
  CARDS_FAILURE,
  CARD_ADD_REQUEST,
  CARD_ADD_SUCCESS,
  CARD_ADD_FAILURE,
  CARD_DELETE_REQUEST,
  CARD_DELETE_SUCCESS,
  CARD_DELETE_FAILURE,
  CARD_SETDEFAULT_REQUEST,
  CARD_SETDEFAULT_SUCCESS,
  CARD_SETDEFAULT_FAILURE,
} from '@consts/actions';
import { AppThunk } from '@redux/store';
import { toggleLoader } from '@redux/slices/loader';
import { showNotification } from '@redux/actions/notifications';
import PaymentService from '@services/PaymentService';

export const getCards = (): AppThunk => async dispatch => {
  const request = createAction<void>(CARDS_REQUEST);
  const success = createAction<Card[]>(CARDS_SUCCESS);
  const failure = createAction<string>(CARDS_FAILURE);

  dispatch(request());
  dispatch(toggleLoader(true));

  try {
    const cards = await PaymentService.getCreditCards();
    dispatch(success(cards));
  } catch (e) {
    dispatch(failure(e.message));
  } finally {
    dispatch(toggleLoader(false));
  }
};

export const removeCard = (
  ...params: Parameters<typeof PaymentService.removeCreditCard>
): AppThunk => async dispatch => {
  const request = createAction<void>(CARD_DELETE_REQUEST);
  const success = createAction<string>(CARD_DELETE_SUCCESS);
  const failure = createAction<void>(CARD_DELETE_FAILURE);

  dispatch(request());
  dispatch(toggleLoader(true));

  try {
    await PaymentService.removeCreditCard(...params);

    dispatch(success(params[0]));

    dispatch(
      showNotification({
        message: 'cardRemovedSuccessfully',
        type: 'success',
      })
    );
  } catch (e) {
    dispatch(failure());
    dispatch(showNotification({ message: e.message, type: 'error' }));
  } finally {
    dispatch(toggleLoader(false));
  }
};

export const setDefaultCard = (
  ...params: Parameters<typeof PaymentService.setDefaultCreditCard>
): AppThunk => async dispatch => {
  const request = createAction<void>(CARD_SETDEFAULT_REQUEST);
  const success = createAction<string>(CARD_SETDEFAULT_SUCCESS);
  const failure = createAction<void>(CARD_SETDEFAULT_FAILURE);

  dispatch(request());
  dispatch(toggleLoader(true));

  try {
    await PaymentService.setDefaultCreditCard(...params);

    // dispatch(success(params[0]));
    dispatch(getCards())
    dispatch(
      showNotification({
        message: 'setDefaultCardSuccessfully',
        type: 'success',
      })
    );
  } catch (e) {
    dispatch(failure());
    dispatch(
      showNotification({
        message: e.message,
        type: 'error',
      })
    );
  } finally {
    dispatch(toggleLoader(false));
  }
};

export const addCard = (
  ...params: Parameters<typeof PaymentService.addCreditCard>
): AppThunk => async dispatch => {
  const request = createAction<void>(CARD_ADD_REQUEST);
  const success = createAction<Card>(CARD_ADD_SUCCESS);
  const failure = createAction<string>(CARD_ADD_FAILURE);

  dispatch(request());
  dispatch(toggleLoader(true));

  try {
    const newCard = await PaymentService.addCreditCard(...params);

    dispatch(success(newCard));
    
    dispatch(
      showNotification({
        type: 'success',
        message: 'addedCreditCardSuccessfully',
      })
    );
  } catch (e) {
    dispatch(failure(e.message));
    dispatch(showNotification({ type: 'error', message: e.message }));
  } finally {
    dispatch(getCards())
    // dispatch(toggleLoader(false));
  }
};

export const setCards = createAction<Card[]>(CARDS_SET);

export const clearCards = createAction(CARDS_CLEAR);
