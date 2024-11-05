import { StyleSheet } from 'react-native';

import { Colors, Flex } from '@styles';
import Fonts from '@styles/Fonts';

const sizes = {
  qrButton: 45,
  mapButton: 60,
};

export default StyleSheet.create({
  wrapper: {
    ...Flex.fill,
  },
  map: {
    ...Flex.fill,
  },
  mapButton: {
    position: 'absolute',
    zIndex: 1,
    width: sizes.mapButton,
    height: sizes.mapButton,
    backgroundColor: Colors.White,
    ...Flex.center,
  },
  qrButton: {
    right: 25,
    bottom: 30,
    width: sizes.qrButton,
    height: sizes.qrButton,
    borderRadius: sizes.qrButton / 2,
    backgroundColor: Colors.Chambray,
  },
  zoneButton: {
    right: 25,
    bottom: 80,
    width: sizes.qrButton,
    height: sizes.qrButton,
    borderRadius: sizes.qrButton / 2,
    backgroundColor: Colors.Chambray,
  },
  gpsButton: {
    left: 25,
    bottom: 40,
    borderRadius: 30,
  },
  loadingContainer: {
    ...Flex.fill,
    ...Flex.columnCenter,
    backgroundColor: Colors.White,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 5,
    elevation: 5,
  },
  loadingText: {
    marginTop: 20,
    ...Fonts.h2,
  },
});
