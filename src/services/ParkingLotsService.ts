import ApiService from './ApiService';
import { Location, Lot } from '@types';

const ParkingLotsService = {
  getParkingLocations: () => ApiService.get<Location[]>('/1.6/locations'),
  getParkingLocationInfo: (locationId: string) =>
    ApiService.get<Lot>(`/1.6/location/${locationId}`),
};

export default ParkingLotsService;
