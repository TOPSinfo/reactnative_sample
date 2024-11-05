import { StyleSheet } from 'react-native';

import { Colors, Fonts, Flex } from '@styles';

export default StyleSheet.create({
  base: {
    color: Colors.Fiord,
    paddingVertical: 5,
    paddingHorizontal: 0,
    flex: 1,
    ...Fonts.regular,
    ...Fonts.mediumBold,
  },
  focused: {
    borderColor: Colors.CuriousBlue,
  },
  disabled: {
    color: Colors.GrayChateau,
  },
  icon: {
    left: 20,
    position: 'absolute',
  },
  container: {
    borderBottomWidth: 1,
    borderColor: Colors.Heather,
    ...Flex.rowCenter,
  },
  withIcon: {
    paddingLeft: 15,
  },
});
