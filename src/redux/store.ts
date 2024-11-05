import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer, { RootState } from './reducers/root';
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default configureStore({ reducer: rootReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
}) });
