export interface NewVehicle {
  name: string;
  licensePlate: string;
  defaultVehicle?: string;
}

export interface UpdateVehicle extends Partial<Omit<Vehicle, 'id'>> {}

export interface Vehicle {
  id: string;
  name: string;
  licensePlate: string;
  icon: null | string;
  color: null | string;
  type: string;
  isActive: boolean;
  defaultVehicle: string;
}
