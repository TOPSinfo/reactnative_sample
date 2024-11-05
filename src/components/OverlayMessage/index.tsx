import React, { useRef } from 'react';
import { View, Dimensions, ScrollView, Platform } from 'react-native';
import Text from '@components/Text';
import styles from './styles';
import Button from '@components/Button';
import { dismissOverlay, } from '@navigation/actions';
import { OverlayMessage, OverlayPopupPassProps, ScreenProps } from '@types';
import * as Animatable from 'react-native-animatable';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

interface Props extends ScreenProps, OverlayMessage { }

const OverlayMessagePopup: React.FC<Props> = ({
    componentId,
    onSubmit,
    message
}) => {
    const { t } = useTranslation();

    const animRef = useRef(null)

    const _onContinue = () => {
        dismissOverlay(componentId)
        onSubmit()
    }

    return (
        <>
            <View style={styles.container}>
                <Animatable.View ref={animRef} duration={500} animation="slideInUp" style={{ padding: 10, maxHeight: Dimensions.get('window').height - 100, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: 'white', position: 'absolute', bottom: 0, width: Dimensions.get('window').width }}>
                    <ScrollView>
                        <View style={{ padding: 10 }}>
                            <Text fontSize='h5' fontWeight='semiBold'>{message.toUpperCase()}</Text>
                        </View>
                    </ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button style={{ marginBottom: Platform.OS == 'ios' ? 10 : 0, width: '48%' }} activeOpacity={0.9}
                            onPress={() => dismissOverlay(componentId)}
                            uppercase
                            color="primary"
                            title={t('close')}
                        />
                        <Button style={{ marginBottom: Platform.OS == 'ios' ? 10 : 0, width: '48%' }} activeOpacity={0.9}
                            onPress={() => _onContinue()}
                            uppercase
                            color="primary"
                            title={t('confirm')}
                        />
                    </View>
                </Animatable.View>
            </View>
        </>
    );
};

export default OverlayMessagePopup;
