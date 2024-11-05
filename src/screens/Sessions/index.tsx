import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { useNavigationComponentDidAppear, useNavigationComponentDidDisappear, useNavigationBottomTabSelect } from 'react-native-navigation-hooks';

import Tabs from '@components/Tabs';
import { ScreenProps } from '@types';
import SessionsList from '@screens/Sessions/SessionsList';
import useSessions from '@hooks/useSessions';

import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { setTabCurrentView } from '@redux/slices/tab';
import { RootState } from '@redux/reducers/root';
import { useTranslation } from 'react-i18next';

interface Props { }
const Sessions: React.FC<ScreenProps> = ({ componentId }) => {
  const { sessions, getSessions, history } = useSessions();
  const dispatch = useDispatch()
  const currentTabView = useSelector((state: RootState) => state.tabReducer.currentTab)
  const { t } = useTranslation();

  // suggestion: refetch on pull-to-refresh instead on appear
  useNavigationComponentDidAppear(() => {
    if (!currentTabView) {
      getSessions();
    }
  }, componentId);

  useNavigationComponentDidDisappear(() => {
    dispatch(setTabCurrentView(false))
  }, componentId)
  return (
    <Tabs
      navigation={[
        {
          key: 'active',
          title: t('active'),
          scene: () => (
            <View style={styles.content}>
              <SessionsList
                sessions={sessions}
                active={true}
                componentId={componentId}
              />
            </View>
          ),
        },
        {
          key: 'history',
          title: t('history'),
          scene: () => (
            <View style={styles.content}>
              <SessionsList
                sessions={history}
                active={false}
                componentId={componentId}
              />
            </View>
          ),
        },
      ]}
    />
  );
};

export default Sessions as React.FC<Props>;
