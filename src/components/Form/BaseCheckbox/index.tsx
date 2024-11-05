import React, { useState } from 'react';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

import Text from '@components/Text';
import { isSet } from '@utils/isSet';
import Button from '@components/Button';
import CheckIndicator from '@components/CheckIndicator';

import Flex from '@styles/Flex';
import { Global } from '@styles';
import { useTranslation } from 'react-i18next';


export interface BaseCheckboxProps {
  label: string | Element;
  value?: boolean;
  checked?: boolean;
  // TODO: rename onPress to onChange
  // why the hell did I name it onPress in the first place?!
  onPress?: (value: boolean) => void;
  onValueChange?: (value: boolean) => void;
}

const BaseCheckbox: React.FC<BaseCheckboxProps> = ({
  label,
  value,
  onPress,
  onValueChange,
  checked = false,
}) => {
  const isControlled = !isSet(value);
  const [state, setState] = useState(isControlled ? checked : value);
  const current = isControlled ? state : value;
  const { t } = useTranslation();

  useUpdateEffect(() => {
    onValueChange && onValueChange(current as boolean);
  }, [current]);

  return (
    <Button
      icon={<CheckIndicator checked={current as boolean} />}
      style={[Global.p0, Flex.rowCrossCenter, Flex.selfStart]}
      onPress={
        isControlled
          ? () => setState(!state)
          : () => onPress!(current as boolean)
      }
      title={
        typeof label === 'string' ? (
          <Text color={current ? 'accent' : 'primary'} fontWeight="mediumBold">
             {t(label)}
          </Text>
        ) : (
          label
        )
      }
    />
  );
};

export default BaseCheckbox;
