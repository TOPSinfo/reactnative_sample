import React from 'react';
import { View, Linking, Platform } from 'react-native';
import {
  getVersion,
  getDeviceNameSync,
  getModel,
  getSystemVersion,
} from 'react-native-device-info';

import Text from '@components/Text';
import useAuth from '@hooks/useAuth';
import { DeleteAccountOverlayPassProps, ScreenProps } from '@types';
import Button from '@components/Button';
import AuthNav from '@components/AuthNav';
import { goTo, hideSidebar, showOverlay } from '@navigation/actions';
import { NavigationScreenIds } from '@consts/navigation';
import Config from '@config/Config';

import BackArrowIcon from '@assets/arrow-back-ico.svg';
import ProfileIcon from '@assets/profile-large-ico.svg';

import styles from './styles';
import { Global } from '@styles';
import VersionCheck from 'react-native-version-check';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const OS = Platform.OS === 'android' ? 'Android' : 'iOS';

const Sidebar: React.FC<ScreenProps> = () => {
  const { user, isAuthenticated, deleteAccount } = useAuth();
  const { t } = useTranslation();

  const deleteAccountConfirmation = () => {
    hideSidebar()
    showOverlay<DeleteAccountOverlayPassProps>('DELETE_OVERLAY', {
      onDelete: _deleteAccount
    })
  }
  const subject = `App Support : ${user?.account} : ${OS} : ${getVersion()}`;
  const body = [
    `Device: ${getDeviceNameSync()} - ${getModel()} - ${getSystemVersion()}`,
    '- DO NOT EDIT THE SUBJECT AND DEVICE DETAILS -',
    '',
    'Please describe your issue below and we will get back to you as soon as possible.',
    '------------------------------------------',
    '\n'.repeat(3),
  ].join('\n');

  const _deleteAccount = () => {
    const deleteData = {
      "userid": user?.id
    }
    deleteAccount(deleteData)
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={hideSidebar}
        icon={<BackArrowIcon />}
        style={styles.back}
      />
      <View style={styles.icon}>
        <ProfileIcon width={92} height={88} />
      </View>
      <View>
        {!isAuthenticated ? (
          <Text color="secondary" fontSize="medium" style={styles.center}>
            {t('signInOrSignUpToAccessTheFullAppFunctionality')}
          </Text>
        ) : (
          <>
            <Text
              fontSize="h2"
              color="primary"
              fontWeight="semiBold"
              style={[styles.center, Global.mb1]}
            >
              {user?.firstName} {user?.lastName}
            </Text>
            <Text fontWeight="mediumBold" style={styles.center}>
              {user?.email}
            </Text>
          </>
        )}
        <View style={styles.actions}>
          {!isAuthenticated ? (
            <AuthNav componentId={NavigationScreenIds.MAP_SCREEN} />
          ) : (
            <>
              <Button
                onPress={deleteAccountConfirmation}
                title={
                  <Text uppercase fontWeight="bold" color="danger">
                    {t('deleteAccount')}
                  </Text>
                }
              />
            </>
          )}
        </View>
        <View>
          {!isAuthenticated ? null : (
            <>
              <Button
                color="secondary"
                style={styles.link}
                title={
                  <Text
                    color="accent"
                    fontWeight="mediumBold"
                    onPress={() => {
                      goTo(NavigationScreenIds.PROFILE_SCREEN, 'PROFILE_EDIT_SCREEN', {
                        disableSidebar: true,
                        props: { title: t("editProfile") },
                      }),
                        hideSidebar()
                    }}
                  >
                    {t('editProfile')}
                  </Text>
                }
              />
            </>
          )}
          <Button
            color="secondary"
            style={styles.link}
            title={
              <Text
                color="accent"
                fontWeight="mediumBold"
                onPress={() => {
                  Linking.openURL(`mailto:support@App.com?subject=${subject}&body=${body}`),
                    hideSidebar()
                  // goTo(NavigationScreenIds.HELP_SUPPORT_SCREEN, 'HELP_SUPPORT_SCREEN', {
                  //   disableSidebar: true,
                  //   props: { title: 'Help & Support' },
                  // })
                }}
              >
                {t('contactAppHelp&Support')}
              </Text>
            }
          />
          <Button
            color="secondary"
            style={styles.link}
            title={
              <Text
                color="accent"
                fontWeight="mediumBold"
                onPress={() => {
                  Linking.openURL('https://App.com/'),
                    hideSidebar()
                }}>
                {t('visitTheAppWebsite')}
              </Text>
            }
          />
          <Button
            style={styles.link}
            color="secondary"
            title={
              <Text
                color="accent"
                fontWeight="mediumBold"
                onPress={() => {
                  goTo(
                    NavigationScreenIds.MAP_SCREEN,
                    'TERMS_AND_CONDITIONS_SCREEN',
                    {
                      props: { title: t("termsAndConditions") },
                      disableSidebar: false,
                      visibleSidebar: false,
                    }
                  ),
                    hideSidebar()
                }}>
                {t('termsAndConditions')}
              </Text>
            }
          />
          <Button
            style={styles.link}
            color="secondary"
            title={
              <Text
                color="accent"
                fontWeight="mediumBold"
                onPress={() => {
                  goTo(
                    NavigationScreenIds.MAP_SCREEN, 'LANGUAGE_SCREEN',
                    {
                      props: { title: 'language' },
                      disableSidebar: false,
                      visibleSidebar: false,
                    }
                  ),
                    hideSidebar()
                }}>
                {t('language')}
              </Text>
            }
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={{ textAlign: 'center' }} fontSize={'h6'}>©{moment().year()} <Text onPress={() => Linking.openURL('https://locomobiworld.com')} color='accent' fontSize={'h6'}>Locomobi World Inc.</Text></Text>
        <Text style={{ textAlign: 'center' }} fontSize={'small'}>USA Patent 9,286,773</Text>
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 5 }}>
          <Text fontSize={'small'}>
            {Config.apiUrl == 'https://api-v2staging.App.com'
              ? "beta "
              : ''}
          </Text>
          <Text fontSize={'small'} style={{ textAlign: 'center' }}>v{VersionCheck.getCurrentVersion()}</Text>
        </View>
      </View>
    </View>
  );
};

export default Sidebar;
