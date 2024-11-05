import React from 'react';
import { Keyboard, View } from 'react-native';
import { FieldArray } from 'formik';
import * as yup from 'yup';

import { hasValue } from '@utils';
import Text from '@components/Text';
import Container from '../Container';
import Button from '@components/Button';
import Label from '@components/Form/Label';
import Field from '@components/Form/Field';
import Input from '@components/Form/Input';
import Submit from '@components/Form/Submit';
import { Values, PageProps } from '../types';
import BaseCheckbox from '@components/Form/BaseCheckbox';
import Wizard, { WizardPageProps } from '@components/Wizard';

import AddIcon from '@assets/add-ico.svg';
import CheckIcon from '@assets/check-ico.svg';
import Regex from '@consts/regex';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';


const lprContainer = { marginTop: 20 };
const additionalText = { marginTop: 10 };

const schema = yup.object().shape({
  vehicles: yup.array().of(
    yup.object().shape(
      {
        name: yup.string().when('licensePlate', {
          is: hasValue,
          then: yup.string().required('error.vehicleNameIsRequired').min(2,'Vehicle name must be more than 2 character').max(30,'Vehicle name must be less than 30 character'),
          otherwise: yup.string(),
        }).matches(Regex.AlphaNumericWithoutOnlyNumber, 'errorOnlyAplhaNumericAllowed'),
        licensePlate: yup.string()
          .when('name', {
            is: hasValue,
            then: yup.string().required('error.licensePlateIsRequired'),
            otherwise: yup.string(),
          }).matches(Regex.AlphaNumeric, 'errorOnlyAplhaNumericAllowed')
      },
      [['name', 'licensePlate'],['licensePlate', 'name']]
    )
  ),
});

const Vehicles: React.FC<PageProps> = props => {
  const { t } = useTranslation();
return(
  <Wizard.Page {...props}>
    {({ values, setFieldValue }: WizardPageProps<Values>) => (
      <>
        <KeyboardAwareScrollView>
          <View style={{ paddingHorizontal: 15, paddingVertical: 35 }}>
            <FieldArray
              name="vehicles"
              validateOnChange={false}
              render={({ push, remove }) => (
                <View>
                  {values.vehicles.map((_, index) => (
                    <View key={index}>
                      <Field>
                        <Label>{t('vehicleName')}</Label>
                        <Input name={`vehicles[${index}].name`} />
                      </Field>
                      <Field>
                        <Label>{t('licensePlate')}</Label>
                        <Input maxLength={11} autoCapitalize={'characters'} name={`vehicles[${index}].licensePlate`} />
                      </Field>
                      <Field>
                        <BaseCheckbox
                          label="setAsPrimaryVehicle"
                          value={values.vehicles[index].defaultVehicle === 'true'}
                          onPress={() => {
                            const vehicles = values.vehicles.map((x, i) => {
                              // this should and must be fixed on the API
                              // it's so annoying casting types left and right
                              x.defaultVehicle = String(i === index);
                              return x;
                            });

                            setFieldValue('vehicles', vehicles);
                          }}
                        />
                      </Field>
                    </View>
                  ))}
                  {values.vehicles.length > 1 && (
                    <Button
                      uppercase
                      title={
                        <Text color="danger" uppercase fontWeight="bold">
                          {t('cancel')}
                        </Text>
                      }
                      onPress={() => {
                        const toRemove = values.vehicles.length - 1;
                        const vehicles = values.vehicles;
                        if (vehicles[toRemove].defaultVehicle === 'true') {
                          vehicles[toRemove - 1].defaultVehicle = 'true';
                        }

                        setFieldValue('vehicles', vehicles);
                        remove(toRemove);
                      }}
                    />
                  )}
                  <Button
                    uppercase
                    disabled={values.vehicles.length > 7}
                    color="secondary"
                    icon={<AddIcon />}
                    title={t('addAnother')}
                    onPress={() => {
                      Keyboard.dismiss();
                      push({
                        name: '',
                        licensePlate: '',
                        defaultVehicle: 'false',
                      });
                    }}
                  />
                </View>
              )}
            />
            <Field style={lprContainer}>
              <BaseCheckbox
                label="enrollInLprExpress"
                value={values.lprExpress}
                onPress={() => {
                  setFieldValue('lprExpress', !values.lprExpress);
                }}
              />
            </Field>
            <Text>{t('lrpDescription')}</Text>
            <Text style={additionalText}>{t('lrpAdditionalDescription')}</Text>
          </View>
        </KeyboardAwareScrollView>
        <Submit
          uppercase
          // color="secondary"
          icon={<CheckIcon />}
          title={t('saveAndContinue')}
        />
      </>
    )}
  </Wizard.Page>
)};

Vehicles.defaultProps = {
  validationSchema: schema,
};

export default Vehicles;
