import React, { useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import { ScreenProps } from '@types';
import useAuth from '@hooks/useAuth';
import AuthNav from '@components/AuthNav';
import WelcomeCard from '@components/WelcomeCard';
import Map from '@components/Map';
import useResource from '@hooks/useResource';
import useNotifications from '@hooks/useNotifications';
import SessionService from '@services/SessionService';
import LanguageCard from '@components/LanguageCard';
import { useTranslation } from 'react-i18next';
import { accountReactivation } from '@redux/actions/auth';
import { useDispatch } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidStyle } from '@notifee/react-native';
import AuthService from '@services/AuthService';

interface Props { }

const MapScreen: React.FC<ScreenProps> = ({ componentId }) => {
  const { isAuthenticated, user } = useAuth();
  const { showNotification } = useNotifications()
  const { getResource } = useResource();
  const dispatch = useDispatch()
  const { t } = useTranslation()


  useEffect(() => {
    if (isAuthenticated) {
      if (user?.deviceToken == "" || user?.deviceToken == null) {
        messaging().getToken().then((token) => {
          AuthService.uploadDeviceToken({ device_token: token })
        })
      }
    }
    Linking.getInitialURL().then((url) => {
      if (url) {
        _getDeepLinkData({ url })
      }
    }).catch(err => {
      console.error(err);
    });

    const subscribe: any = Linking.addEventListener('url', _getDeepLinkData)
    const unsubscribe = messaging().onMessage(onMessageReceived);

    return () => {
      subscribe.remove()
      unsubscribe()
    }
  }, [])

  async function onMessageReceived(message: any) {
    const notifDisplay: any = {
      title: message.notification.title,
      body: message.notification.body,
      android: {
        channelId: Platform.OS == 'android' ? message.notification.android?.channelId : '',
        style: { type: AndroidStyle.BIGTEXT, text: message.notification.body },
        smallIcon: 'ic_noti'
      }, ios: {
        sound: 'default'
      }
    }
    notifee.displayNotification(notifDisplay);
  }

  const _getDeepLinkData = async ({ url }: any) => {
    const urlParams = url.split('/')
    if (urlParams.includes('ppass.app') && urlParams.includes('reactivate')) {
      const reactivateId = url.split('/reactivate/')
      dispatch(accountReactivation(reactivateId[1]))
    } else {
      if (isAuthenticated && urlParams.includes('ppass.app') && urlParams.includes('loc')) {
        const sessions = await SessionService.getSessions({ filter: 'active' });
        if (sessions) {
          getResource(url, sessions)
        }
      } else {
        showNotification({ type: 'error', message: t('loginToStartParking') })
      }
    }
  }

  return (
    <>
      <Map componentId={componentId} />
      {!isAuthenticated && <WelcomeCard />}
      {!isAuthenticated && <LanguageCard />}
      {!isAuthenticated && <AuthNav componentId={componentId} contrast />}
    </>
  );
};

export default MapScreen as React.FC<Props>;
