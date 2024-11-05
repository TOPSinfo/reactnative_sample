import React from 'react';

import Text from '@components/Text';

import styles from './styles';
import { TouchableOpacityProps } from 'react-native';

export interface LinkProps extends TouchableOpacityProps {
  text: string;
}
const Link: React.FC<LinkProps> = ({ text }) => {
  return (
    <Text fontWeight="bold" color="accent" style={styles.base}>
      {text}
    </Text>
  );
};

export default Link;
