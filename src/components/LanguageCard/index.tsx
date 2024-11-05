import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import Card from '@components/Card';
import BaseCheckbox from '@components/Form/BaseCheckbox';

import card from '@styles/shared/card';
import { Global } from '@styles';
import style from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { StorageItem } from '@consts/storage';
import { AppLanguage, setLocalLanguage } from '@utils/lang';

interface Props { }

const LanguageCard: React.FC<Props> = () => {
  const [showCard, setShowCard] = useState(true);
  const [language, setLanguage] = useState<'en' | 'fr' | undefined>();
  const { t, i18n } = useTranslation();

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
      AsyncStorage.setItem(StorageItem.Language, lang);
      setLocalLanguage(lang)
      i18n.changeLanguage(lang);
      setLanguage(lang);
    } catch (error) {
    }
  };

  if (!showCard) {
    return null;
  }
  return (
    <Card
      style={style.item}
      showActions
      title={{ value: t('language'), color: 'secondary' }}
      actions={[
        {
          label: 'OK',
          color: 'primary',
          props: {
            onPress: () => {
              updateLanguage(language as 'en' | 'fr'),
                setShowCard(false);
            },
          },
        },
      ]}
    >
      <View style={card.wrapper}>
        <View style={card.content}>
          <View>
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
      </View>
    </Card>
  );
};

export default LanguageCard;
