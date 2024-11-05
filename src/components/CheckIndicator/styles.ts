import { StyleSheet } from 'react-native';

import { Colors, Flex } from '@styles';

const size = 35;

export default StyleSheet.create({
  base: {
    width: size,
    height: size,
    borderWidth: 1,
    marginRight: 20,
    borderRadius: size / 2,
    borderColor: Colors.Heather,
    backgroundColor: Colors.White,
    ...Flex.center,
  },
  checked: {
    borderColor: Colors.CuriousBlue,
    backgroundColor: Colors.CuriousBlue,
  },
});
