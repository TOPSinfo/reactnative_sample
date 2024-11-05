import React, { useEffect } from 'react';
import { View, Alert, Linking, AppState, Platform, PermissionsAndroid } from 'react-native';
import useMount from 'react-use/lib/useMount';
import messaging from '@react-native-firebase/messaging';

import useAuth from '@hooks/useAuth';

import Logo from '@assets/splash.svg';

import styles from './styles';
import VersionCheck from 'react-native-version-check';
import { useTranslation } from 'react-i18next';
import { StorageItem } from '@consts/storage';
import AsyncStorage from '@react-native-community/async-storage';
import { setLocalLanguage } from '@utils/lang';
import notifee, { AuthorizationStatus } from '@notifee/react-native';
import LogoAnimate from './LogoAnimate';

const Loading: React.FC = () => {
  const { authenticate } = useAuth();
  const { i18n } = useTranslation();

  const constAlert = (url: any) => {
    Alert.alert(
      "App\n",
      "Update required.\nPlease install latest version.",
      [
        { text: "Download", onPress: () => Linking.openURL(Platform.OS == 'android' ? "market://details?id=com.qpmobile" : 'https://itunes.apple.com/app/id1576686758') },
      ],
      { cancelable: false }
    );
  }
  useEffect(() => {
    requestUserPermission()
  }, [])

  async function requestUserPermission() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS')
            .then((res) => {
                console.log('Permission res', res)
            })
            .catch((e) => {
                console.log('Permission err', e)
            })
    } else {
      const settings = await notifee.requestPermission();
      console.log('setting', settings, AuthorizationStatus)
      if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      } else {
        await notifee.requestPermission();
      }
    }
    const token = await messaging().getToken();
    console.log(token)
    // const settings = await notifee.requestPermission();
    // console.log('setting',settings,AuthorizationStatus)
    // if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    // } else {
    //   await notifee.requestPermission();
    // }
  }
  useMount(async () => {
    AppState.addEventListener('change', _handleAppStateChange)
    checkUpdate()
  });

  const setInitialLanguage = () => {
    AsyncStorage.getItem(StorageItem.Language)
      .then(res => {
        if (res) {
          setLocalLanguage(res)
          i18n.changeLanguage(res);
        }
      })
      .catch(e => {
      });
  };

  const checkUpdate = async () => {
    const appUpdate = await VersionCheck.needUpdate()
    if (appUpdate && appUpdate.isNeeded) {
      constAlert(appUpdate.storeUrl)
    } else {
      authenticate();
      setInitialLanguage();
    }
  }

  const _handleAppStateChange = async () => {
    if (AppState.currentState == 'active') {
      const appUpdate = await VersionCheck.needUpdate()
      if (appUpdate && appUpdate.isNeeded) {
        constAlert(appUpdate.storeUrl)
      }
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      {/* <LogoAnimate /> */}
    </View>
  );
};

export default Loading;
