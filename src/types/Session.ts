import { Vehicle } from './Vehicle';
import { Location, Rate } from './Parking';
import { Validation } from '@types';

export interface Session {
  type: string;
  account: string;
  recordID: string;
  passCode: string;
  startDate: string;
  vehicle: Vehicle;
  locationInfo: {
    type: string;
    messages: string[];
    location: Location;
    extensionRates: boolean;
    rates: Rate[];
  };
  attendantCode: {
    type: string;
    shape: string;
    code: string;
  };
  authStartDate: string;
  localAuthStartDate: string;
  authStopDate: string;
  localAuthStopDate: string;
  currentCharge: string;
  convCharge: string;
  needsCheckout: boolean;
  validation: Validation;
  isPrepaid:boolean;
  equipment:{
    recordID:any
  }
  transaction:any;
  isLpnEdit:any;
  isAutoRenew:any
}

export interface NewSession {
  vehicle: {
    type: string;
    name: string;
    licensePlate: string;
  };
  location: {
    type: string;
    recordID: string;
  };
  rate: {
    recordID: string;
  };
  equipment: {
    // type: string;
    recordID: string | undefined;
  };
  stalls: {
    is_manual?: boolean;
    stallID?: any;
  };
  duration?: any[];
}
