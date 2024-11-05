import React, { useState, forwardRef } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import styles from './styles';

export interface BaseInputProps extends Omit<TextInputProps, 'editable'> {
  icon?: Element;
  disabled?: boolean;
}

const BaseInput = forwardRef<TextInput, BaseInputProps>(
  ({ onFocus, onBlur, style, icon, disabled, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    return (
      <View style={[styles.container, focused && styles.focused]}>
        {icon && icon}
        <TextInput
          ref={ref}
          editable={!disabled}
          style={[
            styles.base,
            icon && styles.withIcon,
            disabled && styles.disabled,
            style,
          ]}
          onFocus={e => {
            setFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={e => {
            setFocused(false);
            onBlur && onBlur(e);
          }}
          {...props}
        />
      </View>
    );
  }
);

export default BaseInput;
