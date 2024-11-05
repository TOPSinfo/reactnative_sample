import React, { useEffect } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native'
import Account from './Account';
import Payment from './Payment';
import { Values } from './types';
import Vehicles from './Vehicles';
import Months from '@consts/months';
import useAuth from '@hooks/useAuth';
import useRefCallback from '@hooks/useRefCallback';
import Wizard, { WizardElement } from '@components/Wizard';
import { CurrentYear, CurrentMonth } from '@consts/credit-card';

import CarIcon from '@assets/tab_car.svg';
import CreditCardIcon from '@assets/tab_credit-card.svg';
import SignUpIcon from '@assets/tab_sign-up.svg';

const initialValues: Values = {
  email: '',
  lastName: '',
  firstName: '',
  newPassword: '',
  phoneNumber: '',
  confirmPassword: '',
  termsAndConditions: false,
  contactPref: ['email', 'phone'],
  lprExpress: false,
  vehicles: [
    {
      name: '',
      licensePlate: '',
      defaultVehicle: 'true',
    },
  ],
  cards: [
    {
      cardCode: '',
      cardNumber: '',
      postalCode: '',
      primary: 'true',
      year: String(CurrentYear),
      month: Months[CurrentMonth].value,
    },
  ],
};

const SignUpWizard: React.FC = () => {
  const { register, signUp } = useAuth();
  const [ref, setRef] = useRefCallback<WizardElement>();

  /**
   * Handles the submission of the sign-up form.
   *
   * @param values - The values from the form submission.
   * @param values.contactPref - The user's contact preferences.
   * @param values.cards - The user's card information.
   * @param values.vehicles - The user's vehicle information.
   *
   * The function processes the contact preferences to determine if both methods are selected.
   * It filters out any cards or vehicles with empty fields, ensuring that only fully filled entries are considered.
   * Finally, it calls the `register` function with the processed values.
   */
  const handleSubmit = (values: Values) => {
    const contactPref =
      values.contactPref.length === 2 ? 'both' : values.contactPref[0];

    // since cards are optional, filter out those with empty fields
    // if one of the fields is not empty, the user is required to fill other fields too
    // so checking for just one field here is enough
    const cards = values.cards.filter(({ cardNumber }) => cardNumber);
    // same as cards
    const vehicles = values.vehicles.filter(({ name }) => name);

    register({ ...values, cards, vehicles, contactPref });
  };

  useEffect(() => {
    if (signUp.status === 'rejected') {
      ref.current?.goTo(0);
    }
  }, [ref, signUp.status]);

  

  return (
    <Wizard initialValues={initialValues} innerRef={setRef}>
      <Account title="Sign Up" icon={SignUpIcon} />
      <Vehicles title="Vehicles" icon={CarIcon} />
      <Payment title="Payment" onSubmit={handleSubmit} icon={CreditCardIcon} />
    </Wizard>
  );
};

export default SignUpWizard;
