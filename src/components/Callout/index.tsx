import React from 'react';
import { Alert, Dimensions, View } from 'react-native';
import { Callout as CalloutBase } from 'react-native-maps';
import Text from '@components/Text';
import useAuth from '@hooks/useAuth';
import { goTo, showOverlay } from '@navigation/actions';
import { NewSessionPassProps, OverlayPopupPassProps } from '@types';
import StartParkingArrowIcon from '@assets/start-parking-arrow-ico.svg';

import styles from './styles';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
import { Colors } from '@styles';

var MJCallout = require('react-native-callout');

interface Lot {
  id: string;
  name: string;
  address: string;
  isSubLot: any;
  Sublot: any;
  manual_start: "1" | "0";
  popup_message: string;
  streetParking: "1" | "0";
  streetParkingDesc: string
}

interface Props {
  lot: Lot;
  componentId: string;
  markRef: any,
  index: number,
}

const Callout: React.FC<Props> = ({
  componentId,
  markRef,
  lot: { id, name, address, isSubLot, Sublot, manual_start, popup_message, streetParking, streetParkingDesc },
  index,
}) => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation()

  const _checkAuthShowPopup = () => {
    if (!isAuthenticated) {
      goTo(componentId, 'SIGN_IN_SCREEN', {
        disableSidebar: true,
        props: {
          error: { message: t('signInToAccessLot') },
          title: t('welcomeToApp'),
        },
      });
    } else {
      if (popup_message) {
        showOverlay<OverlayPopupPassProps>('OVERLAY_POPUP', {
          manual_start: manual_start,
          message: popup_message,
          onRedirect: _redirectToSession
        })
      } else {
        _redirectToSession()
      }
    }
    markRef[index]?.hideCallout()
  }

  const _redirectToSession = () => {
    if (isSubLot && Sublot) {
      goTo(componentId, 'LOT_SCREEN', {
        disableSidebar: true,
        props: { lotId: id, title: t('selectParkingLot'), Sublot: Sublot }
      })
    } else {
      goTo<NewSessionPassProps>(componentId, 'NEW_SESSION_SCREEN', {
        disableSidebar: true,
        props: { lotId: id, title: t('startParkingSession'), locationData: null },
      })
    }
  }


  return (
    <CalloutBase tooltip
      onPress={() => _checkAuthShowPopup()}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.info}>
            <Text fontWeight="semiBold" fontSize="h4">
              {name}
            </Text>
            <Text color="secondary" fontSize="medium" style={styles.address}>
              {address}
            </Text>
            {streetParking == '1' &&
              <Text color="accent" fontSize="medium" style={styles.address}>
                {streetParkingDesc}
              </Text>
            }
          </View>
          <View style={styles.indicator}>
            <StartParkingArrowIcon />
          </View>
        </View>
        <View style={styles.arrow} />
      </View>
    </CalloutBase>
  );

};

export default Callout;
