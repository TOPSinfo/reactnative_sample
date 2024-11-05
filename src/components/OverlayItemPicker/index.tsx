import React, { useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';

import { lastChild } from '@utils';
import Text from '@components/Text';
import Card from '@components/Card';
import { dismissOverlay } from '@navigation/actions';
import BaseCheckbox from '@components/Form/BaseCheckbox';
import { ScreenProps, OverlayItemPickerPassProps, Vehicle } from '@types';

import card from '@styles/shared/card';
import styles from '@components/OverlayItemPicker/styles';
import { useTranslation } from 'react-i18next';
import {  NavigationScreenIds } from '@consts/navigation';

interface Props extends ScreenProps, OverlayItemPickerPassProps { }

const OverlayItemPicker: React.FC<Props> = ({
  items,
  onSubmit,
  componentId,
  initialSelectedItem,
  fromQR,
  editVehicle
}) => {
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);
  const { t } = useTranslation();
  

  const handleOnSubmit = () => {
    onSubmit(selectedItem);
    dismissOverlay(componentId);
  };

  return (
    <View style={styles.container}>
      <Card
        style={styles.card}
        showActions
        title={{ value: fromQR ? t('selectVehicle').toUpperCase() : t('changeVehicle').toUpperCase(), color: 'secondary' }}
        actions={[
          {
            label: t('close'),
            color: 'danger',
            props: {
              onPress: () => {
                dismissOverlay(componentId),
                dismissOverlay(NavigationScreenIds.LOADER_SCREEN);
              },
            },
          },
          {
            label: fromQR ? t('selectVehicle') : t('changeVehicle'),
            color: 'primary',
            props: {
              onPress: () => {
                handleOnSubmit();
              },
            },
          },
        ]}
      >
        <View style={[card.wrapper, { maxHeight: Dimensions.get('window').height / 1.7 }]}>
          <View style={card.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {items.map((item, index) => (
                <View key={index} style={styles.item}>
                  <BaseCheckbox
                    label={
                      <View style={styles.checkboxItem}>
                        <Text
                          color="accent"
                          fontSize="h5"
                          fontWeight="bold"
                          style={styles.licensePlate}
                        >
                          {item.licensePlate}
                        </Text>
                        <Text fontSize="h6" color="secondary">
                          {item.name}
                        </Text>

                      </View>
                    }
                    value={item.licensePlate === selectedItem?.licensePlate}
                    onPress={() => setSelectedItem(item)}
                  />
                  {!lastChild(index, items.length) && (
                    <View style={styles.separator} />
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default OverlayItemPicker;
