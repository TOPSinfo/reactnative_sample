import React, { useEffect } from 'react';
import { View } from 'react-native';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

import { Rate } from '@types';
import Text from '@components/Text';
import useLoader from '@hooks/useLoader';
import lastChild from '@utils/lastChild';
import useParking from '@hooks/useParking';
import Select from '@components/Form/Select';

import styles from './styles';

interface Props {
  rates: Rate[] | undefined;
  selectedRate: Rate | null;
  handleRateSelect: (rate: Rate) => void;
  isPrepaid: boolean | undefined;
}

// this can be improved, I don't like how it does stuff right now
// initial selected item should be handled outside
const PaymentOptions: React.FC<Props> = ({
  rates,
  selectedRate,
  handleRateSelect,
  isPrepaid,
}) => {
  const { toggleLoader, active } = useLoader();
  const { lotInfoLoading } = useParking();

  useEffect(() => {
    if (!selectedRate && rates?.length) {
      handleRateSelect(rates[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRate, rates?.length]);

  useUpdateEffect(() => {
    toggleLoader(lotInfoLoading);
  }, [lotInfoLoading]);

  const handleOnSelectRate = (rate: Rate) => {
    handleRateSelect(rate);
  };
  return (
    <View>
      {!lotInfoLoading && rates && (
        <>
          <View style={styles.options}>
            <Select
              isPrepaid={isPrepaid}
              selected={rates[0]} onValueChange={handleOnSelectRate}>
              {rates.map((rate, index: number) => (
                <View
                  key={rate.recordID}
                  style={[
                    styles.option,
                    !lastChild(index, rates.length) && styles.optionBorder,
                  ]}>
                  <Select.Option
                    isPrepaid={isPrepaid}
                    value={rate}>
                    {({ selected }) => (
                      <View style={styles.optionContent}>
                        <Text
                          fontWeight="mediumBold"
                          color={selected ? 'accent' : 'primary'}>
                          {rate.summary}
                        </Text>
                      </View>
                    )}
                  </Select.Option>
                </View>
              ))}
            </Select>
          </View>
          <View style={styles.footer}>
            {selectedRate?.convenienceFee && (
              <Text color="secondary" fontSize="medium">
                {`${selectedRate?.convenienceFee} convenience fee`}
              </Text>
            )}
          </View>
        </>
      )}
      {active ? null : !lotInfoLoading && !rates?.length && (
        <Text style={styles.noRates}>No rates found</Text>
      )}
    </View>
  );
};

export default PaymentOptions;
