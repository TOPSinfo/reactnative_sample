import React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';

import { Global } from '@styles';

const Container: React.FC<ScrollViewProps> = ({
  children,
  keyboardShouldPersistTaps = 'never',
}) => (
  <ScrollView
    contentContainerStyle={styles.base}
    keyboardShouldPersistTaps={keyboardShouldPersistTaps}
  >
    {children}
  </ScrollView>
);

export default Container;

const styles = StyleSheet.create({
  base: {
    ...Global.gutters,
    paddingVertical: 35,
  },
});
