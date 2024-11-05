import React, { RefObject } from 'react';
import { Platform } from 'react-native';
import useMount from 'react-use/lib/useMount';

import Marker from './Marker';
import { ScreenProps } from '@types';
import MapView from 'react-native-maps';
import useParking from '@hooks/useParking';
import getCoordinates from '@utils/getCoordinates';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/reducers/root';

interface MarkersProps {
  mapRef: RefObject<MapView | null>;
  componentId: ScreenProps['componentId'];
}

const Markers: React.FC<MarkersProps> = ({ componentId, mapRef }) => {
  const { lots, getLots } = useParking();
  const isTestMode = useSelector((state: RootState) => state.testModeReducer.isTestMode)

  useMount(() => {
    if (!lots || !lots.length) {
      getLots();
    }
  });
  const handleMarkerPress = async (
    id: string,
    latitude: number,
    longitude: number
  ) => {
    if (Platform.OS === 'ios') {
      const camera = await mapRef.current?.getCamera();

      if (camera) {
        camera.center.latitude = latitude;
        camera.center.longitude = longitude;

        mapRef.current?.animateCamera(camera, { duration: 250 });
      }
    }
  };
  return (
    <>
      {lots.map(
        ({ location: { geoPoint, name, address, recordID: id, isLpr, isSubLot, Sublot, manual_start, popup_message, test_mode, streetParking,streetParkingDesc } }, index) => {
          const [latitude, longitude] = getCoordinates(geoPoint);
          if (test_mode === "0" || isTestMode)
            return (
              <Marker
                key={id}
                index={index}
                componentId={componentId}
                lot={{ name, address, id, isLpr, isSubLot, Sublot, manual_start, popup_message, streetParking,streetParkingDesc }}
                coordinate={{ latitude, longitude }}
                onPress={() => handleMarkerPress(id, latitude, longitude)}
              />
            );
        }
      )}
    </>
  );
};

export default Markers;
