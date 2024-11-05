import { StyleSheet } from 'react-native';

export type FontSize =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'small'
  | 'medium'
  | 'regular';

export type FontWeight = 'normal' | 'mediumBold' | 'semiBold' | 'bold';

const medium = 14;
const regular = 16;

const size: Record<FontSize, number> = {
  small: 12,
  medium,
  regular,
  h6: medium,
  h5: regular,
  h4: 18,
  h3: 20,
  h2: 22,
  h1: 24,
};

export default StyleSheet.create({
  normal: {
    fontFamily: 'NeutrifPro-Regular',
  },
  mediumBold: {
    fontFamily: 'NeutrifPro-Medium',
  },
  semiBold: {
    fontFamily: 'NeutrifPro-SemiBold',
  },
  bold: {
    fontFamily: 'NeutrifPro-Bold',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  regular: {
    fontSize: size.regular,
  },
  medium: {
    fontSize: size.medium,
  },
  small: {
    fontSize: size.small,
  },
  h1: {
    fontSize: size.h1,
  },
  h2: {
    fontSize: size.h2,
  },
  h3: {
    fontSize: size.h3,
  },
  h4: {
    fontSize: size.h4,
  },
  h5: {
    fontSize: size.h5,
  },
  h6: {
    fontSize: size.h6,
  },
});
