import { StyleSheet } from 'react-native';

import { Flex, Colors } from '@styles';
import Fonts from '@styles/Fonts';

export default StyleSheet.create({
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
