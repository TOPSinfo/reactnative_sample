import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

import Text from '@components/Text';
import { SquircleView } from 'react-native-figma-squircle'

import styles from './styles';
import { Colors } from '@styles';

export type Title = {
  value: string;
  /** @default primary(CuriousBlue) */
  color?: keyof typeof colors;
};

interface Props {
  title?: Title;
  style?: StyleProp<ViewStyle>;
}

const colors = {
  primary: Colors.CuriousBlue,
  secondary: Colors.Black,
  danger: Colors.RedDamask,
};

const Content: React.FC<Props> = ({ title, style, children }) => (
  <>
    {title && (
      <SquircleView
        style={{ paddingVertical: 5, alignItems: 'center',width:title?.value.length*10 }}
        squircleParams={{
          cornerSmoothing:0.8,
          topLeftCornerRadius:15,
          topRightCornerRadius:15,
          fillColor: colors[title?.color ?? 'primary'],
        }}>
        <Text
          color="light"
          fontSize="small"
          fontWeight="semiBold"
        >
          {title?.value}
        </Text>
      </SquircleView>
    )}
    <View style={[styles.content, style, title && styles.withTitle]}>
      {children}
    </View>
  </>
);

export default Content;
