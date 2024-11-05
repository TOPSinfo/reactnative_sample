import React from 'react';
import { View, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Regex from '@consts/regex';
import useAuth from '@hooks/useAuth';
import { OverlayProps } from '@types';
import Field from '@components/Form/Field';
import Input from '@components/Form/Input';
import Label from '@components/Form/Label';
import Submit from '@components/Form/Submit';
import { goBack } from '@navigation/actions';

import CheckIcon from '@assets/check-ico.svg';
import ProfilePassIcon from '@assets/profile-pass-large-ico.svg';

import styles from '@screens/EditProfile/styles';
import { useTranslation } from 'react-i18next';

interface Props {}

interface InjectedProps extends OverlayProps {}

const schema = yup.object().shape({
  currentPassword: yup.string().required(`currentPasswordRequired`),
  newPassword: yup
    .string()
    .required(`error.newPasswordIsRequired`)
    .matches(
      Regex.Password,`error.passwordRegexMatch`)
    .min(8, `error.passwordLength`),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('newPassword'), null],
      `error.confirmPasswordDontMatch`
    )
    .required(`error.repeatPasswordIsRequired`),
});

const ChangePassword: React.FC<InjectedProps> = ({ onScroll, componentId }) => {
  const { changePassword } = useAuth();
  const {t} = useTranslation()
  return (
    <View style={styles.container}>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={schema}
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        onSubmit={values => {
          const { newPassword,currentPassword } = values;
          const updatedPassword = {newPassword:newPassword,currentPassword:currentPassword}
          changePassword(updatedPassword,componentId);
          // goBack(componentId);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <ScrollView
              onScroll={onScroll}
              contentContainerStyle={styles.wrapper}
            >
              <View style={styles.icon}>
                <ProfilePassIcon height={88} width={138} />
              </View>
              <Field>
                <Label>{t("currentPassword")}</Label>
                <Input
                  secureTextEntry
                  returnKeyType="next"
                  name="currentPassword"
                />
              </Field>
              <Field>
                <Label>{t("newPassword")}</Label>
                <Input
                  secureTextEntry
                  name="newPassword"
                  returnKeyType="next"
                />
              </Field>
              <Field>
                <Label>{t("repeatPassword")}</Label>
                <Input
                  secureTextEntry
                  returnKeyType="go"
                  name="confirmPassword"
                  onSubmitEditing={handleSubmit}
                />
              </Field>
            </ScrollView>
            <Submit icon={<CheckIcon />} title={t("changePassword")} />
          </>
        )}
      </Formik>
    </View>
  );
};

export default ChangePassword as React.FC<Props>;
