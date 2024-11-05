import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import Text from '../Text';

import { Colors } from '@styles';
import styles from './styles';

export type Color = keyof typeof colors;

export interface ButtonProps extends TouchableOpacityProps {
  color?: Color;
  icon?: Element | null;
  raised?: boolean;
  rounded?: boolean;
  uppercase?: boolean;
  title?: string | Element | null;
}

const colors = {
  primary: Colors.CuriousBlue,
  secondary: Colors.White,
  danger: Colors.RedDamask,
};

const Button: React.FCWithoutChildren<ButtonProps> = ({
  style,
  icon,
  title,
  color,
  raised,
  rounded,
  disabled,
  uppercase,
  ...props
}) => (
  <TouchableOpacity
    {...props}
    disabled={disabled}
    style={[
      styles.base,
      raised && styles.raised,
      rounded && styles.rounded,
      disabled && styles.disabled,
      style,
      color && { backgroundColor: colors[color] },
    ]}
  >
    {icon && icon}

    {title && typeof title === 'string' ? (
      <Text
        fontWeight="bold"
        uppercase={uppercase}
        style={[icon && styles.withIcon]}
        color={color === 'secondary' ? 'accent' : 'light'}
      >
        {title}
      </Text>
    ) : (
      title
    )}
  </TouchableOpacity>
);

export default Button;
