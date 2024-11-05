import { StyleSheet } from 'react-native';

import { Flex, Colors } from '@styles';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    padding: 20,
    paddingBottom: 0,
  },
  session: {
    height: 0,
    marginTop: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  remaining: {
    paddingLeft: 20,
    backgroundColor: Colors.White,
    ...Flex.rowCrossCenter,
    ...Flex.mainSpaceBetween,
  },
  inactivePrice: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  priceWrapper: {
    width: 70,
    height: 42,
    // flex:1,
    borderTopLeftRadius: 15,
    backgroundColor: Colors.RedDamask,
    ...Flex.center,
  },
  finalPrice: {
    backgroundColor: Colors.Black,
  },
});
