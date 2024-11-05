import BaseCheckbox from '@components/Form/BaseCheckbox';
import { StorageItem } from '@consts/storage';
import useAuth from '@hooks/useAuth';
import AsyncStorage from '@react-native-community/async-storage';
import { setAppLanguage } from '@redux/actions/auth';
import { Global } from '@styles';
import { setLocalLanguage } from '@utils/lang';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

const LanguageScreen = () => {
  const [language, setLanguage] = useState<'en' | 'fr' | undefined>();
  const { isAuthenticated } = useAuth();
  const { i18n } = useTranslation();
  const dispatch = useDispatch()
  
  useEffect(() => {
    AsyncStorage.getItem(StorageItem.Language)
      .then(res => {
        if (res) {
          setLanguage(res as 'en' | 'fr');
        } else {
          setLanguage('en');
        }
      })
      .catch(() => {
        setLanguage('en');
      });
  }, []);

  const updateLanguage = (lang: 'en' | 'fr') => {
    try {
      const updateLang = {
        "language": lang
      }
      if(isAuthenticated){
        dispatch(setAppLanguage(updateLang))
      }
      AsyncStorage.setItem(StorageItem.Language, lang);
      i18n.changeLanguage(lang);
      setLocalLanguage(lang)
      setLanguage(lang);
    } catch (error) {
    }
  };

  return (
    <View style={Global.mx5}>
      <View style={Global.mt4}>
        <BaseCheckbox
          label="English"
          value={language === 'en'}
          onPress={() => updateLanguage('en')}
        />
      </View>
      <View style={Global.mt4}>
        <BaseCheckbox
          label="Français"
          value={language === 'fr'}
          onPress={() => updateLanguage('fr')}
        />
      </View>
    </View>
  );
};

export default LanguageScreen;
