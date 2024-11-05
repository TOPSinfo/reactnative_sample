import { StyleSheet } from 'react-native';

import { Flex, Colors } from '@styles';

export default StyleSheet.create({
  container: {
    ...Flex.fill,
    ...Flex.columnCenter,
    backgroundColor: Colors.White,
  },
});
