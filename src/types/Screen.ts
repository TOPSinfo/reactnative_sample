import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { Vehicle } from './Vehicle';
import { Lot, Rate } from './Parking';
import { NotificationType, Session } from '@types';

export interface ScreenProps {
  componentId: string;
  title?: string | Element;
}

export interface OverlayProps extends ScreenProps {
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export type ScreenPassProps = {
  [key in NotificationType]?: {
    message: string;
  };
} & {
  title?: ScreenProps['title'];
  overlayOptions?: any; // TODO FIX TYPES AFTER DEMO
};

export type VehiclePassProps = ScreenPassProps &
  ({ mode: 'add' } | { mode: 'edit'; vehicleId: string });

export type CardPassProps = ScreenPassProps &
  ({ mode: 'add' } | { mode: 'edit'; cardId: string });

export interface NewSessionPassProps extends ScreenPassProps {
  lotId: string;
  locationData:any;
}

export interface ExtendSessionPassProps extends ScreenPassProps {
  sessionId: string;
}

export interface CheckoutPassProps extends ScreenPassProps {
  lot: Lot;
  rate: Rate;
  vehicle: Vehicle;
}

export interface OverlayItemPickerPassProps extends ScreenPassProps {
  items: Vehicle[];
  onSubmit: (item: Vehicle | null) => void ;
  initialSelectedItem: Vehicle | null;
  fromQR:boolean;
  editVehicle:boolean
}
export interface OverlaySessionPopup extends ScreenPassProps {
  session:any;
  onSubmit: (item: any) => void ;
}

export interface OverlayRatePopupProps extends ScreenPassProps {
  resourseData:any;
  onSubmit: (item: any) => void ;
}
export interface OverlayPopupPassProps extends ScreenPassProps {
  manual_start: "1"| "0";
  onRedirect:any;
  message:string
}
export interface OverlayZoneID extends ScreenPassProps {
  dispatch:any;
  vehicles:any
}

export interface OverlayMessage extends ScreenPassProps {
  onSubmit:any;
  message:string
}

export interface DeleteAccountOverlayPassProps extends ScreenPassProps {
 onDelete:any
}

export interface ReactivateSignupOverlayPassProps extends ScreenPassProps {
  dispatch:any;
  userId:any
 }

export interface InvoicePassProps extends ScreenPassProps {
  session: any;
}

export interface StallScreenProps extends ScreenPassProps {
  stallList:any
}
