import React, { useRef } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Input from '@components/Form/Input';
import Label from '@components/Form/Label';
import useVehicles from '@hooks/useVehicles';
import Submit from '@components/Form/Submit';
import { goBack } from '@navigation/actions';
import Checkbox from '@components/Form/Checkbox';
import { VehiclePassProps, ScreenProps, OverlayProps } from '@types';

import CheckIcon from '@assets/check-ico.svg';
import VehicleIcon from '@assets/vehicle-large-ico.svg';

import styles from './styles';
import Regex from '@consts/regex';
import { useTranslation } from 'react-i18next';
import auth from '@redux/reducers/auth';
import useAuth from '@hooks/useAuth';

type InjectedProps = VehiclePassProps & ScreenProps & OverlayProps;

const schema = yup.object().shape({
  name: yup.string().matches(Regex.AlphaNumericWithoutOnlyNumber,`errorOnlyAplhaNumericAllowed`).required(`error.nameIsRequired`).min(2,'Vehicle name must be more than 2 character').max(30,'Vehicle name must be less than 30 character'),
  licensePlate: yup.string()
    .matches(Regex.AlphaNumeric,`errorOnlyAplhaNumericAllowed`)
    .required(`error.licensePlateIsRequired`)
    .max(11, 'License Plate should not be more then 11 character')
});

const Vehicle: React.FC<InjectedProps> = ({
  onScroll,
  componentId,
  ...rest
}) => {
  const { addVehicle, updateVehicle, vehicles,getVehicles } = useVehicles();
  const ref = useRef<TextInput | null>(null);
  const {t} = useTranslation()

  const { name, licensePlate, defaultVehicle } =
    rest.mode === 'add'
      ? { name: '', licensePlate: '', defaultVehicle: false }
      : vehicles.find(v => v.id === rest.vehicleId)!;

  return (
    <View style={styles.container}>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={schema}
        initialValues={{
          name,
          licensePlate,
          defaultVehicle:
            typeof defaultVehicle === 'string'
              ? defaultVehicle === 'true'
              : false,
        }}
        onSubmit={v => {
          const values = {
            licensePlate: v.licensePlate.toUpperCase(),
            name: v.name,
            defaultVehicle: String(v.defaultVehicle),
          };
          rest.mode === 'add'
            ? addVehicle(values)
            : updateVehicle(rest.vehicleId, values);
            goBack(componentId);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <ScrollView style={styles.wrapper} onScroll={onScroll}>
              <View style={styles.header}>
                <VehicleIcon />
              </View>
              <View style={styles.field}>
                <Label>{t("vehicleName")}</Label>
                <Input
                  name="name"
                  placeholder={t("name")}
                  returnKeyType="next"
                  onSubmitEditing={() => ref.current?.focus()}
                />
              </View>
              <View style={styles.field}>
                <Label>{t("licensePlate")}</Label>
                <Input
                  ref={ref}
                  maxLength={11}
                  autoCapitalize={'characters'}
                  name="licensePlate"
                  placeholder={t("plate")}
                  returnKeyType="done"
                  onSubmitEditing={() => handleSubmit()}
                />
              </View>
              <View style={styles.field}>
                <Checkbox
                  name="defaultVehicle"
                  label={t("setAsPrimaryVehicle")}
                />
              </View>
            </ScrollView>
            <Submit icon={<CheckIcon />} title={t("saveVehicle/Changes")} />
          </>
        )}
      </Formik>
    </View>
  );
};

export default Vehicle;
