import { StyleSheet } from 'react-native';

import { Colors, Flex } from '@styles';

export default StyleSheet.create({
  container: {
    height: 55,
    width: '100%',
    ...Flex.rowCrossCenter,
  },
  contrastContainer: {
    backgroundColor: Colors.Black,
  },
  separator: {
    width: 2,
    height: 24,
    backgroundColor: Colors.Heather,
  },
  contrastSeparator: {
    marginHorizontal: 10,
    backgroundColor: Colors.DoveGray,
  },
  action: {
    padding: 0,
    height: '100%',
    ...Flex.centerFill,
  },
});
