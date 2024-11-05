import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, UIManager, AppState, Platform, Linking } from 'react-native';
import Text from '@components/Text';
import Card from '@components/Card';
import useAuth from '@hooks/useAuth';
import { ScreenProps } from '@types';
import { goTo } from '@navigation/actions';
import ProfileIcon from '@assets/profile-large-ico.svg';

import styles from './styles';
import { Colors, Flex } from '@styles';
import { useTranslation } from 'react-i18next';
import notifee from '@notifee/react-native';
import { showNotification } from '@redux/actions/notifications';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Profile: React.FC<ScreenProps> = ({ componentId }) => {
  const { user, logout } = useAuth();
  const [notificationStatus, setNotificationStatus] = useState<Boolean | null>(null)
  const { t } = useTranslation()
  useEffect(() => {
    checkApplicationPermission()
    const subscription = AppState.addEventListener("change", nextAppState => {
      checkApplicationPermission()
    });

    return () => {
      subscription
    };
  }, [])

  async function checkApplicationPermission() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus) {
      showNotification({ type: 'success', message: 'Notification ' })
      setNotificationStatus(true)
    } else {
      setNotificationStatus(false)
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Card
          showActions
          style={styles.card}
          actions={[
            {
              label: t("changePassword"),
              color: 'primary',
              props: {
                onPress: () =>
                  goTo(componentId, 'CHANGE_PASSWORD_SCREEN', {
                    disableSidebar: true,
                    props: { title: t("changePassword") },
                  })
              },
            },
            {
              label: t("signOut"),
              color: 'danger',
              props: {
                onPress: () => logout(),
              },
            },
          ]}
        >
          <View style={[styles.wrapper]}>
            <View style={[Flex.rowMainCenter, styles.icon]}>
              <ProfileIcon height={88} width={92} />
            </View>
            <Text fontWeight="semiBold" fontSize="h2" style={styles.text}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text
              fontSize="regular"
              style={styles.text}
              fontWeight="mediumBold"
            >
              {user?.email}
            </Text>
            <Text
              fontSize="regular"
              style={styles.text}
              fontWeight="mediumBold"
            >
              {user?.phoneNumber}
            </Text>
          </View>
        </Card>
        {!notificationStatus && <Card style={styles.card}>
          <View style={{
            padding: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex:1
          }}>
            <View style={{width:'70%'}}> 
              <Text fontWeight='bold' fontSize='medium'>Allow access to notification permission</Text>
            </View>
            <TouchableOpacity
              onPress={() => Platform.OS == 'android' ?
                notifee.openNotificationSettings() :
                Linking.openURL('App-Prefs:NOTIFICATIONS_ID&path=com.App')}
              style={{ borderWidth: 1, padding: 5, borderRadius: 5, borderColor: Colors.CuriousBlue }}>
              <Text  color='accent' fontSize='medium' fontWeight='bold'>Turn on</Text>
            </TouchableOpacity>
          </View>
        </Card>}
      </View>
    </>
  );
};

export default Profile;
