import React from 'react';
import { StyleSheet, View } from 'react-native';

import screen from '@HOCs/screen';
import Map from '@screens/Map';

const App: React.FC = () => <View style={styles.container}>{screen(Map)}</View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
