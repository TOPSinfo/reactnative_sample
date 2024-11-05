import React from 'react';
import { View } from 'react-native';

import Text from '@components/Text';
import { ScreenProps } from '@types';
import Button from '@components/Button';
import { goTo } from '@navigation/actions';
import { useTranslation } from 'react-i18next';

import styles from './styles';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {
    Marker as BaseMarker,
    PROVIDER_GOOGLE,
} from 'react-native-maps';
interface Props {
    componentId: ScreenProps['componentId'];
}

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyDsahuYVbPhLNdAArEgBcvTmR1SWuB_MlM';
const MapDirection: React.FC<Props> = ({ componentId, }) => {
    const { t } = useTranslation();

    return (
        <View style={[styles.container]}>
            <MapView initialRegion={{
                latitude: 37.3318456,
                longitude: -122.0296002,
                latitudeDelta: 25,
                longitudeDelta: 0.058231,
            }}>
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                />
            </MapView>
        </View >
    )
};

export default MapDirection;
