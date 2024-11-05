import { StyleSheet } from 'react-native';

import { Colors, Flex } from '@styles';

export default StyleSheet.create({
  base: {
    zIndex: 1,
    height: 70,
    width: '100%',
    paddingHorizontal: 5,
    ...Flex.rowCrossCenter,
    ...Flex.mainSpaceBetween,
  },
  default: {
    elevation: 1,
    backgroundColor: Colors.White,
  },
  landing: {
    position: 'absolute',
  },
  overlay: {
    elevation: 0,
  },
  scrolling: {
    elevation: 1,
  },
  button: {
    zIndex: 1,
  },
  title: {
    left: 5,
    zIndex: 0,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: 70,
  },
});
