import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';

import withRedux from './withRedux';

import { Colors } from '@styles';

type Wrapper<P extends {}> = (
  component: React.ComponentType<P>
) => React.ComponentType<P>;

const screen = <P extends {}>(
  Component: React.ComponentType<P>,
  ...wrappers: Array<Wrapper<P>>
) => {
  for (const wrapper of [...wrappers]) {
    Component = wrapper(Component);
  }

  return withRedux((props: P) => (
    <>
      <SafeAreaView style={styles.notch} />
      <StatusBar backgroundColor='white' barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Component {...props} />
      </SafeAreaView>
    </>
  ));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
    position: 'relative',
    backgroundColor: Colors.Porcelain,
  },
  notch: {
    flex: 0,
    backgroundColor: Colors.White,
  },
});

export default screen;
