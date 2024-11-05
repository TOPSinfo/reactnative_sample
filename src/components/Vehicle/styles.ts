import { StyleSheet } from 'react-native';

import { Colors } from '@styles';

export default StyleSheet.create({
  item: {
    marginTop: 20,
    marginHorizontal: 30,
  },
  itemLast: {
    marginBottom: 20,
  },
  content: {
    padding: 20,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    marginRight: 20,
  },
  name: {
    fontSize: 20,
    marginBottom: 3,
    fontWeight: '700',
    color: Colors.Fiord,
  },
  licensePlate: {
    fontSize: 16,
    color: Colors.GullGray,
  },
});
