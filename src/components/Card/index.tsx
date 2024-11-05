import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Button from '@components/Button';
import lastChild from '@utils/lastChild';
import Content, { Title } from './Content';
import firstChild from '@utils/firstChild';
import Action, { ActionProps } from './Action';

import styles from './styles';
import { Global } from '@styles';

interface Options {
  title?: Title;
  showActions?: boolean;
  actions?: ActionProps[];
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

type CollapseOptions =
  | { collapseIcon?: undefined; onCollapse?: undefined }
  | { collapseIcon: Element; onCollapse: () => void };

type Props = Options & CollapseOptions;

const Card: React.FC<Props> = ({
  title,
  style,
  children,
  showActions,
  contentStyle,
  actions = [],
  ...rest
}) => (
  <View style={style}>
    <Content
      title={title}
      style={[
        styles.container,
        showActions && styles.withActions,
        contentStyle,
      ]}>
      {children}
      {rest.collapseIcon && (
        <Button
          icon={rest.collapseIcon}
          onPress={rest.onCollapse}
          style={styles.collapseIcon}
        />
      )}
    </Content>
    {showActions && (
      <View style={styles.actions}>
        {actions.map(({ style, ...props }, index) => (
          <Action
            {...props}
            key={index}
            style={[
              Global.py3,
              style,
              firstChild(index) && styles.actionFirst,
              lastChild(index, actions.length) && styles.actionLast,
            ]}
          />
        ))}
      </View>
    )}
  </View>
);

export default Card;
