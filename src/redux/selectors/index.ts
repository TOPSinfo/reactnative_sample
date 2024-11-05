import { RootState } from '@redux/reducers/root';

export const parkingLotsSelector = ({ parking }: RootState) => parking;

export const vehiclesSelector = ({
  vehicles: { value, ...rest },
}: RootState) => ({
  vehicles: value,
  defaultVehicle: value.find(v => v.defaultVehicle === 'true'),
  ...rest,
});

export const authSelector = ({ auth }: RootState) => auth;

export const cardsSelector = ({ cards: { value, ...rest } }: RootState) => ({
  cards: value,
  ...rest,
});

export const sessionsSelector = ({
  sessions: { value, ...rest },
}: RootState) => ({
  sessions: value,
  ...rest,
});

export const notificationsSelector = ({ notifications }: RootState) =>
  notifications;

export const loaderSelector = ({ loader }: RootState) => loader;
