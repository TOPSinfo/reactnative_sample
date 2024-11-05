import React, { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { Field, FieldProps } from 'formik';

import BaseInput, { BaseInputProps } from '@components/Form/BaseInput';
import Error from '@components/Form/Error';

interface Props extends TextInputProps, BaseInputProps {
  name: string;
}
const Input = forwardRef<TextInput, Props>(({ name, style, ...props }, ref) => (

  <Field name={name}>
    {({ field: { value, onChange, onBlur }, meta: { error } }: FieldProps) => (
      <>
        <BaseInput
          ref={ref}
          {...props}
          value={value}
          style={style}
          onBlur={onBlur(name)}
          onChangeText={onChange(name)}
        />
        {error && <Error message={error} />}
      </>
    )}
  </Field>
));

export default Input;
