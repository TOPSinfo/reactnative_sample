import { StyleSheet } from 'react-native';

import { Colors, Flex, Global } from '@styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    elevation: 1,
    overflow: 'visible',
    backgroundColor: Colors.White,
  },
  wrapper: {
    ...Global.gutters,
  },
  logo: {
    alignItems: 'center',
  },
  cta: {
    marginBottom: 50,
    textAlign: 'center',
  },
  field: {
    marginBottom: 25,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
  },
  forgotPassword: {
    padding: 0,
    marginTop: 35,
    alignSelf: 'flex-start',
  },
  footer: {
    ...Global.py4,
    ...Flex.rowCenter,
    elevation: 30,
    backgroundColor: Colors.White,
  },
});
