import { StyleSheet } from 'react-native';

import { Colors, Flex } from '@styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 25,
  },
  header: {
    marginVertical: 60,
    ...Flex.rowMainCenter,
  },
  field: {
    marginBottom: 25,
  },
});
