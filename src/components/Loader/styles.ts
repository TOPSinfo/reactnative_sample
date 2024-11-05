import { StyleSheet } from 'react-native';
import color from 'color';

import { Colors, Flex, Global } from '@styles';

export default StyleSheet.create({
  container: {
    ...Flex.centerFill,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 5,
    position: 'absolute',
    backgroundColor: color(Colors.White)
      .alpha(0.75)
      .toString(),
  },
  wrapper: {
    ...Global.p4,
    elevation: 2,
    borderRadius: 15,
    backgroundColor: Colors.White,
  },
});
