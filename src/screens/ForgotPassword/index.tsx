import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import useAuth from '@hooks/useAuth';
import Input from '@components/Form/Input';

import Text from '@components/Text';
import { ScreenProps } from '@types';
import Label from '@components/Form/Label';
import Submit from '@components/Form/Submit';

import Logo from '@assets/pp-logo.svg';
import CheckIcon from '@assets/check-ico.svg';
import EnvelopeIcon from '@assets/envelope-ico.svg';

import styles from './styles';
import { useTranslation } from 'react-i18next';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('error.emailIsRequired')
    .email('error.invalidEmailFormat'),
});

interface Props { }

interface InjectedProps extends ScreenProps {
  error?: {
    message: string;
  };
}

const ForgotPassword: React.FC<InjectedProps> = () => {
  const { forgotPassword } = useAuth();
  const [disable, setDisable] = useState(true);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={schema}
        initialValues={{ email: '' }}
        onSubmit={({ email }) => {
          forgotPassword(email);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <ScrollView contentContainerStyle={styles.wrapper}>
              <View style={styles.logo}>
                <Logo height={150} />
              </View>
              <Text
                uppercase
                color="gray"
                fontSize="medium"
                fontWeight="semiBold"
                style={styles.cta}
              >
                   {t('weWillSendYouInstructionsOnYourVerifiedEmail')}
              </Text>
              <View>
                <View style={styles.field}>
                  <Label>{t('yourEmail')}</Label>
                  <Input
                    autoCapitalize={'none'}
                    name="email"
                    returnKeyType="next"
                    icon={<EnvelopeIcon />}
                    keyboardType="email-address"
                    onSubmitEditing={handleSubmit}
                    onChange={() => setDisable(false)}
                  />
                </View>
              </View>
            </ScrollView>
            <Submit
              disabled={disable}
              uppercase
              title={t('send')}
              color="primary"
              icon={<CheckIcon />}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default ForgotPassword as React.FC<Props>;
