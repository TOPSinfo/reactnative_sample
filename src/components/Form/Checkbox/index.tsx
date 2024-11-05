import React from 'react';
import { Field, FieldProps } from 'formik';

import Error from '../Error';
import BaseCheckbox, { BaseCheckboxProps } from '../BaseCheckbox';

interface Props extends BaseCheckboxProps {
  name: string;
}

const Checkbox: React.FC<Props> = ({ name, ...props }) => (
  <Field name={name}>
    {({
      field: { value },
      form: { setFieldValue },
      meta: { error },
    }: FieldProps) => (
      <>
        <BaseCheckbox
          value={value}
          onPress={checked => setFieldValue(name, !checked)}
          {...props}
        />
        {error && <Error message={error} />}
      </>
    )}
  </Field>
);

export default Checkbox;
