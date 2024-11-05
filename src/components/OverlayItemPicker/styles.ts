import { StyleSheet} from 'react-native';
import color from 'color';

import { Colors, Flex } from '@styles';

export default StyleSheet.create({
  container: {
    ...Flex.centerFill,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 5,
    position: 'absolute',
    backgroundColor: color(Colors.White).alpha(0.75).toString(),
  },
  card: {
    marginHorizontal: 25,
  },
  item: {
    paddingTop: 5,
  },
  licensePlate: {
    marginTop: 4,
  },
  separator: {
    height: 1,
    marginVertical: 15,
    backgroundColor: color(Colors.BaliHai).alpha(0.2).toString(),
  },
  checkboxItem: {
    display: 'flex',
    flexDirection: 'column',
  },
});
