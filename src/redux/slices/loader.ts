import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '@redux/store';
import { NavigationScreenIds } from '@consts/navigation';
import { showOverlay, dismissOverlay } from '@navigation/actions';

export interface State {
  active: boolean;
}

const slice = createSlice({
  name: 'loader',
  initialState: { active: false } as State,
  reducers: {
    toggle: (_, action: PayloadAction<boolean>) => ({ active: action.payload }),
  },
});

const { toggle } = slice.actions;

export const toggleLoader = (value: boolean): AppThunk => (
  dispatch,
  getState
) => {
  const {
    loader: { active },
  } = getState();

  if (active === value) {
    return;
  }

  dispatch(toggle(value));

  value
    ? showOverlay('LOADER_SCREEN')
    : dismissOverlay(NavigationScreenIds.LOADER_SCREEN);
};

export default slice.reducer;
