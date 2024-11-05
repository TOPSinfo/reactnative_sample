import React from 'react';
import { View } from 'react-native';

import useNotifications from '@hooks/useNotifications';
import withRedux from '@HOCs/withRedux';
import { NotificationCard } from '@components/NotificationCards/index';
import { ScreenProps } from '@types';

const NotificationOverlay: React.FC<ScreenProps> = () => {
  const { notifications, hideNotification } = useNotifications();

  const onClose = (notificationId: number) => {
    hideNotification(notificationId);
  };

  return (
    <View>
      {notifications.map(notification => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}
    </View>
  );
};

export default withRedux(NotificationOverlay);
