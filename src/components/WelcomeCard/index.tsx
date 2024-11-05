import React, { useState } from 'react';
import { View } from 'react-native';

import Text from '@components/Text';
import Card from '@components/Card';

import card from '@styles/shared/card';
import style from './styles';
import { useTranslation } from 'react-i18next';

interface Props { }

const WelcomeCard: React.FC<Props> = () => {
  const [showCard, setShowCard] = useState(true);
  const { t } = useTranslation();
  if (!showCard) {
    return null;
  }

  return (
    <Card
      style={style.item}
      showActions
      title={{ value:  t('skipThePayStation'), color: 'secondary' }}
      actions={[
        {
          label: t('okGotIt'),
          color: 'primary',
          props: {
            onPress: () => {
              setShowCard(false);
            },
          },
        },
      ]}
    >
      <View style={card.wrapper}>
        <View style={card.content}>
          <Text color="secondary" style={style.info}>
            {t('welcomeCardMessage')}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default WelcomeCard;
