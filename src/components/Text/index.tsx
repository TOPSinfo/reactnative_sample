import React from 'react';
import { Text as BaseText, TextProps } from 'react-native';

import { aligns } from './styles';
import { Colors, Fonts } from '@styles';
import { FontSize, FontWeight } from '@styles/Fonts';

interface Props extends TextProps {
  /** @default regular(16) */
  fontSize?: FontSize;

  /** @default false */
  uppercase?: boolean;

  /** @default normal */
  fontWeight?: FontWeight;

  /** @default primary(Fiord) */
  color?: keyof typeof colors;

  /** @default left */
  align?: keyof typeof aligns;
}

// accent should be tertirary?
const colors = {
  primary: Colors.Fiord,
  secondary: Colors.BaliHai,
  danger: Colors.RedDamask,
  accent: Colors.CuriousBlue,
  light: Colors.White,
  dark: Colors.Black,
  gray: Colors.GrayChateau,
  outerspace:Colors.OuterSpace
};

const Text: React.FC<Props> = ({
  style,
  uppercase,
  align = 'left',
  color = 'primary',
  fontSize = 'regular',
  fontWeight = 'normal',
  ...props
}) => (
  <BaseText
    // allowFontScaling={false}
    style={[
      aligns[align],
      Fonts[fontSize],
      Fonts[fontWeight],
      { color: colors[color] },
      uppercase && Fonts.uppercase,
      style,
    ]}
    {...props}
  />
);

export default Text;
