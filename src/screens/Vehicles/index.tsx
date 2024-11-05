import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';

import { ScreenProps, VehiclePassProps } from '@types';
import Button from '@components/Button';
import lastChild from '@utils/lastChild';
import Vehicle from '@components/Vehicle';
import { goTo } from '@navigation/actions';
import useVehicles from '@hooks/useVehicles';
import EmptyResults from '@components/EmptyResults';

import AddIcon from '@assets/add-ico.svg';
import PointingArrowIcon from '@assets/pointing-arrow-ico.svg';

import styles from './styles';
import { useNavigationComponentDidAppear } from 'react-native-navigation-hooks/dist';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/reducers/root';

interface Props { }

const Vehicles: React.FC<ScreenProps> = ({ componentId }) => {
  const { t } = useTranslation()
  const vehicles = useSelector((state:RootState)=>state.vehicles.value)

  const renderContent = () => {
    if (!vehicles.length) {
      return (
        <EmptyResults
          title="noVehicles"
          message="noVehiclesMessage"
        >
          <PointingArrowIcon />
        </EmptyResults>
      );
    }
    return (
      <FlatList
        data={vehicles}
        keyExtractor={({ id }) => id}
        renderItem={({
          item: { id, name, licensePlate, defaultVehicle },
          index,
        }) => (
          <Vehicle
            id={id}
            name={name}
            componentId={componentId}
            licensePlate={licensePlate}
            isDefault={defaultVehicle === 'true'}
            style={[
              styles.item,
              lastChild(index, vehicles.length) && styles.itemLast,
            ]}
          />
        )}
      />
    );
  };

  return (
    <>
      <View style={styles.container}>
        {renderContent()}
        <Button
          uppercase
          disabled={vehicles.length > 7}
          color="secondary"
          icon={vehicles.length > 7 ? null : <AddIcon />}
          style={styles.button}
          title={vehicles.length > 7 ? 'Only 8 Vehicle allowed to add' : t("addNewVehicle")}
          onPress={() => {
            goTo<VehiclePassProps>(componentId, 'VEHICLE_SCREEN', {
              disableSidebar: true,
              props: { mode: 'add', title: t("add/editVehicle") },
            });
          }}
        />
      </View>
    </>
  );
};

export default Vehicles as React.FC<Props>;
