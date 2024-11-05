import { StyleSheet } from 'react-native';

import { Colors, Flex } from '@styles';

export default StyleSheet.create({
  icon: {
    width: 60,
    height: 40,
    elevation: 5,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: Colors.White,
    ...Flex.center,
    ...Flex.selfCenter,
  },
});
