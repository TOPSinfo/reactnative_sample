import { StyleSheet } from 'react-native';

import { Colors, Global } from '@styles';

export default StyleSheet.create({
  container: {
    elevation: 1,
    backgroundColor: Colors.White,
    ...Global.gutters,
  },
  bar: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: 'transparent',
  },
  indicator: {
    backgroundColor: Colors.Black,
  },
});
