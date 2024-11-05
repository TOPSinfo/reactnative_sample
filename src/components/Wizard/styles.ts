import { StyleSheet } from 'react-native';

import { Global, Flex, Colors } from '@styles';

export default StyleSheet.create({
  progress: {
    ...Global.gutters,
    ...Flex.rowCenter,
    backgroundColor:Colors.White,
    zIndex:1
  },
  item: {
    flex: 1,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    padding: 5,
    paddingBottom: 10,
  },
  itemActive: {
    borderBottomColor: Colors.Black,
  },
});
