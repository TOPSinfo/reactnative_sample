import { StyleSheet } from 'react-native';
import color from 'color';

import { Colors, Flex, Fonts } from '@styles';

export default StyleSheet.create({
  options: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    borderColor: Colors.Heather,
  },
  option: {
    paddingVertical: 20,
  },
  optionBorder: {
    borderBottomWidth: 2,
    borderBottomColor: color(Colors.BaliHai)
      .alpha(0.1)
      .toString(),
  },
  optionContent: {
    ...Flex.fill,
    ...Flex.rowMainSpaceBetween,
  },
  noRates: {
    marginTop: 30,
    color: Colors.RedDamask,
    ...Fonts.h4,
    ...Flex.center,
  },
  footer: {
    marginTop: 15,
    ...Flex.crossCenter,
  },
});
