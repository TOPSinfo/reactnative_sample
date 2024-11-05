import { StyleSheet } from 'react-native';

import { Colors, Flex } from '@styles';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    ...Flex.fill,
  },
  content: {
    marginVertical: 30,
  },
});
