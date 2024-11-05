import { LayoutComponent, OptionsBottomTab } from 'react-native-navigation';

import { ScreenPassProps } from '@types';

import { Colors } from '@styles';

interface Options {
  id: string;
  name: string;
  icon: string;
  options?: OptionsBottomTab;
  passProps?: ScreenPassProps;
  badge?:string
}

const defaultBottomTabOptions: OptionsBottomTab = {
  iconColor: Colors.White,
  selectedIconColor: Colors.CuriousBlue,
};

export const createBottomTabComponent = ({
  id,
  name,
  icon,
  options,
  passProps,
  badge
}: Options): LayoutComponent => ({
  id,
  name,
  passProps,
  options: {
    bottomTab: {
      icon,
      ...defaultBottomTabOptions,
      ...options,
      // badge:badge,
      // badgeColor:Colors.CuriousBlue
    },
  },
});
