import { Navigation } from 'react-native-navigation';
import {LogBox} from 'react-native';
import { goToLoading } from '@navigation/actions';
import { registerScreens, activeScreenSet } from '@navigation';
import AuthService from '@services/AuthService';
import notifee, { AndroidImportance } from '@notifee/react-native'
import messaging from '@react-native-firebase/messaging';
import './src/i18n/index';
import { NavigationScreenIds, NavigationScreenNames } from '@consts/navigation';
LogBox.ignoreAllLogs();

export const active = new Set();
notifee.createChannel({
  id: 'general',
  name: 'General',
  importance: AndroidImportance.HIGH
});
registerScreens();

notifee.onBackgroundEvent(async ({ type, detail }) => { })
messaging().setBackgroundMessageHandler(async (message) => { })

AuthService.setOnAppStartInterceptors();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait'],
    },
    statusBar: {
      backgroundColor: 'white',
      style: 'dark'
    }
  });
  goToLoading();
});


Navigation.events().registerScreenPoppedListener(({ componentId }) => {
  activeScreenSet.delete(componentId);
});
