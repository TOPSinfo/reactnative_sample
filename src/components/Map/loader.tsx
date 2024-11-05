import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

import useParking from '@hooks/useParking';
import Text from '@components/Text';

import Logo from '@assets/pp-logo.svg';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import { StorageItem } from '@consts/storage';

const MapLoader = ({ mapReady }: { mapReady: boolean }) => {
  const { lots } = useParking();
  const [hideLoader, setHideLoader] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const areLotsEmpty = !lots || !lots.length;
  const {t,i18n} = useTranslation()
  useEffect(() => {
    if (areLotsEmpty || !mapReady) {
      fadeAnim.setValue(1);
      setHideLoader(false);
    } else {
      setInitialLanguage()
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setHideLoader(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areLotsEmpty, mapReady]);

  const setInitialLanguage = () => {
    AsyncStorage.getItem(StorageItem.Language)
      .then(res => {
        if (res) {
          i18n.changeLanguage(res);
        }
      })
      .catch(e => {
      });
  };
  if (hideLoader) {
    return null;
  }

  return (
    <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim }]}>
      <Logo />
      <Text style={styles.loadingText}>{t('loadingMap')}</Text>
    </Animated.View>
  );
};

export default MapLoader;
