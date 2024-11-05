import React, { useRef } from 'react';
import { View, Dimensions, Alert, Platform } from 'react-native';
import Text from '@components/Text';
import styles from '@components/OverlayItemPicker/styles';
import Button from '@components/Button';
import { dismissOverlay } from '@navigation/actions';
import { ScreenProps, DeleteAccountOverlayPassProps } from '@types';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';

interface Props extends ScreenProps, DeleteAccountOverlayPassProps { }

const DeleteAccountOverlay: React.FC<Props> = ({ componentId, onDelete }) => {
    const animRef = useRef(null)
    const { t } = useTranslation();

    const _onSubmitDelete = () => {
        onDelete()
        dismissOverlay(componentId)
    }
    return (
        <>
            <View style={styles.container}>
                <Animatable.View ref={animRef} duration={500} animation="slideInUp" style={{ padding: 10, maxHeight: Dimensions.get('window').height - 100, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: 'white', position: 'absolute', bottom: 0, width: Dimensions.get('window').width }}>
                    <Text fontSize='h2' fontWeight='bold'>{t('deleteAccount')}?</Text>
                    <View style={styles.separator} />
                    <View style={{ padding: 10 }}>
                        <Text fontSize='h5' fontWeight='semiBold'>{t('deleteAccountDescription')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button style={{ marginBottom: Platform.OS == 'ios' ? 10 : 0, width: '48%' }} activeOpacity={0.9}
                            onPress={() => dismissOverlay(componentId)}
                            uppercase
                            color="primary"
                            title={t('close')}
                        />
                        <Button style={{ marginBottom: Platform.OS == 'ios' ? 10 : 0, width: '48%' }} activeOpacity={0.9}
                            onPress={() => _onSubmitDelete()}
                            uppercase
                            color="primary"
                            title={t('continue')}
                        />
                    </View>
                </Animatable.View>
            </View>
        </>
    );
};

export default DeleteAccountOverlay;
