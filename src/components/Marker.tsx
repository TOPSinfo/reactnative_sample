import React, { useRef } from 'react';
import { Marker as BaseMarker, MarkerProps } from 'react-native-maps';

import Callout from './Callout';
import { ScreenProps } from '@types';

import PinDefaultIcon from '@assets/pin-default-ico.svg';
import PinLprIcon from '@assets/pin-lpr.svg';
import StreetParking from '@assets/street-parking.svg'

type Lot = {
  id: string;
  name: string;
  address: string;
  isLpr: boolean;
  isSubLot: any;
  Sublot: any;
  manual_start:"1" | "0";
  popup_message:string;
  streetParking: "1" | "0";
  streetParkingDesc: string
};

interface Props extends MarkerProps {
  lot: Lot;
  componentId: ScreenProps['componentId'];
  index:number;
}

const Marker: React.FC<Props> = ({
  lot,
  coordinate,
  componentId,
  index,
  ...props
}) => {
  const markerRef = useRef<any>([])
  return (
    <BaseMarker ref={(ref) => markerRef.current[index] = ref} coordinate={coordinate} tracksViewChanges={false} {...props}>
      {lot.isLpr ? <PinLprIcon /> : lot.streetParking  == "1"?<StreetParking width={40} height={40}/>:<PinDefaultIcon />}
      <Callout index={index} markRef={markerRef.current} componentId={componentId} lot={lot} />
    </BaseMarker>
  );
};

export default Marker;
