import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView, View, Image, TouchableOpacity, Alert } from 'react-native';
import Text from '@components/Text';
import useCards from '@hooks/useCards';
import Button from '@components/Button';
import { goTo, showOverlay } from '@navigation/actions';
import useParking from '@hooks/useParking';
import useVehicles from '@hooks/useVehicles';
import PaymentOptions from '@components/PaymentOptions';
import {
  OverlayProps,
  NewSessionPassProps,
  VehiclePassProps,
  Rate,
  OverlayItemPickerPassProps,
} from '@types';
import useSessions from '@hooks/useSessions';
import AddIcon from '@assets/add-ico.svg';
const stallIcon = require('@assets/stall-icon.png');
import StartSessionIcon from '@assets/start-session-ico.svg';
const gateIcon = require('../../assets/gateicon.png');
import styles from './styles';
import { Global, Colors } from '@styles';
import { Navigation } from 'react-native-navigation';
import { activeScreenSet } from '@navigation';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import { useTranslation } from 'react-i18next';
const infoIcon = require('@assets/info.png')
import moment from 'moment';
import color from 'color'
import { min } from 'lodash';
const add = require('@assets/add.png')
const minus = require('@assets/minus.png')
interface InjectedProps extends OverlayProps, NewSessionPassProps { }
let finalDuration: any = 0
let duration: any
let totalCost: number
const NewSession: React.FC<InjectedProps> = ({
  lotId,
  onScroll,
  componentId,
  locationData,
}) => {
  const { cards } = useCards();
  const { t } = useTranslation()
  const { lots, getLotInfo } = useParking();
  const { vehicles, defaultVehicle } = useVehicles();
  const { startSession } = useSessions();
  const lot = locationData
    ? locationData
    : lots.find(l => l.location.recordID === lotId);
  const [selectedRate, setSelectedRate] = useState<Rate | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(defaultVehicle);
  const [isSelected, setSelection] = useState(false);

  const canStartSession = vehicles.length && cards.length;
  const [initDuration, setinitDuration] = useState<any>(0)
  const [incrementalDuration, setIncrementralDuration] = useState<any>(0)

  const validation = useMemo(() => {
    if (!selectedVehicle || !lot?.validations?.length) {
      return null;
    }
    const validationByVehicle = lot.validations.find(
      (val: any) => val.matchLPN === selectedVehicle.licensePlate
    );
    return (
      validationByVehicle ??
      lot.validations.filter((v: any) => !v.matchLPN)?.[0]
    );
  }, [lot, selectedVehicle]);

  useEffect(() => {
    if (canStartSession) {
      getLotInfo(lotId);
    }
  }, [getLotInfo, lotId, canStartSession]);
  useEffect(() => {
    if (lot?.rates) {
      duration = lots && moment.duration(Number(lot?.rates[0]?.maxSessionDuration), 'minutes')
      setinitDuration(moment(lot?.rates[0]?.initialDuration, 'minutes'))
      const _initDuration = moment(lot?.rates[0]?.initialDuration, 'minutes')
      finalDuration = moment(_initDuration).format('mm')
      totalCost = Number(lot.rates[0]?.initialCost)
    }
  }, [lots])

  const handleVehicleChangePress = () => {
    showOverlay<OverlayItemPickerPassProps>('OVERLAY_ITEM_PICKER_SCREEN', {
      items: vehicles,
      // this can never be `undefined`, because if there aren't any vehicles error is shown
      //TODO: Change this
      initialSelectedItem:
        selectedVehicle! === undefined ? vehicles[0] : selectedVehicle!,
      onSubmit: item => setSelectedVehicle(item),
      fromQR: false,
      editVehicle: false
    });
  };
  /**
   * Sets up and starts a new session with the provided session data.
   * 
   * The session data includes information about the vehicle, location, rate, and stalls.
   * Additional data is added based on certain conditions:
   * - If the location has a timeslot flag, the amount and rate record ID are adjusted.
   * - If there is only one entry gate, the equipment record ID is added.
   * - If auto-renew is enabled, the renew status is set based on the selected state.
   * 
   * @returns {void}
   */
  const setStartSession = () => {
    const sessionData: any = {
      vehicle: {
        type: 'vehicle',
        name:
          selectedVehicle! !== undefined
            ? selectedVehicle!.name
            : vehicles[0].name,
        licensePlate:
          selectedVehicle! !== undefined
            ? selectedVehicle!.licensePlate
            : vehicles[0].licensePlate,
      },
      location: {
        type: 'location',
        recordID: lot?.location.recordID,
      },
      rate: {
        recordID: selectedRate?.recordID,
      },
      stalls: {
        is_manual: false,
        stallID: null,
      },
    };
    if (lot?.location?.times_slotflag === "1") {
      sessionData['amount'] = Number(totalCost).toPrecision(1)
      const durationData = moment.duration(Number(finalDuration), 'minutes')
      sessionData.rate['recordID'] = String(durationData) + '|' + lot.rates[0]?.rateId
    }
    if (lot?.location.entrygates?.length === 1) {
      let equipment = {
        recordID: lot?.location.entrygates[0]?.equipment_id,
      };
      sessionData.equipment = equipment;
    }
    if (lot?.location.autorenew == "1") {
      sessionData['renew'] = isSelected ? 1 : 0
    }
    startSession(sessionData, componentId);
  };

  const onStartSessionPress = () => {
    if (lot?.location.entrygates?.length > 1) {
      goTo(componentId, 'GATE_SCREEN', {
        disableSidebar: true,
        props: {
          title: 'errorSelectEntryGate',
          lot: lot,
          selectedVehicle: selectedVehicle,
          selectedRate: selectedRate,
        },
      });
    } else {
      if (lot?.location.stall_management === "1") {
        if (lot?.location.stallRules === 'Manually') {
          if (lot?.stalls) {
            goTo(componentId, 'STALL_SCREEN', {
              disableSidebar: true,
              props: {
                title: 'selectStall',
                selectedRate: selectedRate,
                selectedVehicle: selectedVehicle,
                location: lot.location,
                rate: selectedRate,
                stallList: lot.stalls,
                lot: lot,
              },
            });
          } else {
            setStartSession();
          }
        } else {
          setStartSession();
        }
      } else {
        setStartSession();
      }
    }
  };

  const renderMessage = () => {
    const value = !vehicles.length;

    const go = value
      ? () =>
        goTo<VehiclePassProps>(componentId, 'VEHICLE_SCREEN', {
          disableSidebar: true,
          props: { mode: 'add', title: 'add/editVehicle' },
        })
      : () =>
        goTo(componentId, 'CREDIT_CARD_SCREEN', {
          disableSidebar: true,
          props: { title: 'addPaymentMethod' },
        });

    return (
      <View style={[Global.mt5, Global.mx5]}>
        <Text
          color="danger"
          align="center"
          fontSize="medium"
          fontWeight="mediumBold"
          style={Global.mb3}>
          {value ? t("noVehiclesAddOne") : t("noCreditCardsAddOne")}
        </Text>
        <Button
          uppercase
          onPress={go}
          color="secondary"
          icon={<AddIcon />}
          title={value ? t("addNewVehicle") : t("addPaymentMethod")}
        />
      </View>
    );
  };
  const SetStartSessionTitle = () => {
    if (lot?.location.entrygates?.length > 1) {
      return t('selectGate');
    } else if (
      lot?.location.stall_management === "1" &&
      lot.location.stallRules === 'Manually' &&
      lot.stalls?.length > 0
    ) {
      return t('selectStall');
    }
    return t('startMyParking');
  };
  const setStartSessionIcon = () => {
    if (lot?.location.entrygates?.length > 1) {
      return <Image style={styles.sessionIcon} source={gateIcon} />;
    } else if (
      lot?.location.stall_management === "1" &&
      lot.location.stallRules === 'Manually' &&
      lot.stalls?.length > 0
    ) {
      return <Image style={styles.sessionIcon} source={stallIcon} />;
    } else {
      return <StartSessionIcon />;
    }
  };


  const _addRemoveDuration = (type: string) => {
    const tempDuration = moment(initDuration).format('mm')
    if (finalDuration != lot?.rates[0].maxSessionDuration) {
      if (type == 'add') {
        finalDuration = Number(finalDuration) + Number(tempDuration)
        const hrs = moment.duration(Number(finalDuration), 'minutes')
        if (hrs.asHours() <= lot?.rates[0].maxSessionDuration) {
          setIncrementralDuration(hrs)
          if (Number(lot.rates[0]?.maximumCost) >= Number(totalCost)) {
            totalCost = Number(totalCost) + Number(lot.rates[0]?.incrementalCost)
          }
        }

      } else {
        finalDuration = Number(finalDuration) - Number(tempDuration)
        const hrs = moment.duration(Number(finalDuration), 'minutes')
        setIncrementralDuration(hrs)
        if (Number(lot.rates[0]?.initialCost) <= Number(totalCost)) {
          totalCost = Number(totalCost) - Number(lot.rates[0]?.incrementalCost)
        }
      }
    }
  }

  const _displayDuration = () => {
    if (incrementalDuration > 0) {
      if (incrementalDuration.hours() > 0) {
        if (incrementalDuration.minutes() > 0) {
          return <Text color="outerspace"
            fontSize="h4">{incrementalDuration?.hours() + ' hour ' + incrementalDuration.minutes() + ' minutes'}</Text>
        } else {
          return <Text color="outerspace"
            fontSize="h4">{incrementalDuration?.hours() + ' hour '}</Text>
        }
      } else {
        return <Text color="outerspace"
          fontSize="h4">{incrementalDuration.minutes() + ' minutes'}</Text>
      }
    } else {
      return <Text color="outerspace"
        fontSize="h4">{moment(initDuration).format('mm') + ' minutes'}</Text>
    }
  }


  return (
    <>
      <ScrollView style={styles.container} onScroll={onScroll}>
        <View style={styles.wrapper}>
          <View>
            <Text
              uppercase
              fontSize="small"
              fontWeight="mediumBold"
              style={styles.title}
            >
              {t('parkingInformation')}
            </Text>
            <View style={styles.header}>
              <Text fontSize="h2" fontWeight="semiBold">
                {lot?.location.name}
              </Text>
            </View>
            <Text color="secondary" fontSize="medium" style={styles.address}>
              {lot?.location.address}
            </Text>
            <Text color="secondary" fontSize="medium">
              {lot?.location.city}, {lot?.location.state}
            </Text>
            {validation ? (
              <>
                <Text
                  color="secondary"
                  fontSize="medium"
                  style={styles.validationText}
                >
                  {t("validationWillBeApplied")}:
                </Text>
                <Text
                  color="secondary"
                  fontSize="medium"
                  style={styles.validationContent}
                >
                  {t('validation')}: {validation.validationDescription}
                </Text>
              </>
            ) : null}
          </View>
          <View style={styles.separator} />
          {!!vehicles.length && (
            <View style={Global.mb5}>
              <Text
                uppercase
                fontSize="small"
                fontWeight="mediumBold"
                style={styles.title}
              >
                {t('vehicle')}
              </Text>
              <View style={styles.header}>
                <Text
                  color="outerspace"
                  fontSize="h5"
                  fontWeight="bold"
                  style={styles.licensePlate}
                >
                  {selectedVehicle?.licensePlate
                    ? selectedVehicle?.licensePlate
                    : vehicles[0].licensePlate}
                </Text>
                <Button
                  title={t("change")}
                  color="secondary"
                  style={styles.action}
                  onPress={handleVehicleChangePress}
                />
              </View>
              <Text fontSize="h6" color="secondary">
                {selectedVehicle?.name
                  ? selectedVehicle?.name
                  : vehicles[0].name}
              </Text>
            </View>
          )}

          {canStartSession && lot?.location.autorenew == "1" ?
            <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text fontWeight='mediumBold'>{t("autoRenew")}</Text>
                <Popover
                  popoverStyle={{ backgroundColor: Colors.Black }}
                  placement={PopoverPlacement.RIGHT}
                  offset={10}
                  animationConfig={{ useNativeDriver: true }}
                  from={(
                    <TouchableOpacity>
                      <Image style={{ height: 18, width: 18, left: 5, resizeMode: 'contain', tintColor: Colors.DoveGray }} source={infoIcon} />
                    </TouchableOpacity>
                  )}>
                  <View style={{ padding: 8 }}>
                    <Text color='light' fontWeight='mediumBold' fontSize='regular'>{t("sessionAutoRenewDescription")}.</Text>
                  </View>
                </Popover>
              </View>
              <BouncyCheckbox
                size={25}
                fillColor={Colors.CuriousBlue}
                iconStyle={{ borderColor: Colors.CuriousBlue }}
                unfillColor={Colors.White}
                onPress={(isChecked: boolean) => setSelection(isChecked)} />
            </View> : null
          }
          {lot && lot?.location.monthlyPermit == "1" ?
            <View style={styles.monthlPermitContainer}>
              <View style={styles.permitSubContainer}>
                <View style={styles.permitSubViewContainer}>
                  <Text fontWeight='normal' fontSize='h5'>{'Per day rate'}</Text>
                </View>
                <View style={styles.permitTextView}>
                  <Text color={'accent'} fontSize='h4' fontWeight='mediumBold'>${lot?.location.day_rate}</Text>
                </View>
              </View>

              <View style={styles.tableContainer}>
                <View style={styles.permitSubViewContainer}>
                  <Text fontWeight='normal' fontSize='h5'>{'Monthly rate'}</Text>
                </View>
                <View style={styles.permitTextView}>
                  <Text color={'accent'} fontSize='h4' fontWeight='mediumBold'>${lot?.location.monthly_rate}</Text>
                </View>
              </View>
            </View>
            : null
          }

          {canStartSession ? (
            <PaymentOptions
              isPrepaid={lot?.location.isPrepaid}
              rates={lot?.rates}
              selectedRate={selectedRate}
              handleRateSelect={setSelectedRate}
            />
          ) : (
            renderMessage()
          )}
        </View>
      </ScrollView>
      <Button
        uppercase
        color="primary"
        style={styles.submit}
        title={SetStartSessionTitle()}
        icon={setStartSessionIcon()}
        disabled={!canStartSession}
        onPress={onStartSessionPress}

      />
    </>
  );
};

export default NewSession;
