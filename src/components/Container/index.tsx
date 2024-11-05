import React from 'react';
import { ScrollViewProps, ScrollView, View } from 'react-native';

import styles from './styles';
import { Global } from '@styles';

const Container: React.FC<ScrollViewProps> = ({
  style,
  children,
  contentContainerStyle,
  ...rest
}) => (
  <ScrollView
    contentContainerStyle={[Global.gutters, contentContainerStyle]}
    style={[styles.container, style]}
    {...rest}>
    <View style={styles.content}>{children}</View>
  </ScrollView>
);

export default Container;
