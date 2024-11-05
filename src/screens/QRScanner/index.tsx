import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { ScreenProps } from '@types';
import Button from '@components/Button';
import { goBack } from '@navigation/actions';
import useResource from '@hooks/useResource';
import CloseIcon from '@assets/close-ico.svg';
import styles from './styles';
import useSessions from '@hooks/useSessions';
import useLoader from '@hooks/useLoader';

interface Props { }

const QrScanner: React.FC<ScreenProps> = ({ componentId }) => {
  const [qrCode, setQrCode] = useState<any>();
  const { getResource } = useResource();
  const { getSessions, sessions } = useSessions();
  const { active } = useLoader()

  useEffect(() => {
    getSessions()
  }, [])

  useEffect(() => {
    if (qrCode) {
      getResource(qrCode, sessions);
      goBack(componentId);
    }
  }, [qrCode, componentId]);

  if (active) return null

  return (
    <View style={styles.container}>
      <RNCamera
        type={RNCamera.Constants.Type.back}
        style={styles.camera}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={barcode => {
          if (barcode && barcode.data) {
            setQrCode(barcode.data);
          }
        }}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        captureAudio={false}>
        <BarcodeMask edgeBorderWidth={8} edgeHeight={30} edgeWidth={30} width={Dimensions.get('window').width / 1.5} height={300} showAnimatedLine={false} outerMaskOpacity={0.8} />
        <Button
          style={styles.backButton}
          onPress={() => goBack(componentId)}
          icon={<CloseIcon width={25} height={25} fill={'white'} />}
        />
      </RNCamera>
    </View>
  );
};

export default QrScanner as React.FC<Props>;
