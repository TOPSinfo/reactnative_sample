import React from 'react';
import { View } from 'react-native';

import CheckIcon from '@assets/check-ico.svg';

import styles from './styles';

interface Props {
  checked: boolean;
}

const CheckIndicator: React.FC<Props> = ({ checked }) => (
  <View style={[styles.base, checked && styles.checked]}>
    <CheckIcon />
  </View>
);

export default CheckIndicator;
