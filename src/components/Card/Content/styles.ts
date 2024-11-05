import { StyleSheet } from 'react-native';

import { Colors, Flex } from '@styles';

const radius = 15;

export default StyleSheet.create({
  title: {
    ...Flex.selfStart,
    paddingVertical: 5,
    paddingHorizontal:10,
    // borderTopLeftRadius: radius,
    // borderTopRightRadius: radius,
    // alignSelf:'center'
  },
  content: {
    zIndex: 2,
    elevation: 2,
    borderRadius: radius,
    backgroundColor: Colors.White,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  withTitle: {
    borderTopLeftRadius: 0,
  },
  textContainer:{
    alignItems:'center',
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    height:25
  }
});