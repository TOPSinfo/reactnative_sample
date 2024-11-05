import range from 'lodash/range';

const date = new Date();

export const CurrentMonth = date.getMonth();
export const CurrentYear = date.getFullYear();
export const Next10Years = range(CurrentYear, CurrentYear + 10).map(String);
