import { StyleSheet } from 'react-native';

import { Flex } from '@styles';

export default StyleSheet.create({
  container: {
    ...Flex.rowMainCenter,
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  card: {
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
});
