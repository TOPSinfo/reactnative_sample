import { StyleSheet, Dimensions } from 'react-native';

import { Colors, Flex } from '@styles';

const indicator = 50;
const arrow = 12;

export default StyleSheet.create({
  container: {
    height: 'auto',
    width: 320,
    ...Flex.column,
  },
  wrapper: {
    padding: 20,
    elevation: 1,
    borderRadius: 10,
    backgroundColor: Colors.White,
    ...Flex.rowCrossCenter,
    ...Flex.mainSpaceBetween,
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  address: {
    marginTop: 3,
  },
  indicator: {
    elevation: 1,
    borderWidth: 3,
    width: indicator,
    height: indicator,
    borderColor: Colors.White,
    backgroundColor: Colors.Black,
    borderRadius: indicator / 2,
    ...Flex.columnCenter,
  },
  arrow: {
    elevation: 5,
    width: arrow,
    height: arrow,
    borderWidth: arrow,
    borderColor: 'transparent',
    borderTopColor: Colors.White,
    backgroundColor: 'transparent',
    ...Flex.selfCenter,
  },
});
