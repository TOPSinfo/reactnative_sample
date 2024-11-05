import React from 'react';
import { View } from 'react-native';

import { ScreenProps } from '@types';
import SignUpWizard from '@components/SignUpWizard';

import styles from './styles';

interface Props {}

const SignUp: React.FC<ScreenProps> = () => {
  return (
    <View style={styles.container}>
      <SignUpWizard />
    </View>
  );
};

export default SignUp as React.FC<Props>;
