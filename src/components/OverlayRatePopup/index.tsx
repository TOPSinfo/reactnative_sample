import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, ScrollView, Dimensions, } from 'react-native';
import styles from '@components/OverlayRatePopup/styles';
import { OverlayRatePopupProps, Rate, ScreenProps } from '@types';
import PaymentOptions from '@components/PaymentOptions';
import Text from '@components/Text'
import Card from '@components/Card';
import card from '@styles/shared/card';
import { dismissOverlay } from '@navigation/actions';
import { useTranslation } from 'react-i18next';
import { lastChild } from '@utils';
import BaseCheckbox from '@components/Form/BaseCheckbox';
import { toggleLoader } from '@redux/slices/loader';
import { NavigationScreenIds } from '@consts/navigation';

interface Props extends ScreenProps, OverlayRatePopupProps { }

const OverlayRatePopup: React.FC<Props> = ({
    componentId,
    resourseData,
    onSubmit,
}) => {
    const { t } = useTranslation()
    const [selectedRate, setSelectedRate] = useState<Rate | null>(null);

    useEffect(() => {
        if (resourseData?.rates) {
            setSelectedRate(resourseData.rates[0].recordID)
        }
    }, [resourseData])

    const handleOnSubmit = () => {
        onSubmit(selectedRate);
        dismissOverlay(componentId);
    };
    return (
        <>
            <View style={styles.container}>
                <Card
                    style={styles.card}
                    showActions
                    title={{ value: 'Select Rate', color: 'secondary' }}
                    actions={[
                        {
                            label: t('close'),
                            color: 'danger',
                            props: {
                                onPress: () => {
                                    dismissOverlay(componentId),
                                    dismissOverlay(NavigationScreenIds.LOADER_SCREEN);
                                },
                            },
                        },
                        {
                            label: t('select'),
                            color: 'primary',
                            props: {
                                onPress: () => {
                                    handleOnSubmit();
                                },
                            },
                        },
                    ]}
                >
                    <View style={[card.wrapper, { maxHeight: Dimensions.get('window').height / 1.7 }]}>
                        <View style={card.content}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {resourseData?.rates?.map((item: any, index: number) => (
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
                                                        {item.summary}
                                                    </Text>
                                                </View>
                                            }
                                            value={item.recordID === selectedRate}
                                            onPress={() => setSelectedRate(item.recordID)}
                                        />
                                        {!lastChild(index, resourseData.rates.length) && (
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

export default OverlayRatePopup;
