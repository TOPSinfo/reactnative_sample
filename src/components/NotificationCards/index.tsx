import React, { useState, useRef } from 'react';
import { Text, Animated } from 'react-native';

import { Notification, NotificationType } from '@types';
import useMount from 'react-use/lib/useMount';

import ErrorIcon from '@assets/error-ico.svg';
import WarningIcon from '@assets/warning-ico.svg';
import SuccessIcon from '@assets/success-ico.svg';

import Colors from '@styles/Colors';
import styles from './styles';
import { useTranslation } from 'react-i18next';

interface NotificationCardProps {
  onClose: (notificationId: number) => void;
  notification: Notification;
}

const icon: Record<NotificationType, Element> = {
  error: <ErrorIcon width={40} height={40} />,
  warning: <WarningIcon width={40} height={40} />,
  success: <SuccessIcon width={40} height={40} />,
};

const color: Record<NotificationType, string> = {
  error: Colors.RedDamask,
  success: Colors.Emerald,
  warning: Colors.YellowOrange,
};

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onClose,
}) => {
  const { id, message, type } = notification;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const topAnim = useRef(new Animated.Value(-100)).current;
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useTranslation();


  const showAnimation = Animated.parallel([
    Animated.timing(topAnim, {
      toValue: 0,
      duration: 325,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }),
  ]);

  const hideAnimation = Animated.parallel([
    Animated.timing(topAnim, {
      toValue: -100,
      duration: 325,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }),
  ]);

  const animation = Animated.sequence([
    showAnimation,
    Animated.delay(5000),
    hideAnimation,
  ]);

  useMount(() => {
    if (!isAnimating) {
      animation.start(() => {
        onClose(id);
      });
      setIsAnimating(true);
    }
  });

  const handlePress = () => {
    animation.stop();
    hideAnimation.start(() => {
      onClose(id);
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: color[type] },
        { opacity: fadeAnim, transform: [{ translateY: topAnim }] },
      ]}
      onTouchEnd={() => handlePress()}
    >
      {icon[type]}
      <Text style={styles.message}>{t(message)}</Text>
    </Animated.View>
  );
};
