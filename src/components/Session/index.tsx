import React, { useRef, useState } from 'react';
import { View, StyleProp, ViewStyle, Animated, PixelRatio, TouchableOpacity } from 'react-native';
import { parseISO, differenceInMinutes, differenceInHours, format } from 'date-fns';
import Card from '@components/Card';
import Text from '@components/Text';
import {
  ScreenProps,
  ExtendSessionPassProps,
  Session as SessionType,
  InvoicePassProps,
} from '@types';
import ArrowExpandIcon from '@assets/arrow-expand-ico.svg';
import ArrowCollapseIcon from '@assets/arrow-collapse-ico.svg';
import { goTo, showOverlay } from '@navigation/actions';
import useSessions from '@hooks/useSessions';
import SessionInfo from '@components/SessionInfo';
import { ActionProps } from '@components/Card/Action';
import styles from './styles';
import moment from 'moment'
import useAuth from '@hooks/useAuth';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';


interface Props {
  active: boolean;
  session: SessionType;
  style?: StyleProp<ViewStyle>;
  componentId: ScreenProps['componentId'];
}

const Session: React.FC<Props> = ({ componentId, style, active, session, }) => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const heightAnimation = useRef(new Animated.Value(0)).current;
  const mBottomAnimation = useRef(new Animated.Value(0)).current;
  const { endSession } = useSessions();
  const dispatch = useDispatch()
  const parsedStartTime = parseISO(session.startDate);
  const parsedEndTime = parseISO(session.authStopDate);

  const EndTime = moment(session.authStopDate)
  const startTime = moment().utc()

  const expiresInHours = differenceInHours(parsedEndTime, new Date());
  const expiresInMinutes = differenceInMinutes(parsedEndTime, new Date());

  const actions: ActionProps[] = [];
  const before = expiresInMinutes < 0 ? ` ${t('ago')}` : '';

  const getExpireDuration = moment.duration(EndTime.diff(startTime));
  const expiresInText = getExpireDuration.asDays() >= 1 ?
    getExpireDuration.days() + ` ${t('days')}` :
    getExpireDuration.hours() > 0 ? getExpireDuration.hours() + ' hrs ' + getExpireDuration.minutes() + ` ${t('min')}` : getExpireDuration.minutes() + ` ${t('min')}`
  if (active) {
    if (session.locationInfo.extensionRates) {
      actions.push({
        label: t('extend'),
        color: 'primary',
        props: {
          onPress: () =>
            goTo<ExtendSessionPassProps>(componentId, 'EXTEND_SESSION_SCREEN', {
              disableSidebar: true,
              props: {
                sessionId: session.recordID,
                title: t('extendParkingSession'),
              },
            }),
        },
      });
    }

    actions.push({
      label: t('end'),
      color: 'danger',
      props: {
        onPress: () => {
          onEndSession()
        },
        disabled: session.isPrepaid ? true : false
      },
    });
  } else {
    actions.push({
      label: t('invoice'),
      color: 'primary',
      props: {
        onPress: () => {
          showOverlay<InvoicePassProps>('INVOICE_SCREEN', {
            session: session
          })
        }
      },
    });
  }

  const onEndSession = () => {
    if (session.locationInfo.location?.exitgates?.length == 1) {
      const endSessionData = {
        equipment: {
          'recordID': session.locationInfo.location.exitgates[0].equipment_id
        }
      }
      endSession(session.recordID, endSessionData);
    } else if (session.locationInfo.location?.exitgates?.length > 1) {
      goTo(componentId, 'GATE_SCREEN', {
        disableSidebar: true,
        props: { title: t('selectExitGate'), session: session }
      })
    } else {
      endSession(session.recordID, {})
    }
  }

  const hourMintues = () => {
    if (active) {
      let startTime = moment(session.startDate)
      let currentTime = moment().utc()
      const duration = moment.duration(currentTime.diff(startTime));
      if (duration.asDays() >= 1) {
        return `${t('started')} ` + duration.days() + ` ${t('days')} ${t('ago')} `
      }
      if (duration.hours() >= 1) {
        return `${t('started')} ` + duration.hours() + ' hrs ' + duration.minutes() + ` min ${t('ago')}`
      } else if (duration.minutes() > 0) {
        return `${t('started')} ` + duration.minutes() + ` ${t('min')} ${t('ago')}`
      } else {
        return `${t('started')} ` + duration.seconds() + ` sec ${t('ago')}`
      }
    }
  }

  const expandView = () => {
    if (active) {
      return undefined
    } else {
      Animated.parallel([
        Animated.timing(heightAnimation, {
          toValue: show ? 0 : 65,
          duration: 325,
        }),
        Animated.timing(mBottomAnimation, {
          toValue: show ? 0 : 15,
          duration: 325,
        }),
      ]).start();
      setShow(!show);
    }
  }
  return (
    <Card
      showActions={true}
      style={style}
      onCollapse={expandView}
      collapseIcon={active ? <View /> : show ? <ArrowCollapseIcon /> : <ArrowExpandIcon />}
      actions={actions}>
      <View style={styles.wrapper}>
        <View>
          <View style={styles.content}>
            <SessionInfo
              vehicle={session.vehicle}
              location={session.locationInfo.location}
              validation={session.validation?.validationDescription}
              editVehicle={true}
              recordID={session.recordID}
              isLpnEdit={session.isLpnEdit}
              locId={session.locationInfo.location.recordID}
              isAutoRenew={session.isAutoRenew}
              renewnoticetime={session.locationInfo.location.renewnoticetime}
              stopDate={session.authStopDate}
              active={active}
            />
            <Animated.View
              style={[
                styles.session,
                {
                  height: active ? -1 : heightAnimation,
                  marginBottom: active ? 15 : mBottomAnimation,
                },
              ]}>
              <SessionInfo.Time start={parsedStartTime} end={active ? session.isPrepaid ? parsedEndTime : null : parsedEndTime} />
            </Animated.View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View
              style={[
                // styles.remaining,
                !active && styles.inactivePrice,
                !show && { marginTop: -10 },
                { width: '70%', paddingLeft: 15, alignSelf: 'center' }
              ]}>
              {active ? (
                <>
                  <Text
                    uppercase
                    color="danger"
                    fontSize="small"
                    allowFontScaling={false}
                    fontWeight="bold"
                    style={{ paddingVertical: active && session.isPrepaid ? 0 : 10, }}>
                    {active && session.isPrepaid ? before ? t('expired') : `Prepaid - ${t('expiresIn')} ` + expiresInText : 'POSTPAID - ' + hourMintues()}
                  </Text>
                </>
              ) : (
                <Text
                  allowFontScaling={false}
                  uppercase
                  color="secondary"
                  fontSize="medium"
                  fontWeight="bold">
                  {t('finalParkingPrice')}
                </Text>
              )}
            </View>
            <View style={[styles.priceWrapper, !active && styles.finalPrice, { top: 1 }]}>
              <Text allowFontScaling={false} color="light" fontWeight="bold">
                ${session.currentCharge}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card >
  );
};

export default Session;
