import { StyleSheet } from 'react-native';

import { Flex } from '@styles';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    ...Flex.fill,
    ...Flex.center,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
  },
  message: {
    lineHeight: 24,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
  },
});
