import { StyleSheet } from 'react-native';

import { Colors, Global, Flex } from '@styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingVertical: 35,
    ...Global.gutters,
  },
  icon: {
    marginBottom: 15,
    ...Flex.crossCenter,
  },
  center: {
    textAlign: 'center',
  },
  actions: {
    ...Flex.rowCenter,
    marginTop: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BaliHai,
  },
  separator: {
    height: 25,
    borderRightWidth: 1,
    borderRightColor: Colors.Heather,
  },
  link: {
    ...Global.p0,
    ...Flex.selfStart,
    ...Global.mt2,
  },
  back: {
    top: 20,
    left: 5,
    position: 'absolute',
    zIndex: 1,
  },
  stagingText: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
