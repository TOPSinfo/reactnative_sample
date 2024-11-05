import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import Text from '@components/Text';
import styles from './styles';

interface Props {
  style?: StyleProp<TextStyle>;
}

const Label: React.FC<Props> = ({ children }) => (
  <Text
    uppercase
    color="primary"
    fontSize="small"
    fontWeight="mediumBold"
    style={styles.base}>
    {children}
  </Text>
);

export default Label;
