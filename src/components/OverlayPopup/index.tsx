import React, { useRef } from 'react';
import { View, Dimensions, ScrollView, Platform } from 'react-native';
import Text from '@components/Text';
import styles from '@components/OverlayItemPicker/styles';
import Button from '@components/Button';
import { dismissOverlay, } from '@navigation/actions';
import { OverlayPopupPassProps, ScreenProps } from '@types';
import * as Animatable from 'react-native-animatable';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

interface Props extends ScreenProps, OverlayPopupPassProps { }

const OverlayPopup: React.FC<Props> = ({
  componentId,
  manual_start,
  onRedirect,
  message
}) => {
  const animRef = useRef(null)
  const {t} = useTranslation()
  const _checkManualStartRedirect = () => {
    if (manual_start === '1') {
      dismissOverlay(componentId)
    } else {
      onRedirect()
      dismissOverlay(componentId)
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Animatable.View ref={animRef} duration={500} animation="slideInUp" style={{ padding: 10, maxHeight: Dimensions.get('window').height - 100, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: 'white', position: 'absolute', bottom: 0, width: Dimensions.get('window').width }}>
          <Text fontSize='h2' fontWeight='bold'>App</Text>
          <View style={styles.separator} />
          <ScrollView>
            <View style={{ padding: 10 }}>
              <Text fontSize='h5' fontWeight='semiBold'>{message}</Text>
            </View>
          </ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button style={{ marginBottom: Platform.OS == 'ios' ? 10 : 0, width: manual_start === '1' ? '100%' : '48%' }} activeOpacity={0.9}
              onPress={() => dismissOverlay(componentId)}
              uppercase
              color="primary"
              title={t('close')}
            />
            {manual_start === '1' ? null :
              <Button style={{ marginBottom: Platform.OS == 'ios' ? 10 : 0, width: '48%' }} activeOpacity={0.9}
                onPress={() => _checkManualStartRedirect()}
                uppercase
                color="primary"
                title={t('continue')}
              />
            }
          </View>
        </Animatable.View>
      </View>

    </>
  );
};

export default OverlayPopup;
