import React, { useState, useMemo, useEffect } from 'react';
import useSessions from '@hooks/useSessions';
import { TabView, Route as BaseRoute, SceneMap } from 'react-native-tab-view';

import Nav from './Nav';

import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers/root';
import { setTabCurrentView } from '@redux/slices/tab';
import { toggleLoader } from '@redux/slices/loader';

interface Route extends BaseRoute {
  scene: React.ComponentType;
}

interface Props {
  initial?: number;
  navigation: Route[];
}

const Tabs: React.FC<Props> = ({ initial, navigation }) => {
  const dispatch = useDispatch()
  const [index, setIndex] = useState(initial ?? 0);
  const { getSessionHistory,getSessions } = useSessions()
  const currentTabView = useSelector((state: RootState) => state.tabReducer.currentTab)

  const [routes, scenes] = useMemo(
    () =>
      navigation.reduce(
        (acc, cur) => {
          const { key, scene, ...rest } = cur;

          acc[0].push({ key, ...rest });
          acc[1][key] = scene;

          return acc;
        },
        [[], {}] as [BaseRoute[], Record<string, React.ComponentType>]
      ),
    [navigation]
  );

  const scene = useMemo(() => SceneMap(scenes), [scenes]);

  function changeTabView(currentTab: any) {
    setIndex(currentTab)
    dispatch(setTabCurrentView(currentTab === 1 ? true : false))
    if (currentTab === 1) {
      getSessionHistory()
    }else{
      getSessions()
    }
  }

  useEffect(() => {
    if (currentTabView) {
      setIndex(1)
    } else {
      setIndex(0)
    }
  }, [currentTabView])

  return (
    <TabView
      lazy={true}
      renderScene={scene}
      onIndexChange={(index) => changeTabView(index)}
      style={styles.container}
      navigationState={{ index, routes }}
      renderTabBar={props => <Nav {...props} />}
    />
  );
};

export default Tabs;
