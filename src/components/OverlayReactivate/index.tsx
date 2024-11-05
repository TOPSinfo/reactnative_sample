import React from 'react';
import { View, TouchableOpacity, } from 'react-native';
import Text from '@components/Text';
import styles from './styles'
import { dismissOverlay, } from '@navigation/actions';
import { ReactivateSignupOverlayPassProps, ScreenProps } from '@types';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@assets/close-ico.svg';
import { reactivateAccount } from '@redux/actions/auth';
import { Colors } from '@styles';
import { NavigationScreenIds } from '@consts/navigation';

interface Props extends ScreenProps, ReactivateSignupOverlayPassProps { }

const OverlayReactivate: React.FC<Props> = ({
    userId,
    dispatch
}) => {
    const { t } = useTranslation()

    function _reactivateSingUpNewAccount(id: string, type: string) {
        dispatch(reactivateAccount(id, type))
    }
    return (
        <>
            <View style={styles.container}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.deleteContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                dismissOverlay(NavigationScreenIds.OVERLAY_REACTIVATE_SCREEN)
                            }}
                            style={styles.closeBtn}>
                            <CloseIcon width={20} height={20} fill={'black'} />
                        </TouchableOpacity>
                        <Text fontWeight='bold' style={styles.accountDeleteText}>{t('accountDeleted')}</Text>
                        <Text style={styles.reactivateText}>{t('reactivateOrSignup')}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={() => _reactivateSingUpNewAccount(userId?.userid, 'reactivate')}
                                style={styles.reactivateBtn}><Text color='light'>{t('reactivate')}</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => _reactivateSingUpNewAccount(userId?.userid, 'signin')}
                                style={styles.signUpBtn}><Text color='light'>{t('signUp')}</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};

export default OverlayReactivate;
