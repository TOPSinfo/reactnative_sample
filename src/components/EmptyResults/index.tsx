import React from 'react';
import { View } from 'react-native';

import Text from '@components/Text';

import EmptyIcon from '@assets/empty-ico.svg';

import styles from './styles';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
  message: string;
}

const EmptyResults: React.FC<Props> = ({ title, message, children }) => {
  const { t } = useTranslation();
  return(
  <View style={styles.container}>
    <EmptyIcon />
    <Text fontSize="h2" fontWeight="semiBold" style={styles.title}>
    {t(title)}
    </Text>
    <Text color="secondary" fontSize="medium" style={styles.message}>
    {t(message)}
    </Text>
    <View style={styles.footer}>{children}</View>
  </View>
)};

export default EmptyResults;
