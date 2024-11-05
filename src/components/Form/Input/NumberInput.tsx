import React, { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useField } from 'formik';

import BaseInput, { BaseInputProps } from '@components/Form/BaseInput';
import Error from '@components/Form/Error';

interface Props extends TextInputProps, BaseInputProps {
  name: string;
}

const NumberInput = forwardRef<TextInput, Props>(
  ({ name, style, ...props }, ref) => {
    const [field, meta, helpers] = useField(name);
    const { setValue } = helpers;

    const onChangeText = (text: string) => {
      setValue(text.replace(/[^0-9]/g, ''));
    };

    return (
      <>
        <BaseInput
          ref={ref}
          keyboardType="number-pad"
          {...props}
          value={field.value}
          style={style}
          onBlur={field.onBlur(name)}
          onChangeText={onChangeText}
        />
        {meta.error && <Error message={meta.error} />}
      </>
    );
  }
);

export default NumberInput;
