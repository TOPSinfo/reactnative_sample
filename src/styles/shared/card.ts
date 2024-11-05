import { StyleSheet } from 'react-native';

import { Global, Flex } from '@styles';

export default StyleSheet.create({
  item: {
    marginTop: 15,
    ...Global.gutters,
  },
  itemLast: {
    marginBottom: 15,
  },
  wrapper: {
    padding: 20,
    ...Flex.rowCrossFlexStart,
  },
  content: {
    flex: 1,
  },
});
