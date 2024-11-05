export interface Provider {
  type: string;
  recordID: string;
  name: string;
}

export interface Gate {
  type: string;
  direction: string;
  equipment_id: string;
}

export interface SummaryColumn {
  type: string;
  text: string;
}

export interface Rate {
  type: string;
  recordID: string;
  categoryID?: string;
  isValet?: 0 | 1;
  isManual?: boolean;
  offersValidation?: 0 | 1;
  duration?: string;
  cost?: number;
  convenienceFee?: number;
  summary: string;
  summaryColumns?: SummaryColumn[];
}

export interface Location {
  stall_management: number;
  stallRules: string;
  type: string;
  isActive: boolean;
  name: string;
  recordID: string;
  geoPoint: string;
  geoRadius: number;
  onGeofenceEnter: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  needsSpace: boolean;
  onStreet: boolean;
  receiptInstructions: string;
  locationCalloutURL: string;
  locationLogoURL: string;
  provider: Provider;
  needsScan?: boolean;
  gates?: Gate[];
  isLpr: boolean;
  stalls?: any;
  entrygates:any;
  exitgates:any;
  isPrepaid:boolean;
  isSubLot:any;
  Sublot:any;
  manual_start:"1" | "0";
  popup_message:string;
  test_mode:"1" | "0";
  renewnoticetime:any;
  streetParking:"1" | "0";
  streetParkingDesc:string
  
}

export interface OperatingHours {
  day: [{ openingTime: string; closingTime: string }];
}

export interface Validation {
  id: number;
  validationID: string;
  matchLPN: string;
  matchPhone: string;
  validationType: string;
  validationDescription: string;
}
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

export interface Stalls {
  is_manual?: boolean;
  stallID?: string;
}

export interface Lot {
  stall_management: number;
  stallRules: string;
  location: Location;
  rates: Rate[];
  messages?: string[];
  operatingHours?: OperatingHours[];
  validations?: Validation[];
  stalls?: Stalls;
  is_manual?: boolean;
  stallID?: string;
  vehicle?:Vehicle;
  entrygates:any;
  equipment_id:number;
  isSubLot:any;
  isPrepaid?:boolean
}
