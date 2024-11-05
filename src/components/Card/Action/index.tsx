import React from 'react';
import { StyleProp, ViewStyle, TouchableOpacityProps } from 'react-native';

import Button, { Color } from '@components/Button';

import styles from './styles';

export interface ActionProps {
  label: string;
  color: Color;
  style?: StyleProp<ViewStyle>;
  props?: Omit<TouchableOpacityProps, 'style'>;
}

const Action: React.FC<ActionProps> = ({ label, style, color, props }) => (
  <Button title={label} style={[styles.base, style]} color={color} {...props} />
);

export default Action;
