import { StyleSheet } from 'react-native';

import { Flex } from '@styles';

export default StyleSheet.create({
  base: {
    padding: 20,
    ...Flex.rowCenter,
  },
  raised: {
    elevation: 5,
  },
  rounded: {
    borderRadius: 15,
  },
  withIcon: {
    marginLeft: 10,
  },
  disabled: {
    opacity: 0.7,
  },
});
