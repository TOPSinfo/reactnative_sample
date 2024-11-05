import React from 'react';
import { View } from 'react-native';

import Text from '@components/Text';
import { ScreenProps } from '@types';
import Button from '@components/Button';
import { goTo } from '@navigation/actions';
import { useTranslation } from 'react-i18next';

import styles from './styles';

interface Props {
  contrast?: boolean;
  componentId: ScreenProps['componentId'];
}

interface TitleProps {
  action: string;
}

export const AuthTitle: React.FC<TitleProps> = ({ action }) => {
  const { t } = useTranslation();

  return(
  <>
    {t(action)} to App
  </>
)};

const AuthNav: React.FC<Props> = ({ componentId, contrast = false }) => {
  const { t } = useTranslation();

  return(
  <View style={[styles.container, contrast && styles.contrastContainer]}>
    <Button
      title={
        <Text uppercase color="accent" fontWeight="bold">
           {t('signIn')}
        </Text>
      }
      style={styles.action}
      onPress={() =>
        goTo(componentId, 'SIGN_IN_SCREEN', {
          disableSidebar: true,
          visibleSidebar: false,
          props: { title: <AuthTitle action="welcomeTo" /> },
        })
      }
    />
    <View style={[styles.separator, contrast && styles.contrastSeparator]} />
    <Button
      title={
        <Text
          uppercase
          fontWeight="bold"
          color={contrast ? 'light' : 'primary'}
        >
          {t('signUp')}
        </Text>
      }
      style={styles.action}
      onPress={() =>
        goTo(componentId, 'SIGN_UP_SCREEN', {
          disableSidebar: true,
          visibleSidebar: false,
          props: { title: <AuthTitle action="signUp" /> },
        })
      }
    /> 
  </View>
)};

export default AuthNav;
