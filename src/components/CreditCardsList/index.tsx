import React from 'react';
import { View } from 'react-native';

import VisaIcon from '@assets/visa-ico.svg';
import DiscoverIcon from '@assets/discover-ico.svg';
import MasterCardIcon from '@assets/mastercard-ico.svg';
import AmericanExpressIcon from '@assets/american-express-ico.svg';

import styles from './styles';

const CreditCardsList: React.FC = () => (
  <View style={styles.container}>
    <VisaIcon />
    <MasterCardIcon />
    <DiscoverIcon />
    <AmericanExpressIcon />
  </View>
);

export default CreditCardsList;
