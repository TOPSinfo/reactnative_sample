import React, { useMemo, useRef, useState } from 'react';
import MapView, {
  Marker as BaseMarker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { PermissionsAndroid, View, Linking, Alert, Platform, TouchableOpacity } from 'react-native';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import Button from '@components/Button';
import { goTo, showOverlay } from '@navigation/actions';
import TopBar from '@components/TopBar';
import { ScreenProps,OverlayZoneID } from '@types';
import GPSLocationIcon from '@assets/gps-pin-ico.svg';
import QRCodeIcon from '@assets/qr-code-ico.svg';
import TargetIcon from '@assets/target-ico.svg';
import MapStyle from '@consts/map-style';
import styles from './styles';
import Markers from '@components/Markers';
import MapLoader from '@components/Map/loader';
import useAuth from '@hooks/useAuth';
import Text from '@components/Text';
import { showNotification } from '@redux/actions/notifications';
import { useDispatch } from 'react-redux';
import useVehicles from '@hooks/useVehicles';

interface TitleProps {
  action: string;
}

export const AuthTitle: React.FC<TitleProps> = ({ action }) => (
  <>
    {action} to App
  </>
);

const Map: React.FC<ScreenProps> = ({ componentId }) => {
  const ref = useRef<MapView | null>(null);
  const [userLocation, setUserLocation] = useState<GeoPosition | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const { isAuthenticated } = useAuth()
  const { vehicles } = useVehicles();
  const dispatch = useDispatch()


  /**
   * Checks and requests location permission on iOS devices.
   *
   * This function requests location authorization from the user. Depending on the user's response,
   * it handles the different states of the permission:
   * - If permission is granted, it returns `true`.
   * - If permission is denied, it shows an alert prompting the user to go to settings to allow location access.
   * - If location services are disabled, it shows an alert prompting the user to enable location services in settings.
   *
   * @returns {Promise<boolean>} A promise that resolves to `true` if permission is granted, otherwise `false`.
   */
  const hasPermissionIOS = async () => {
    const status = await Geolocation.requestAuthorization('whenInUse');
    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert(
        `App`,
        'Allow app to access location service',
        [
          { text: 'Go to Settings', onPress: () => Linking.openSettings() },
          { text: "Don't Use Location", onPress: () => { } },
        ],
      );
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow App to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: () => Linking.openURL('App-Prefs:Privacy&path=LOCATION') },
          { text: "Don't Use Location", onPress: () => { } },
        ],
      );
    }

    return false;
  };

  /**
   * Checks and requests location permission for the application.
   * 
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the location permission is granted.
   * 
   * @remarks
   * - On iOS, it checks for location permission using `hasPermissionIOS`.
   * - On Android versions below 23, it assumes permission is granted.
   * - On Android versions 23 and above, it checks and requests location permission using `PermissionsAndroid`.
   * 
   * @throws {Error} If there is an issue with checking or requesting permissions.
   * 
   * @example
   * const permissionGranted = await hasLocationPermission();
   * if (permissionGranted) {
   *   // Proceed with location-based functionality
   * } else {
   *   // Handle the lack of permission
   * }
   */
  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      dispatch(showNotification({
        type: 'error',
        message: 'Location permission denied by user.'
      }))

    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {

      Alert.alert(
        `App`,
        'Allow app to access location service.',
        [
          { text: 'Go to Settings', onPress: () => Linking.openSettings() },
          { text: "Don't Use Location", onPress: () => { } },
        ],
      );

    }

    return false;
  };

  /**
   * Asynchronously retrieves the user's current location if location permissions are granted.
   * If permissions are not granted, the function will return early.
   * 
   * Utilizes the Geolocation API to get the current position and updates the user's location state.
   * Animates the map camera to center on the user's current location with a specified zoom level.
   * 
   * If an error occurs while retrieving the location, a notification with the error code and message is dispatched.
   * 
   * @returns {Promise<void>} A promise that resolves when the location retrieval and map update are complete.
   */
  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();
    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setUserLocation(position);
        ref.current?.animateCamera(
          {
            center: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            zoom: 15,
          },
          {
            duration: 1000,
          }
        );
      },
      (error) => {
        dispatch(
          showNotification({
            type: 'error',
            message: `Code ${error.code} ${error.message}`,
          }))
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };


  const renderMap = useMemo(
    () => (
      <MapView
        ref={ref}
        initialRegion={{
          latitude: 43.4743201,
          longitude: -80.5376465,
          latitudeDelta: 25,
          longitudeDelta: 0.058231,
        }}
        style={styles.map}
        toolbarEnabled={false}
        customMapStyle={MapStyle}
        provider={PROVIDER_GOOGLE}
        onMapReady={() => setMapReady(true)}
      >
        <Markers componentId={componentId} mapRef={ref} />
        {userLocation && (
          <BaseMarker
            key="userLocation"
            tracksViewChanges={false}
            title={`${userLocation.coords.latitude.toFixed(2)},${userLocation.coords.longitude.toFixed(2)}`}
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
          >
            <GPSLocationIcon width={20} height={20} />
          </BaseMarker>
        )}
      </MapView>
    ),
    [componentId, userLocation]
  );

  return (
    <View style={styles.wrapper}>
      {renderMap}
      <Button
        raised
        icon={<QRCodeIcon height={22} width={22} />}
        style={[styles.mapButton, styles.qrButton]}
        onPress={() =>
          !isAuthenticated ?
            goTo(componentId, 'SIGN_IN_SCREEN', {
              disableSidebar: true,
              visibleSidebar: false,
              props: { title: <AuthTitle action="Welcome" /> },
            }) :
            goTo(componentId, 'QR_SCANNER_SCREEN', { disableSidebar: true })
        }
      />
      <TouchableOpacity
        onPress={() =>
          !isAuthenticated ?
            goTo(componentId, 'SIGN_IN_SCREEN', {
              disableSidebar: true,
              visibleSidebar: false,
              props: { title: <AuthTitle action="Welcome" /> },
            }) :
            showOverlay<OverlayZoneID>('ZONEID_POPUP',{
              dispatch:dispatch,
              vehicles:vehicles
            })
        }
        style={[styles.mapButton, styles.zoneButton]}>
        <Text color={'light'} fontSize='small'>####</Text>
      </TouchableOpacity>
      <Button
        raised
        icon={<TargetIcon />}
        onPress={getLocation}
        style={[styles.mapButton, styles.gpsButton]}
      />
      <TopBar type="landing" componentId={componentId} />
      <MapLoader mapReady={mapReady} />
    </View>
  );
};

export default Map;
