import { Keyboard, Platform } from 'react-native';
import { Navigation, LayoutBottomTabs, Options } from 'react-native-navigation';

import { ScreenPassProps } from '@types';
import { activeScreenSet } from '@navigation';
import { createBottomTabComponent } from '@utils/createBottomTabComponent';
import {
  NavigationIds,
  NavigationScreens,
  NavigationScreenIds,
  NavigationScreenNames,
} from '@consts/navigation';

import { Colors } from '@styles';

const mapIcon = require('@assets/map_new.png');
const sessionsIcon = require('@assets/time.png');
const profileIcon = require('@assets/person.png');
const carIcon = require('@assets/tabcar.png')
const walletIcon = require('@assets/wallet.png');

const bottomTabs: LayoutBottomTabs = {
  id: NavigationIds.BOTTOM_TABS,
  children: [
    {
      component: createBottomTabComponent({
        id: NavigationIds.MAP_SCREEN,
        name: NavigationScreenNames.MAP,
        icon: Platform.OS == 'android' ? mapIcon : { scale: 2.5, uri: 'map_new' },
      }),
    },
    {
      component: createBottomTabComponent({
        id: NavigationIds.SESSIONS_SCREEN,
        name: NavigationScreenNames.SESSIONS,
        passProps: { title: 'sessions' },
        icon: Platform.OS == 'android' ? sessionsIcon : { scale: 2.5, uri: 'time' },
        // badge:'1'
      }),
    },
    {
      component: createBottomTabComponent({
        id: NavigationIds.VEHICLES_SCREEN,
        name: NavigationScreenNames.VEHICLES,
        passProps: { title: 'myVehicles' },
        icon: Platform.OS == 'android' ? carIcon : { scale: 2.5, uri: 'tabcar' },
        options: {
          iconColor: 'white'
        }
      }),
    },
    {
      component: createBottomTabComponent({
        id: NavigationIds.PAYMENT_SCREEN,
        name: NavigationScreenNames.PAYMENT,
        passProps: { title: 'myWallet' },
        icon: Platform.OS == 'android' ? walletIcon : { scale: 2.5, uri: 'wallet' },
      }),
    },
    {
      component: createBottomTabComponent({
        id: NavigationIds.PROFILE_SCREEN,
        name: NavigationScreenNames.PROFILE,
        passProps: { title: 'profile' },
        icon: Platform.OS == 'android' ? profileIcon : { scale: 2.5, uri: 'person' },
      }),
    },
  ],
  options: {
    bottomTabs: {
      currentTabIndex: 0,
      backgroundColor: Colors.Black,
      titleDisplayMode: 'alwaysHide',
      tabsAttachMode: 'afterInitialTab',
    },
  },
};

export const goHome = () => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        id: NavigationIds.SIDE_MENU,
        left: {
          component: {
            id: NavigationIds.SIDEBAR_SCREEN,
            name: NavigationScreenNames.SIDEBAR,
          },
        },
        center: {
          stack: {
            options: {
              topBar: {
                visible: false,
                drawBehind: true,
              },
            },
            children: [
              {
                bottomTabs,
              } as any,
            ],
          },
        },
        options: {
          sideMenu: {
            left: {},
            //@ts-ignore
            animationType: 'parallax',
            openGestureMode: 'bezel',
          },
          
        },
      },
    },
  });
  // Navigation.setRoot({
  //   root:{
  //     bottomTabs
  //   }
  // })
  activeScreenSet.clear();
};
export const gotoSession = () => {

  if (bottomTabs.options?.bottomTabs?.currentTabIndex != undefined) {
    bottomTabs.options.bottomTabs.currentTabIndex = 1
  }

  Navigation.setRoot({
    root: {
      sideMenu: {
        id: NavigationIds.SIDE_MENU,
        left: {
          component: {
            id: NavigationIds.SIDEBAR_SCREEN,
            name: NavigationScreenNames.SIDEBAR,
          },
        },
        center: {
          stack: {
            options: {
              topBar: {
                visible: false,
                drawBehind: true,
              },
            },
            children: [
              {
                bottomTabs,
              } as any,
            ],
          },
        },
        options: {
          sideMenu: {
            left: {},
            //@ts-ignore
            animationType: 'parallax',
            openGestureMode: 'bezel'
          },
         
        },
      },
    },
  });
  activeScreenSet.clear();
}
export const goBack = (componentId: string, options?: Options) => {
  Keyboard.dismiss();

  return Navigation.pop(componentId, options);
};

export const goTo = <P extends ScreenPassProps>(
  componentId: string,
  screenId: keyof typeof NavigationScreenIds,
  options?: {
    props?: P;
    disableSidebar?: boolean;
    visibleSidebar?: boolean;
  }
) => {
  const id = NavigationIds[screenId];
  if (activeScreenSet.has(id)) {
    return;
  }

  Navigation.push(componentId, {
    component: {
      id,
      name: NavigationScreens[id],
      passProps: options?.props,
      options: {
        sideMenu: {
          left: {
            enabled: !options?.disableSidebar,
            visible: options?.visibleSidebar,
          },
        },
      },
    },
  });

  activeScreenSet.add(id);
};

export const showSidebar = () => {
  Navigation.mergeOptions(NavigationIds.SIDE_MENU, {
    sideMenu: {
      left: {
        visible: true,
        width: Platform.OS === 'ios' ? 325 : undefined,
      },
    },
  });
};

export const hideSidebar = () => {
  Navigation.mergeOptions(NavigationIds.SIDE_MENU, {
    sideMenu: {
      left: {
        visible: false,
        width: undefined,
      },
    },
  });
};

export const goToAuth = () => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        id: NavigationIds.SIDE_MENU,
        left: {
          component: {
            id: NavigationIds.SIDEBAR_SCREEN,
            name: NavigationScreenNames.SIDEBAR,
          },
        },
        center: {
          stack: {
            id: NavigationIds.AUTH,
            children: [
              {
                component: {
                  id: NavigationScreenIds.MAP_SCREEN,
                  name: NavigationScreenNames.MAP,
                },
              },
            ],
            options: {
              topBar: {
                visible: false,
                drawBehind: true,
              },
            },
          },
        },
      },
    },
  });
  activeScreenSet.clear();
};

export const goToLoading = () => {
  Navigation.setRoot({
    root: {
      component: {
        id: NavigationScreenIds.LOADING_SCREEN,
        name: NavigationScreenNames.LOADING,
      },
    },
  });
};

export const showOverlay = <P extends ScreenPassProps>(
  screenId: keyof typeof NavigationScreenIds,
  props?: P
) => {
  const id = NavigationIds[screenId];
  Navigation.showOverlay({
    component: {
      id,

      name: NavigationScreens[id],
      passProps: props,
      options: {
        layout: {
          componentBackgroundColor: 'transparent', // <-- Add this line
        },
        overlay: {
          interceptTouchOutside:
            id !== NavigationIds.NOTIFICATION_OVERLAY_SCREEN,
        },
      },
    },
  });
};

export const dismissOverlay = (componentId: string) => {
  Navigation.dismissOverlay(componentId);
};
