import { StyleSheet } from 'react-native';
import Colors from '@styles/Colors';
import Fonts from '@styles/Fonts';
import Flex from '@styles/Flex';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: 20,
    minHeight: 70,
    zIndex: 100,
    elevation: 10,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    ...Flex.crossCenter,
    padding: 20,
    borderRadius: 12,
  },
  message: {
    ...Fonts.mediumBold,
    ...Fonts.h6,
    color: Colors.White,
    marginLeft: 10,
    flex: 1,
  },
});
