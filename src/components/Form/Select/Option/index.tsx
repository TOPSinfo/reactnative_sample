import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import Button from '@components/Button';
import useSelect from '@hooks/useSelect';
import isFunction from '@utils/isFunction';
import CheckIndicator from '@components/CheckIndicator';

import Flex from '@styles/Flex';
import { Global } from '@styles';

interface Value {
  selected: boolean;
}

interface Props {
  value: any;
  style?: StyleProp<ViewStyle>;
  children: ReactNode | ((value: Value) => ReactNode);
  isPrepaid: boolean | undefined

}

const Option: React.FC<Props> = ({ value, style, children, isPrepaid }) => {
  const { selected, setSelected } = useSelect();

  return (
    <Button
      disabled={isPrepaid ? false : true}
      onPress={() => setSelected(value)}
      icon={isPrepaid ? <CheckIndicator checked={selected === value} /> : null}
      title={
        isFunction(children)
          ? children({ selected: selected === value })
          : children
      }
      style={[Flex.rowCrossCenter, Flex.selfStart, Global.p0, style]}
    />
  );
};

export default Option;
