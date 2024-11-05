import React from 'react';
import { Provider } from 'react-redux';

import store from '@redux/store';

const withRedux = <P extends {}>(Component: React.ComponentType<P>) => (
  props: P
) => (
  <Provider store={store}>
    <Component {...props} />
  </Provider>
);

export default withRedux;
