import React from 'react';
import { Picker as RNPicker, PickerProps, View } from 'react-native';

import ArrowExpandIcon from '@assets/arrow-expand-ico.svg';

import inputStyles from '@components/Form/BaseInput/styles';
import styles from './styles';

export interface BasePickerProps extends PickerProps {}

type Picker = React.FC<BasePickerProps> & {
  Item: typeof RNPicker.Item;
};

const BasePicker: Picker = ({ style, ...props }) => (
  <View style={inputStyles.container}>
    <RNPicker {...props} style={[inputStyles.base, styles.base, style]} />
    <ArrowExpandIcon width="15" style={styles.icon} />
  </View>
);

BasePicker.Item = RNPicker.Item;

export default BasePicker;
