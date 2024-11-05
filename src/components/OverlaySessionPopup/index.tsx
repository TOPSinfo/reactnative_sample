import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Text from '@components/Text';
import { OverlaySessionPopup, ScreenProps } from '@types';
import card from '@styles/shared/card';
import Card from '@components/Card';
import { useTranslation } from 'react-i18next';
import { dismissOverlay } from '@navigation/actions';
import styles from './styles';
import BaseCheckbox from '@components/Form/BaseCheckbox';
import { lastChild } from '@utils';
import { NavigationScreenIds } from '@consts/navigation';
interface Props extends ScreenProps, OverlaySessionPopup { }

const OverlaySession: React.FC<Props> = ({
    componentId,
    session,
    onSubmit,

}) => {
    const { t } = useTranslation();
    const [selectedSession, setSelectedSession] = useState(null)
    useEffect(()=>{
        setSelectedSession(session[0].recordID)
    },[session])
    const handleOnSubmit = () => {
        onSubmit(selectedSession);
        dismissOverlay(componentId);
    };
    return (
        <>
            <View style={styles.container}>
                <Card
                    style={styles.card}
                    showActions
                    title={{ value: t('selectSessionEnd'), color: 'secondary' }}
                    actions={[
                        {
                            label: t('close'),
                            color: 'primary',
                            props: {
                                onPress: () => {
                                    dismissOverlay(componentId),
                                    dismissOverlay(NavigationScreenIds.LOADER_SCREEN);
                                },
                            },
                        },
                        {
                            label: t('end'),
                            color: 'danger',
                            props: {
                                onPress: () => {
                                    handleOnSubmit()
                                },
                            },
                        },
                    ]}
                >
                    <View style={[card.wrapper, { maxHeight: Dimensions.get('window').height / 1.7 }]}>
                        <View style={card.content}>
                            <Text fontSize="h5" color="secondary" style={{ marginBottom: 10 }}>{t('multipleSessionToEnd')}</Text>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {session?.map((item: any, index: number) => (
                                    <View key={index} style={styles.item}>
                                        <BaseCheckbox
                                            label={
                                                <View style={styles.checkboxItem}>
                                                    <Text
                                                        color="accent"
                                                        fontSize="h5"
                                                        fontWeight="bold"
                                                        style={styles.sessionList}
                                                    >
                                                        {item.locationInfo?.location?.name}
                                                    </Text>
                                                    <Text fontSize="h6" color="secondary">
                                                        {item.vehicle?.licensePlate}
                                                    </Text>

                                                </View>
                                            }
                                            value={item.recordID === selectedSession}
                                            onPress={() => setSelectedSession(item.recordID)}
                                        />
                                        {!lastChild(index, session.length) && (
                                            <View style={styles.separator} />
                                        )}
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </Card>
            </View>
        </>
    );
};

export default OverlaySession;
