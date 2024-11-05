import React, { useState, useRef } from 'react';
import { View, StyleProp, ViewStyle, Animated } from 'react-native';

import Card from '@components/Card';
import useCards from '@hooks/useCards';
import { ScreenProps } from '@types';

import OptionsIcon from '@assets/modify-idle-ico.svg';
import OptionsActiveIcon from '@assets/modify-active-ico.svg';

import card from '@styles/shared/card';
import CreditCardInfo from '@components/CreditCardInfo';

import styles from './styles';
import BaseCheckbox from '@components/Form/BaseCheckbox';
import { useTranslation } from 'react-i18next';

interface Props {
  id: string;
  lastFour: string;
  expirationDate: string;
  isDefault: string;
  style?: StyleProp<ViewStyle>;
  componentId: ScreenProps['componentId'];
  type: string;
}

const CreditCard: React.FC<Props> = ({
  id,
  style,
  lastFour,
  isDefault,
  expirationDate,
  type,
}) => {
  const { removeCard, setDefaultCard } = useCards();
  const [show, setShow] = useState(false);
  const {t} = useTranslation()
  const heightAnimation = useRef(new Animated.Value(0)).current;
  const mBottomAnimation = useRef(new Animated.Value(0)).current;
 
  return (
    <Card
      style={style}
      showActions={show}
      title={
        isDefault === '1'
          ? { value: t('primary').toUpperCase(), color: 'primary' }
          : undefined
      }
      onCollapse={() => {
        Animated.parallel([
          Animated.timing(heightAnimation, {
            toValue: show ? 0 : 35,
            duration: 325,
          }),
          Animated.timing(mBottomAnimation, {
            toValue: show ? 0 : 0,
            duration: 325,
          }),
        ]).start();
        setShow(!show);
      }}
      collapseIcon={show ? <OptionsActiveIcon /> : <OptionsIcon />}
      actions={[
        {
          label: t('delete'),
          color: 'danger',
          props: {
            onPress: () => {
              removeCard(id);
            },
          },
        },
      ]}
    >
      <View style={card.wrapper}>
        <View style={card.content}>
          <CreditCardInfo
            lastFour={lastFour}
            expirationDate={expirationDate}
            type={type}
          />
          <Animated.View
            style={[
              styles.session,
              {
                height: heightAnimation,
                marginBottom: mBottomAnimation,
              },
            ]}
          >
            <BaseCheckbox
              label={t('setAsPrimaryCard')}
              value={isDefault === '1'}
              onPress={() => setDefaultCard(id)}
            />
          </Animated.View>
        </View>
      </View>
    </Card>
  );
};

export default CreditCard;
