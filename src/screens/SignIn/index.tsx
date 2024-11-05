import React, { useRef } from 'react';
import { View, TextInput, ScrollView, } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks';

import Text from '@components/Text';
import useAuth from '@hooks/useAuth';
import Button from '@components/Button';
import Input from '@components/Form/Input';
import { goTo } from '@navigation/actions';
import Label from '@components/Form/Label';
import Submit from '@components/Form/Submit';
import { ScreenProps, ScreenPassProps } from '@types';
import useNotifications from '@hooks/useNotifications';

import Logo from '@assets/pp-logo.svg';
import CheckIcon from '@assets/check-ico.svg';
import EnvelopeIcon from '@assets/envelope-ico.svg';
import PasswordIcon from '@assets/lock.svg';

import styles from './styles';
import { AuthTitle } from '@components/AuthNav';
import Regex from '@consts/regex';
import { useTranslation } from 'react-i18next';

const schema = yup.object().shape({
  email: yup.string()
    .matches(Regex.Email,
      'error.invalidEmailFormat')
    .required('error.emailIsRequired'),
  password: yup.string().required('error.passwordIsRequired'),
});

interface Props { }

interface InjectedProps extends ScreenProps, ScreenPassProps { }

const SignIn: React.FC<InjectedProps> = ({ componentId, error }) => {
  const { login } = useAuth();
  const ref = useRef<TextInput | null>(null);
  const { showNotification } = useNotifications();
  const { t } = useTranslation();
  
  useNavigationComponentDidAppear(() => {
    error && showNotification({ message: error.message, type: 'error' });
  }, componentId);


  return (
    <View style={styles.container}>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={schema}
        initialValues={{ email: '', password: '' }}
        onSubmit={({ email, password }) => {
          login(email, password);
        }}>
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
                {t('signInToUnlockAllFeatures')}
              </Text>
              <View>
                <View style={styles.field}>
                  <Label>{t('yourEmail')}</Label>
                  <Input
                    textContentType='emailAddress'
                    name="email"
                    returnKeyType="next"
                    icon={<EnvelopeIcon />}
                    autoCapitalize={'none'}
                    keyboardType="email-address"
                    onSubmitEditing={() => ref.current?.focus()}
                  />
                </View>
                <View>
                  <Label>{t('password')}</Label>
                  <Input
                    textContentType='password'
                    ref={ref}
                    name="password"
                    secureTextEntry
                    returnKeyType="go"
                    icon={<PasswordIcon style={{ marginLeft: 2 }} />}
                    onSubmitEditing={() => handleSubmit()}
                  />
                </View>
              </View>
              <Button
                color="secondary"
                title={t('forgotYourPassword?')}
                style={styles.forgotPassword}
                onPress={() =>
                  goTo(componentId, 'FORGOT_PASSWORD_SCREEN', {
                    disableSidebar: true,
                    props: { title: 'Forgot Password' },
                  })
                }
              />
              <Button
                color="secondary"
                title={t('signUpForNewAccount')}
                style={styles.forgotPassword}
                onPress={() =>
                  goTo(componentId, 'SIGN_UP_SCREEN', {
                    disableSidebar: true,
                    props: { title: <AuthTitle action="Sign Up" /> },
                  })
                }
              />
            </ScrollView>
            <Submit
              uppercase
              color="primary"
              title={t('signMeIn')}
              icon={<CheckIcon />}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignIn as React.FC<Props>;
