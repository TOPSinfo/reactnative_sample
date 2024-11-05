import React from 'react';
import { Field, FieldProps } from 'formik';

import Error from '../Error';
import BasePicker, { BasePickerProps } from '@components/Form/BasePicker';

interface Props
  extends Omit<BasePickerProps, 'selectedValue' | 'onValueChange'> {
  name: string;
}

type Picker = React.FC<Props> & {
  Item: typeof BasePicker.Item;
};

const Picker: Picker = ({ name, ...props }) => (
  <Field name={name}>
    {({ field: { value, onChange }, meta: { error } }: FieldProps) => (
      <>
        <BasePicker
          selectedValue={value}
          onValueChange={onChange(name)}
          mode="dropdown"
          {...props}
        />
        {error && <Error message={error} />}
      </>
    )}
  </Field>
);

Picker.Item = BasePicker.Item;

export default Picker;
