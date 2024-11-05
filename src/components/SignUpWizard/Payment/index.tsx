import React, { useCallback, useState } from 'react';
import { Keyboard, View, TouchableOpacity, Text as TextI, Platform } from 'react-native';
import { FieldArray } from 'formik';
import * as yup from 'yup';
import range from 'lodash/range';

import { NewCard } from '@types';
import { hasValue } from '@utils';
import { validityCheckCC } from '@utils';
import Months from '@consts/months';
import Text from '@components/Text';
import Container from '../Container';
import Button from '@components/Button';
import Label from '@components/Form/Label';
import Field from '@components/Form/Field';
import Input from '@components/Form/Input';
import { PageProps, Values } from '../types';
import Picker from '@components/Form/Picker';
import Submit from '@components/Form/Submit';
import BaseCheckbox from '@components/Form/BaseCheckbox';
import CreditCardsList from '@components/CreditCardsList';
import Wizard, { WizardPageProps } from '@components/Wizard';
import { CurrentMonth, CurrentYear, Next10Years } from '@consts/credit-card';

import AddIcon from '@assets/add-ico.svg';
import CheckIcon from '@assets/check-ico.svg';

import styles from './styles';
import { Global, Flex, Colors, Fonts } from '@styles';
import Regex from '@consts/regex';
import NumberInput from '@components/Form/Input/NumberInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MonthPicker from 'react-native-month-year-picker';
import cards from '@redux/reducers/cards';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

interface Props extends PageProps {
  onSubmit: (values: any) => void;
}

yup.addMethod(yup.string, 'ccValidation', validityCheckCC);
const validationSchema = yup.object().shape({
  cards: yup.array().of(
    yup.object().shape(
      {
        year: yup.string(),
        month: yup.string().when('year', {
          is: (value: string | undefined) => value === String(CurrentYear),
          then: yup.string().oneOf(
            range(CurrentMonth, 12).map(x => Months[x].value),
            'error.creditCardExpired'
          ),
          otherwise: yup.string(),
        }),
        cardCode: yup.string().when(['cardNumber', 'postalCode'], {
          is: hasValue,
          then: yup.string().required('error.ccvIsRequired'),
          otherwise: yup.string(),
        }),
        cardNumber: yup.string().when(['cardCode', 'postalCode'], {
          is: hasValue,
          then: yup.string().required('error.cardNumberIsRequired').ccValidation(),
          otherwise: yup.string(),
        }),

        postalCode: yup.string().when(['cardCode', 'cardNumber'], {
          is: hasValue,
          then: yup
            .string()
            .required('error.postalCodeIsRequired')
            .matches(
              Regex.AlphaNumericWithSpace,'error.postalCodeRegexMatch'),
          otherwise: yup.string(),
        }),
      },
      [
        ['cardNumber', 'postalCode'],
        ['cardCode', 'postalCode'],
        ['cardCode', 'cardNumber'],
      ]
    )
  ),
});

const CreditCards: React.FC<Props> = (props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<any>(null)
  const showPicker = useCallback((value) => setShow(value), []);
  const { t } = useTranslation();


  return (
    <Wizard.Page {...props}>
      {({ values, setFieldValue }: WizardPageProps<Values>) => (
        <>
          <KeyboardAwareScrollView>
            <View style={{ paddingHorizontal: 15, paddingVertical: 35 }}>
              <CreditCardsList />
              <FieldArray
                name="cards"
                render={({ push, remove }) => (
                  <View>
                    {values.cards.map((_, index) => (
                      <View key={index}>
                        <View style={Flex.row}>
                          <Field style={[styles.cardNumber, Global.mr5]}>
                            <Label>{t('cardNumber')}</Label>
                            <NumberInput allowFontScaling={false} name={`cards[${index}].cardNumber`} />
                          </Field>
                          <Field>
                            <Label>{t('ccv')}</Label>
                            <NumberInput allowFontScaling={false} maxLength={3} name={`cards[${index}].cardCode`} />
                          </Field>
                        </View>
                        {/* <View>
                          <Label>Expiration Date</Label>
                          <View style={Flex.row}>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => {
                              showPicker(true),
                                setCurrentIndex(index)
                            }}>
                              <Field style={{ borderBottomWidth: 1, borderColor: Colors.Heather, marginRight: '70%', }}>
                                <TextI style={{ color: Colors.Fiord, ...Fonts.mediumBold, paddingVertical: 10, ...Fonts.h5 }}>{values.cards[index].month + ' / ' + values.cards[index].year}</TextI>
                              </Field>
                            </TouchableOpacity>
                            <Field>
                              <Label>Zip/Postal Code</Label>
                              <Input name={`cards[${index}].postalCode`} />
                            </Field>
                          </View>
                        </View> */}

                        <View style={{ flexDirection: 'row' }}>
                          <Field style={{ marginRight: 50 }}>
                            <Label>{t('expirationDate')}</Label>
                            <TouchableOpacity style={{ borderBottomWidth: 1, borderBottomColor: Colors.Heather, paddingVertical: Platform.OS == 'android' ? 10 : 5 }} activeOpacity={0.9}
                              onPress={() => {
                                showPicker(true),
                                  setCurrentIndex(index)
                              }}>
                              <TextI style={{ color: Colors.Fiord, ...Fonts.mediumBold, ...Fonts.h5, }}>{values.cards[index].month + ' / ' + values.cards[index].year}</TextI>
                            </TouchableOpacity>
                          </Field>

                          <Field>
                            <Label>{t('zip/postalCode')}</Label>
                            <Input name={`cards[${index}].postalCode`} />
                          </Field>
                        </View>

                        <Field>
                          <BaseCheckbox
                            label="setAsPrimaryCard"
                            value={values.cards[index].primary === 'true'}
                            onPress={() => {
                              const cards = values.cards.map((x, i) => {
                                x.primary = String(i === index);
                                return x;
                              });
                              setFieldValue('cards', cards);
                            }}
                          />
                        </Field>

                      </View>
                    ))}
                    {values.cards.length > 1 && (
                      <Button
                        uppercase
                        title={
                          <Text uppercase fontWeight="bold" color="danger">
                             {t('cancel')}
                          </Text>
                        }
                        onPress={() => {
                          const toRemove = values.cards.length - 1;
                          const cards = values.cards;

                          if (cards[toRemove].primary === 'true') {
                            cards[toRemove - 1].primary = 'true';
                          }

                          setFieldValue('card', cards);
                          remove(toRemove);
                        }}
                      />
                    )}
                    <Button
                      uppercase
                      disabled={values.cards.length > 7}
                      color="secondary"
                      icon={<AddIcon />}
                      title={t('addAnother')}
                      onPress={() => {
                        Keyboard.dismiss();
                        push({
                          cardCode: '',
                          cardNumber: '',
                          postalCode: '',
                          primary: 'false',
                          year: String(CurrentYear),
                          month: Months[CurrentMonth].value,
                        } as NewCard);
                      }}
                    />
                  </View>
                )}
              />
            </View>
          </KeyboardAwareScrollView>
          <Submit
            uppercase
            color="primary"
            icon={<CheckIcon />}
            title="Save and sign me up"
          />

          {show &&
            <MonthPicker
              onChange={(event, date) => {
                if (date) {
                  values.cards[currentIndex].month = moment(date).format('MM')
                  values.cards[currentIndex].year = moment(date).format('YYYY')
                }
                showPicker(false);
              }}
              value={new Date()}
              minimumDate={new Date(CurrentYear, CurrentMonth)}
              mode={'number'}
            />
          }
        </>
      )}
    </Wizard.Page>
  )
}

CreditCards.defaultProps = {
  validationSchema,
};

export default CreditCards;
