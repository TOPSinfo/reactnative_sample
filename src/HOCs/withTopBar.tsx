import React, { useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { ScreenProps } from '@types';
import TopBar, { TopBarType } from '@components/TopBar';

const withTopBar = (type?: TopBarType) => <P extends {}>(
  Component: React.ComponentType<P>
) => (props: P) => {
  const [scrolling, setScrolling] = useState(false);
  const { componentId, title } = props as P & ScreenProps;

  return (
    <>
      <TopBar
        type={type}
        title={title}
        scrolling={scrolling}
        componentId={componentId}
      />
      <Component
        {...props}
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          type === 'overlay' && setScrolling(e.nativeEvent.contentOffset.y > 0);
        }}
      />
    </>
  );
};

export default withTopBar;
