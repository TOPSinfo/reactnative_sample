import { StyleSheet } from 'react-native';

import { Colors, Global, Flex } from '@styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    elevation: 1,
    overflow: 'visible',
    backgroundColor: Colors.White,
  },
  wrapper: {
    ...Global.gutters,
    paddingVertical: 35,
  },
  cta: {
    marginBottom: 20,
    textAlign: 'center',
  },
  field: {
    flex: 1,
    marginBottom: 25,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.Black,
  },
  forgotPassword: {
    padding: 0,
    marginTop: 20,
    alignSelf: 'center',
  },
  tos: {
    flexDirection: 'row',
  },
  footer: {
    ...Global.py4,
    ...Flex.rowCenter,
    elevation: 30,
    backgroundColor: Colors.White,
  },
  expirationDate: {
    flexDirection: 'row',
  },
  cardInfo: {
    flexDirection: 'row',
  },
  cardNumber: {
    flex: 3,
  },
});
