import { NewAccount } from '@types';

export interface Values extends Required<NewAccount> {
  confirmPassword: string;
  termsAndConditions: boolean;
}

export interface PageProps {
  [key: string]: any;
  title: string;
}
