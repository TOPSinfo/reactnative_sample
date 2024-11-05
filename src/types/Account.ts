import { Card, NewCard, Vehicle, NewVehicle } from '.';

export type BaseContactPreference = 'phone' | 'email';

export type ContactPreference = BaseContactPreference | 'both';

export interface User extends Omit<Account, 'vehicles' | 'cards'> {}

export interface UpdateUser {
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  contactPref?: ContactPreference;
  newPassword?: string;
}

export interface NewAccount {
  email: string;
  newPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  contactPref: BaseContactPreference[];
  cards: NewCard[];
  vehicles: NewVehicle[];
  lprExpress: boolean;
}

export interface AccountData extends Omit<NewAccount, 'contactPref'> {
  contactPref: ContactPreference;
}

export interface Account {
  type: string;
  account: string;
  email: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  phoneNumber: string;
  contactPref: ContactPreference;
  vehicles: null | Vehicle[];
  userType: string;
  cards: Card[];
  newPassword?: string;
  lprExpress: boolean;
  currentPassword?:string;
  language:string;
  id:string;
  deviceToken:string;
}
