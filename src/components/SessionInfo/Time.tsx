import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { format } from 'date-fns';

import Text from '@components/Text';

import ArrowRightIcon from '@assets/arrow-right-ico.svg';

import styles from './styles';
import { Flex, Global } from '@styles';
import { useTranslation } from 'react-i18next';

interface Props {
  start: Date;
  end: Date | null;
  style?: StyleProp<ViewStyle>;
}

const Time: React.FC<Props> = ({ style, start, end }) => {
  const startTime = format(start, 'hh:mm aa');
  const startDate = format(start, 'EEE, MMM dd yyyy');
  const endTime = end ? format(end, 'hh:mm aa') : '--';
  const endDate = end && format(end, 'EEE, MMM dd yyyy');
  const { t } = useTranslation();

  return (
    <View style={[Flex.fill, Flex.rowCrossCenter, style]}>
      <View style={Flex.fill}>
        <View>
          <Text
            uppercase
            fontSize="small"
            fontWeight="mediumBold"
            style={styles.opaque}
          >
            {t('startTime')}
          </Text>
          <Text allowFontScaling={false} uppercase fontSize="h1" fontWeight="semiBold">
            {startTime}
          </Text>
          <Text allowFontScaling={false}  fontSize="medium" color="secondary">
            {startDate}
          </Text>
        </View>
      </View>
      <View style={[Flex.center, Global.mx2]}>
        <ArrowRightIcon />
      </View>
      <View style={Flex.fill}>
        <View style={Flex.selfEnd}>
          <Text
            uppercase
            fontSize="small"
            fontWeight="mediumBold"
            style={styles.opaque}
          >
            {end ? `${t('endTime')}` : null}
          </Text>
          <Text allowFontScaling={false}  uppercase fontSize="h1" fontWeight="semiBold">
            {endTime}
          </Text>
          <Text allowFontScaling={false}  fontSize="medium" color="secondary">
            {endDate}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Time;
