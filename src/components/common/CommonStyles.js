import { Platform,Dimensions, StatusBar, StyleSheet } from 'react-native'

import {  FontName, FontSize, Colors } from '../../utils';
import { Content } from 'native-base';





const windowHeight = Dimensions.get('window').height
const screenHeight = Dimensions.get('screen').height
export default CommonStyles = StyleSheet.create({
    flex1style:{
    flex:1,
    
  },flexstyle:{
    flex:0,
  },
  ContentCenterstyle:{
    justifyContent: 'center',
    alignContent:'center'
  },
  StatusBar: {
    backgroundColor: Colors.PureBlack
},

topMargin:{
  top:  Platform.OS === 'ios' ?  50:30,

},

txtDropDownTitle: {
  marginTop:10,
  textAlign: 'center',
  fontSize: 20,
  fontFamily: FontName.simibold,
  alignSelf: 'center',
  color: Colors.PureBlack,

},

txtDropDownDesc: {
  textAlign: 'center',
  fontSize: 16,
  fontFamily: FontName.light,
  alignSelf: 'center',
  color: Colors.PureBlack,

},

topSafeArea: {
  backgroundColor: Colors.PureBlack,
}, 
bottomSafeArea: {
  flex: 1, 
  backgroundColor:Colors.PureBlack
},
  containerMainDropDown: {
    flex: 1,
    width:'100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: Colors.NotificationBg,
},
containerMainDropDownBg: {
  
  right:     0,
bottom:      0,
position: 'absolute', 
},
containerVideoCallBg: {
  height: '100%',
  width:'100%',
  padding:20,
  justifyContent: 'center',
  alignSelf: 'center',
  alignItems: 'center',
  backgroundColor: Colors.TEETH_SEFIES_BG_COLOR,
  color: Colors.Defaultwhite,
 },
containerDropDown: {
    height: '50%',
    width:'90%',
    padding:20,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.TEETH_SEFIES_BG_COLOR,
    color: Colors.Defaultwhite,
},

label: {

  color: "#FFF",
  position: "absolute",
  fontSize: 18,
  backgroundColor: "transparent",
},

actionButtonIcon: {
  fontSize: 20,
  height: 22,
  color: 'white',
},

});