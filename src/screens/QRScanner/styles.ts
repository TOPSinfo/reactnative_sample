import { StyleSheet } from 'react-native';

import { Colors, Flex } from '@styles';

export default StyleSheet.create({
  container: {
    ...Flex.fill,
  },
  camera: {
    ...Flex.fill,
  },
  backButton: {
    top: 20,
    right: 20,
    position: 'absolute',
    color:Colors.White
  },
});
