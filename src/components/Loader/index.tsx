import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import styles from './styles';
import { Colors } from '@styles';

const Loader: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.wrapper}>
      <ActivityIndicator color={Colors.CuriousBlue} size="large" />
    </View>
  </View>
);

export default Loader;
