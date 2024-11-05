import React from 'react';
import { Keyboard } from 'react-native';
import { useFormikContext } from 'formik';

import Button from '@components/Button';

const Submit: typeof Button = ({ onPress, ...props }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      uppercase
      color="primary"
      onPress={e => {
        Keyboard.dismiss();
        handleSubmit();
        onPress && onPress(e);
      }}
      {...props}
    />
  );
};
export default Submit;
