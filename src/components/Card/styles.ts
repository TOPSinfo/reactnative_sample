import { StyleSheet } from 'react-native';

import { Colors, Flex } from '@styles';

const radius = 15;

export default StyleSheet.create({
  container: {
    ...Flex.rowCrossCenter,
  },
  collapseIcon: {
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    position: 'absolute',
    ...Flex.center,
  },
  actions: {
    zIndex: 1,
    ...Flex.row,
    backgroundColor: Colors.White,
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
    elevation: 1,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
  },
  actionFirst: {
    borderBottomLeftRadius: radius,
  },
  actionLast: {
    borderBottomRightRadius: radius,
  },
  withActions: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
