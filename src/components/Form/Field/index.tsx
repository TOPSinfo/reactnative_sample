import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

import styles from './styles';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const Field: React.FC<Props> = ({ children, style }) => (
  <View style={[styles.base, style]}>{children}</View>
);

export default Field;
