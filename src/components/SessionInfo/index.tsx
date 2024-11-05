import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text as TextI } from 'react-native';

import Time from './Time';
import Text from '@components/Text';

import { Global, Flex, Colors, Fonts } from '@styles';
import Color from 'color';
import useVehicles from '@hooks/useVehicles';
import { dismissOverlay, showOverlay } from '@navigation/actions';
import { OverlayItemPickerPassProps, OverlayMessage } from '@types'
import { changeActiveVehicle, startStopAutoRenew } from '@redux/actions/sessions';
import { useDispatch } from 'react-redux';
import { showNotification } from '@redux/actions/notifications';
import moment from 'moment'
import { useTranslation } from 'react-i18next';

interface Props {
  location: { name: string; address: string };
  vehicle: { name: string; licensePlate: string };
  validation?: string;
  editVehicle?: boolean;
  recordID?: string;
  isLpnEdit?: any
  locId?: any;
  isAutoRenew?: any;
  renewnoticetime?: any;
  stopDate?: any;
  active?: any
}

type SessionInfo = React.FC<Props> & {
  Time: typeof Time;
};


const SessionInfo: SessionInfo = ({ location, vehicle, validation, editVehicle, isLpnEdit, recordID, locId, isAutoRenew, renewnoticetime, stopDate, active }) => {
  const { vehicles, defaultVehicle } = useVehicles();
  const [selectedVehicle, setSelectedVehicle] = useState(defaultVehicle);
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const _editVehicle = () => {
    if (vehicles.length > 1) {
      const removeCurrentVehicle = vehicles.filter((item) => item.licensePlate != vehicle.licensePlate)
      showOverlay<OverlayItemPickerPassProps>('OVERLAY_ITEM_PICKER_SCREEN', {
        items: removeCurrentVehicle,
        initialSelectedItem: null,
        onSubmit: item => submitChangeVehicle(item),
        fromQR: false,
        editVehicle: true
      });
    } else {
      dispatch(showNotification({
        message: t('errorAddVehicle'),
        type: 'error'
      }))
    }
  }

  const submitChangeVehicle = (item: any) => {
    if (item) {
      const _changeVehicle = {
        "sessionID": Number(recordID),
        "name": item.name,
        "licencePlate": item.licensePlate,
        "locID": locId
      }
      dispatch(changeActiveVehicle(_changeVehicle))
    } else {
      dispatch(showNotification({
        message: t('selectVehicle'),
        type: 'error'
      }))
    }

  }

  const _confirmChangeVehicle = () => {
    showOverlay<OverlayMessage>('OVERLAY_MESSAGE', {
      onSubmit: _editVehicle,
      message: t('errorVehicleChangeOnce')
    });
  }

  const _checkrenewTime = () => {
    if (renewnoticetime) {
      const overTime = moment(stopDate).subtract(renewnoticetime, 'minutes')
      if (moment().format() >= moment(overTime).format()) {
        return true
      } else {
        return false
      }
    }
  }

  const _submitStartStopAutoRewnew = () => {
    let reqBody = {
      "sessionID": recordID,
      "autorenew": isAutoRenew == 1 ? 0 : 1
    }
    dispatch(startStopAutoRenew(reqBody))
  }

  return (
    <View>
      <View style={[Flex.rowCrossFlexStart, Flex.fill, Global.mb2]}>
        <View style={Flex.fill}>
          <Text allowFontScaling={false} fontSize="h2" fontWeight="semiBold" style={Global.mr5}>
            {location.name}
          </Text>
          <Text allowFontScaling={false} color="secondary" fontSize="medium">
            {location.address}
          </Text>
        </View>
      </View>
      <View style={Global.mb1}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text allowFontScaling={false} style={{ color: Colors.OuterSpace }} fontWeight='bold' fontSize="h5">{vehicle.licensePlate} </Text>
            <View style={{ height: 5, width: 5, borderRadius: 5, backgroundColor: Colors.BaliHai }} />
            <Text numberOfLines={1} allowFontScaling={false} color="secondary" fontSize="h6"> {vehicle.name}</Text>

            {editVehicle && isLpnEdit == 0 ? <TouchableOpacity style={{ marginLeft: 5, borderBottomWidth: 0.8, borderBottomColor: Colors.CuriousBlue }}
              onPress={() => _confirmChangeVehicle()}>
              <TextI style={{ color: Colors.CuriousBlue, ...Fonts.bold }}>{t('edit')}</TextI>
            </TouchableOpacity> : isLpnEdit == 1 ? <TextI style={{ color: 'lightgrey', ...Fonts.bold }}> {t('edited')}</TextI> : null
            }
          </View>

          <View>
            {isAutoRenew == 1 || _checkrenewTime() ?
              active ?
                <View style={{ alignItems: 'center', alignSelf: 'flex-end' }}>
                  <TouchableOpacity onPress={() => _submitStartStopAutoRewnew()} style={{ marginLeft: 5, borderBottomWidth: 0.8, borderBottomColor: Colors.CuriousBlue }}>
                    <Text fontSize='h6' style={{ color: Colors.CuriousBlue, ...Fonts.bold }}>{isAutoRenew == 1 ? `${t('cancelRenew')}` : `${t('autoRenew')}`}</Text>
                  </TouchableOpacity>
                </View> : null : null
            }
          </View>
        </View>

        {validation ? (
          <Text color="secondary" fontSize="medium" style={Global.mt2}>
            {t('validation')}: {validation}
          </Text>
        ) : null}
      </View>
    </View>
  )
}

SessionInfo.Time = Time;

export default SessionInfo;
