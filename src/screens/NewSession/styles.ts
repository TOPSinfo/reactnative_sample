import { StyleSheet } from 'react-native';
import color from 'color';

import { Colors, Global, Flex } from '@styles';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    ...Global.gutters,
  },
  wrapper: {
    paddingVertical: 30,
  },
  header: {
    ...Flex.rowCrossCenter,
    ...Flex.mainSpaceBetween,
  },
  action: {
    padding: 0,
  },
  title: {
    marginBottom: 5,
    color: color(Colors.Fiord).alpha(0.5).toString(),
  },
  address: {
    marginVertical: 3,
  },
  validationText: {
    marginTop: 10,
  },
  validationContent: {
    marginTop: 5,
  },
  separator: {
    height: 1,
    marginVertical: 20,
    backgroundColor: color(Colors.BaliHai).alpha(0.5).toString(),
  },
  licensePlate: {
    marginTop: 3,
  },
  submit: {
    elevation: 2,
  },
  sessionIcon:{
    height: 20, 
    width: 20, 
    tintColor: Colors.White
  },
  monthlPermitContainer:{ 
    marginVertical: 10 
  },
  permitSubContainer:{ 
    width: '100%', 
    borderWidth: 0.4, 
    flexDirection: 'row', 
    borderColor: Colors.Heather, 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10 
  },
  permitSubViewContainer:{ 
    width: '50%', 
    borderRightWidth: 0.4, 
    padding: 10, 
    flexDirection: 'row',
    borderColor:Colors.Heather
  },
  permitTextContainer:{ 
    width: '50%', 
    borderRightWidth: 0.4, 
    padding: 10, 
    flexDirection: 'row', 
    borderColor: Colors.Heather 
  },
  permitTextView:{ 
    width: '50%', 
    padding: 10, 
    alignItems: 'center' 
  },
  tableContainer:{ 
    width: '100%', 
    borderWidth: 0.4, 
    flexDirection: 'row', 
    borderTopWidth: 0, 
    borderColor: Colors.Heather, 
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10 
  }
});
