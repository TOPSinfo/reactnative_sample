import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, ScrollView, Platform, SafeAreaView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Text from '@components/Text';
import styles from './styles';
import { dismissOverlay, showOverlay, } from '@navigation/actions';
import { OverlayItemPickerPassProps, ScreenProps, OverlayZoneID, OverlayRatePopupProps } from '@types';
import * as Animatable from 'react-native-animatable';
import { Formik, useFormikContext } from 'formik';
import { Colors } from '@styles';
import Regex from '@consts/regex';
import BaseInput, { BaseInputProps } from '@components/Form/BaseInput';
import ResourceService from '@services/ResourceService';
import { useDispatch } from 'react-redux';
import { toggleLoader } from '@redux/slices/loader';
import useVehicles from '@hooks/useVehicles';
import { showNotification } from '@redux/actions/notifications';
import { useTranslation } from 'react-i18next';
import { startSession } from '@redux/actions/sessions';


type InjectedProps = ScreenProps & OverlayZoneID


const ZoneIDPopup: React.FC<InjectedProps> = ({
    componentId,
    dispatch,
    vehicles
}) => {
    const { t } = useTranslation()
    const [zoneIdText, setZoneIdText] = useState<any>(null)
    const [errorText, setErrorText] = useState<any>(null)
    const animRef = useRef(null)

    const _onContinue = (zoneid: any) => {
        getResource(zoneid)
        dismissOverlay(componentId)
    }

    const _selectRates = (resource: any) => {
        if (resource?.rates) {
            selectRates(resource)
        } else {
            dispatch(
                showNotification({
                    type: 'error',
                    message: 'No rates found',
                })
            )
        }
    }

    const getResource = async (zoneid: any) => {
        let resource
        dispatch(toggleLoader(true));
        try {
            resource = await ResourceService.get(zoneid, 'zone');
            dispatch(toggleLoader(false));
            if (resource && resource?.location?.isPrepaid) {
                _selectRates(resource)
            } else {
                dispatch(
                    showNotification({
                        type: 'error',
                        message: 'Postpaid session is not allowed.',
                    })
                )
            }
        } catch (error) {
            dispatch(toggleLoader(false));
            dispatch(
                showNotification({
                    type: 'error',
                    message: error.data.message,
                })
            )
        }
    }
    const selectRates = (resource: any) => {
        showOverlay<OverlayRatePopupProps>('RATE_OVERLAY', {
            resourseData: resource,
            onSubmit: item => selectVehicle(resource, item)

        })
    }
    const _onSubmit = () => {
        const validate = Regex.AlphaNumeric.test(zoneIdText)
        if (validate) {
            _onContinue(zoneIdText)
        } else {
            setErrorText('Only Alphabets and Numbers allowed')
        }
    }
    const displayOverlay = (resource: any, selectedRate: string) => {
        showOverlay<OverlayItemPickerPassProps>('OVERLAY_ITEM_PICKER_SCREEN', {
            items: vehicles,
            initialSelectedItem: vehicles[0],
            onSubmit: item => _startSessionViaQR(resource, item, selectedRate),
            fromQR: true,
            editVehicle: false
        });
    }
    const showErrorMessage = () => {
        dispatch(toggleLoader(false));
        dispatch(
            showNotification({
                type: 'error',
                message: t('addVehicle'),
            })
        )
    }
    const selectVehicle = (resource: any, selectedRate: string) => {
        if (vehicles.length > 1) {
            displayOverlay(resource,selectedRate)
        } else {
            if (vehicles.length == 0) {
                showErrorMessage()
            } else {
                _startSessionViaQR(resource, vehicles[0], selectedRate)
            }
        }
    }

    function _startSessionViaQR(resource: any, currentVehicle: any, selectedRate: string) {
        const sessionData: any = {
            vehicle: {
                type: 'vehicle',
                name:
                    currentVehicle! !== undefined
                        ? currentVehicle!.name
                        : vehicles[0].name,
                licensePlate:
                    currentVehicle! !== undefined
                        ? currentVehicle!.licensePlate
                        : vehicles[0].licensePlate,
            },
            location: {
                type: 'location',
                recordID: resource?.location.recordID,
            },
            rate: {
                recordID: selectedRate,
            },
            stalls: {
                is_manual: false,
                stallID: null,
            },
            equipment: null,
        };
        dispatch(startSession(sessionData, null));
    }
    return (
        <>
            <View style={styles.container}>
                <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS == 'ios' ? 50 : 100} style={{ flex: 1 }} behavior={'height'}>
                    <Animatable.View ref={animRef} duration={500} animation="slideInUp" style={{ height: '22%', borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: 'white', position: 'absolute', bottom: 0, width: Dimensions.get('window').width }}>
                        <View style={{ padding: 10 }}>
                            <Text color='accent' fontWeight='mediumBold' fontSize='h4'>{t("enterZoneId")}</Text>
                            <View style={{ paddingVertical: 10 }}>
                                <BaseInput
                                    style={{ textTransform: 'uppercase' }}
                                    onChangeText={(value: any) => setZoneIdText(value)}
                                />
                                {errorText &&
                                    <Text fontSize='small' fontWeight='bold' color={'danger'}>{errorText}</Text>
                                }
                            </View>
                            <SafeAreaView style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', borderRadius: 10, overflow: 'hidden', }}>
                                <TouchableOpacity style={{ backgroundColor: Colors.DoveGray, width: '50%', alignItems: 'center', paddingVertical: 10,justifyContent:'center' }} onPress={() => {
                                    dismissOverlay(componentId)
                                }}><Text color='light'>{t('close')}</Text></TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: Colors.CuriousBlue, width: '50%', alignItems: 'center', paddingVertical: 10,justifyContent:'center' }} onPress={() => _onSubmit()}>
                                    <Text color='light'>{t('startMyParking')}</Text>
                                </TouchableOpacity>
                            </SafeAreaView>
                        </View>
                    </Animatable.View>
                </KeyboardAvoidingView>
            </View>
        </>
    );
};

export default ZoneIDPopup;
