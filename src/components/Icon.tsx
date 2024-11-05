import React from 'react';
import {
  Image,
  StyleProp,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';

interface Props {
  width?: number;
  height?: number;
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
}

const Icon: React.FC<Props> = ({ source, width = 30, height = 30, style }) => (
  <Image source={source} style={[{ width, height }, style]} />
);
export default Icon;
