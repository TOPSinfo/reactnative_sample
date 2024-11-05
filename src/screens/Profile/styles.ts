import { StyleSheet } from 'react-native';
import Flex from '@styles/Flex';
import { Global } from '@styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    marginBottom: 10,
  },
  wrapper: {
    flex: 1,
    padding: 30,
    ...Flex.columnCenter,
  },
  card: {
    marginTop: 25,
    ...Global.gutters,
    ...Flex.center,
  },
  text: {
    marginTop: 5,
  },
  passwordIcon: {
    marginTop: 2,
  },
});
