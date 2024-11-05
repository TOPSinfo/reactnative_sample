import React, { useEffect, useState } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

import Text from '@components/Text';
import Card from '@components/Card';
import { goTo } from '@navigation/actions';
import useVehicles from '@hooks/useVehicles';
import { ScreenProps, VehiclePassProps } from '@types';

import Options from '@assets/modify-idle-ico.svg';
import OptionsActive from '@assets/modify-active-ico.svg';

// import CarIcon from '@assets/tab_car.svg'

import card from '@styles/shared/card';
import { Flex, Global } from '@styles';
import { Image } from 'react-native-animatable';
import { useTranslation } from 'react-i18next';
import { useNavigationComponentDidDisappear } from 'react-native-navigation-hooks/dist';

const carIcon = require('../../assets/tabcar.png')
interface Props {
  id: string;
  name: string;
  isDefault: boolean;
  licensePlate: string;
  style?: StyleProp<ViewStyle>;
  componentId: ScreenProps['componentId'];
}

const Vehicle: React.FC<Props> = ({
  id,
  name,
  style,
  isDefault,
  componentId,
  licensePlate,
}) => {
  const { removeVehicle } = useVehicles();
  const [show, setShow] = useState(false);
  const {t} = useTranslation()
  
  useNavigationComponentDidDisappear(() => {
    setShow(false)
  }, componentId)

  useEffect(() => {
    setShow(false)
  }, [isDefault])

  return (
    <Card
      style={style}
      showActions={show}
      onCollapse={() => setShow(!show)}
      collapseIcon={show ? <OptionsActive /> : <Options />}
      title={
        isDefault
          ? { value: t("primary").toUpperCase(), color: 'primary' }
          : undefined
      }
      actions={[
        {
          label: t("edit"),
          color: 'primary',
          props: {
            onPress: () =>
              goTo<VehiclePassProps>(componentId, 'VEHICLE_SCREEN', {
                disableSidebar: true,
                props: {
                  mode: 'edit',
                  vehicleId: id,
                  title: 'add/editVehicle',
                },
              }),
          },
        },
        {
          label: t("delete"),
          color: 'danger',
          props: {
            onPress: () => removeVehicle(id),
          },
        },
      ]}>
      <View style={card.wrapper}>
        <View style={[Flex.selfCenter, Global.mr4]}>
          <Image style={{ height: 40, width: 40, tintColor: '#8193AE' }} source={carIcon} />
        </View>
        <View style={card.content}>
          <Text fontSize="h5" color="outerspace" fontWeight="bold">
            {licensePlate}
          </Text>
          <Text color="secondary" fontSize="h6">
            {name}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default Vehicle;
