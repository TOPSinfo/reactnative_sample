import React from 'react';
import { View, Text as TextI } from 'react-native';
import { FieldArray } from 'formik';
import * as yup from 'yup';
import Regex from '@consts/regex';
import Text from '@components/Text';
import Link from '@components/Link';
import Container from '../Container';
import Error from '@components/Form/Error';
import Label from '@components/Form/Label';
import Field from '@components/Form/Field';
import Input from '@components/Form/Input';
import Submit from '@components/Form/Submit';
import { Values, PageProps } from '../types';
import BaseCheckbox from '@components/Form/BaseCheckbox';
import ContactPreferences from '@consts/contact-preferences';
import Wizard, { WizardPageProps } from '@components/Wizard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import CheckIcon from '@assets/check-ico.svg';

import { Global, Flex, Colors, Fonts } from '@styles';
import Checkbox from '@components/Form/Checkbox';
import { goTo } from '@navigation/actions';
import { NavigationIds } from '@consts/navigation';
import { useTranslation } from 'react-i18next';


const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(`error.firstNameIsRequired`)
    .matches(
      Regex.Alphabetic, `error.firstNameRegexMatch`)
    .min(2, `error.firstNameLength`),
  lastName: yup
    .string()
    .required(`error.lastNameIsRequired`)
    .matches(
      Regex.Alphabetic, `error.lastNameRegexMatch`)
    .min(2, `error.lastNameLength`),
  email: yup
    .string()
    .required(`error.emailIsRequired`)
    .matches(Regex.Email, `error.invalidEmailFormat`)
    .email(`error.invalidEmailFormat`),
  newPassword: yup
    .string()
    .required(`error.passwordIsRequired`)
    .matches(
      Regex.Password, `error.passwordRegexMatch`)
    .min(8, `error.passwordLength`),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref(`newPassword`), null], `error.passwordsDontMatch`)
    .required(`error.confirmPasswordIsRequired`),
  phoneNumber: yup
    .string()
    .required(`error.phoneIsRequired`)
    .matches(Regex.Numeric, `errorPhoneNomustbeDigit`).length(10, `error.phoneLength`),
  contactPref: yup
    .array()
    .required(`error.contactPreferenceIsRequired`),
  termsAndConditions: yup
    .boolean()
    .required(`error.t&cMustBeAccepted`)
    .oneOf([true], `error.mustAcceptT&C`),
});

const Account: React.FC<PageProps> = props => {
  const { t } = useTranslation();

  return (
    <Wizard.Page {...props}>
      {({ values, errors }: WizardPageProps<Values>) => (
        <>
          {/* <Container> */}
          <KeyboardAwareScrollView>
            <View style={{ paddingHorizontal: 15, paddingVertical: 35 }}>
              <Field>
                <Label>{t('firstName')}</Label>
                <Input maxLength={50} name="firstName" />
              </Field>
              <Field>
                <Label>{t('lastName')}</Label>
                <Input maxLength={50} name="lastName" />
              </Field>
              <Field>
                <Label>{t('yourEmail')}</Label>
                <Input autoCapitalize='none' name="email" keyboardType="email-address" />
              </Field>
              <Field>
                <Label>{t('password')}</Label>
                <Input secureTextEntry name="newPassword" />
              </Field>
              <Field>
                <Label>{t('confirmPassword')}</Label>
                <Input secureTextEntry name="confirmPassword" />
              </Field>
              <Field>
                <Label>{t('phoneNumber')}</Label>
                <Input maxLength={10} name="phoneNumber" keyboardType="numeric" />
              </Field>
              <Field>
                <Label>{t('sendMeReceiptsAndAlerts')}</Label>
                <FieldArray
                  name="contactPref"
                  validateOnChange={false}
                  render={({ push, remove }) =>
                    ContactPreferences.map((pref, index) => (
                      <View key={index} style={Global.mt4}>
                        <BaseCheckbox
                          label={pref.label}
                          checked={values.contactPref.includes(pref.value)}
                          onValueChange={checked =>
                            checked
                              ? push(pref.value)
                              : remove(values.contactPref.indexOf(pref.value))
                          }
                        />
                      </View>
                    ))
                  }
                />
                {errors.contactPref && (
                  <Error message={errors.contactPref as string} />
                )}
              </Field>
              <Field >
                <Checkbox
                  name="termsAndConditions"
                  label={
                    <View style={{ maxWidth: '80%' }}>
                      <Text fontWeight="mediumBold">
                        {t('iAcceptApp')}&nbsp;
                        <TextI
                          style={{ ...Fonts.bold, color: Colors.CuriousBlue }}

                          onPress={() =>
                            goTo(
                              NavigationIds.SIGN_UP_SCREEN,
                              'TERMS_AND_CONDITIONS_SCREEN',
                              {
                                disableSidebar: true,
                                visibleSidebar: false,
                                props: { title: 'Terms and Conditions' },
                              }
                            )}>{t('termsOfService')}</TextI>
                      </Text>
                    </View>
                  } />

                {/* <View style={{  width: '100%' }}> */}

                {/* </View> */}
              </Field>
            </View>
          </KeyboardAwareScrollView>
          {/* </Container> */}

          <Submit
            disabled={
              values.firstName.length == 0 ||
              values.lastName.length == 0 ||
              values.email.length == 0 ||
              values.newPassword.length == 0 ||
              values.confirmPassword.length == 0 ||
              values.phoneNumber.length == 0
            }
            uppercase
            // color="secondary"
            icon={<CheckIcon />}
            title={t('saveAndContinue')}
          />
        </>
      )}
    </Wizard.Page>
  )
};

Account.defaultProps = {
  validationSchema,
};

export default Account;
