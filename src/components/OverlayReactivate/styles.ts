import { StyleSheet } from 'react-native';
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
  deleteContainer:{ 
    backgroundColor: 'white', 
    height: -1, 
    width: '80%', 
    borderRadius: 10, 
    paddingVertical: 10,
    elevation:1,
    shadowColor:'#000000',  
    shadowOffset: {
      width: -2, 
      height: 4
    },    
    shadowOpacity: 0.2,
    shadowRadius: 3, 
  },
  accountDeleteText:{ 
    textAlign: 'center', 
    marginTop: 10 
  },
  reactivateText:{ 
    marginTop: 20, 
    textAlign: 'center', 
    marginHorizontal: 20 
  },
  buttonContainer:{ 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginHorizontal: 40, 
    marginTop: 25, 
    paddingVertical: 10 
  },
  closeBtn:{ 
    alignSelf: 'flex-end', 
    top: 2, 
    right: 8 
  },
  reactivateBtn:{ 
    backgroundColor: Colors.CuriousBlue, 
    padding: 10, 
    borderRadius: 8 
  },
  signUpBtn:{ 
    backgroundColor: Colors.Chambray, 
    padding: 10, 
    borderRadius: 8 
  }
});
