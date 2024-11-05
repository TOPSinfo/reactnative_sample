import React from 'react';
import { View } from 'react-native';
import { format, parseISO } from 'date-fns';

import Text from '@components/Text';

import styles from './styles';
import { Flex } from '@styles';

import VisaIcon from '@assets/visa-ico.svg';
import DiscoverIcon from '@assets/discover-ico.svg';
import MasterCardIcon from '@assets/mastercard-ico.svg';
import AmericanExpressIcon from '@assets/american-express-ico.svg';
import { useTranslation } from 'react-i18next';

interface Props {
  lastFour: string;
  expirationDate: string;
  type: string;
}

const cardIconPicker = (type: string) => {
  if (type === 'AmericanExpress') {
    return <AmericanExpressIcon />;
  } else if (type === 'Discover') {
    return <DiscoverIcon />;
  } else if (type === 'Visa') {
    return <VisaIcon />;
  } else if (type === 'MasterCard') {
    return <MasterCardIcon />;
  }
};
const CreditCardInfo: React.FC<Props> = ({
  lastFour,
  expirationDate,
  type,
}) => {
  const {t} = useTranslation()
  return(
  <View style={[Flex.rowCrossCenter, Flex.fill]}>
    <View style={styles.icon}>{cardIconPicker(type)}</View>
    <View style={Flex.fill}>
      <Text fontSize="h4" fontWeight="semiBold">
        **** **** **** {lastFour}
      </Text>
      <Text color="secondary" fontSize="medium">
        {t('expires')} {format(parseISO(expirationDate), 'MM/yy')}
      </Text>
    </View>
  </View>
)}
;

export default CreditCardInfo;
