import React from 'react';
import { View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import color from 'color';

import Text from '@components/Text';
import { ScreenProps } from '@types';
import Button from '@components/Button';
import { showSidebar, goBack, goTo } from '@navigation/actions';

import Logo from '@assets/pp-logo.svg';
import HamburgerIcon from '@assets/hamburger-ico.svg';
import BackArrowIcon from '@assets/arrow-back-ico.svg';

import styles from './styles';
import { Colors } from '@styles';
import { useTranslation } from 'react-i18next';
import { NavigationScreenIds } from '@consts/navigation';


export type TopBarType = 'default' | 'landing' | 'overlay';

interface Props extends ScreenProps {
  type?: TopBarType;
  scrolling?: boolean;
}

interface ContentProps extends Omit<Props, 'scrolling'> { }

const Content: React.FC<ContentProps> = ({ type, title, componentId }) => {
  const { t } = useTranslation();

  return (
    <>
      <Button
        style={styles.button}
        onPress={() => (type === 'overlay' ? goBack(componentId) : 
        // goTo(NavigationScreenIds.PROFILE_SCREEN, 'PROFILE_EDIT_SCREEN', {
        //   disableSidebar: true,
        //   props: { title: t("editProfile") },
        // }))
        showSidebar())
      }
        icon={type === 'overlay' ? <BackArrowIcon /> : 
        <HamburgerIcon />
        // <Image style={{ height: 30, width: 30 }} source={require('../../assets/user.png')} />
      }
      />
      <View style={styles.title}>
        {type === 'landing' ? (
          <Logo height={70} />
        ) : (
          <Text fontSize="h3" fontWeight="semiBold" color="dark">
            {(typeof title === 'string' ? t(title) : title) || ''}
          </Text>
        )}
      </View>
    </>
  )
};

const TopBar: React.FC<Props> = ({
  type = 'default',
  scrolling = false,
  ...props
}) => {
  switch (type) {
    case 'landing':
      return (
        <LinearGradient
          colors={[
            Colors.White,
            Colors.White,
            color(Colors.White).alpha(0.6).toString(),
            color(Colors.White).alpha(0).toString(),
          ]}
          style={[styles.base, styles.landing]}
        >
          <Content type={type} {...props} />
        </LinearGradient>
      );
    case 'overlay':
      return (
        <View
          style={[
            styles.base,
            styles.default,
            styles.overlay,
            scrolling && styles.scrolling,
          ]}
        >
          <Content type={type} {...props} />
        </View>
      );
    case 'default':
    default:
      return (
        <View style={[styles.base, styles.default]}>
          <Content type={type} {...props} />
        </View>
      );
  }
};

export default TopBar;
