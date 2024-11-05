import React from 'react';

import Text from '@components/Text';

import styles from './styles';
import { useTranslation } from 'react-i18next';

interface Props {
  message: string;
}

const Error: React.FC<Props> = ({ message }) => {
  const { t } = useTranslation();
  return(
  <Text
    color="danger"
    fontSize="medium"
    fontWeight="semiBold"
    style={styles.message}>
      {t(message)}
  </Text>
)};

export default Error;
