import React from 'react';
import { View } from 'react-native';
import {
  SceneRendererProps,
  Route,
  NavigationState,
  TabBar,
} from 'react-native-tab-view';

import Text from '@components/Text';

import styles from './styles';
import { Global } from '@styles';

interface Props extends SceneRendererProps {
  navigationState: NavigationState<Route>;
}

const Nav: React.FC<Props> = props => (
  <View style={styles.container}>
    <TabBar
      {...props}
      style={styles.bar}
      tabStyle={Global.py4}
      renderLabel={({ focused, route }) => (
        <Text
          uppercase
          fontWeight="bold"
          fontSize="medium"
          color={focused ? 'dark' : 'secondary'}>
          {route.title}
        </Text>
      )}
      indicatorStyle={styles.indicator}
    />
  </View>
);

export default Nav;
