import { BaseContactPreference } from '@types';

const ContactPreferences: Array<{
  value: BaseContactPreference;
  label: string;
}> = [
  {
    value: 'email',
    label: 'email',
  },
  {
    value: 'phone',
    label: 'phone',
  },
];

export default ContactPreferences;
