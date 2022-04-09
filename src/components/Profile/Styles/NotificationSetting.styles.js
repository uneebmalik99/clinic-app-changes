import { StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated';
import { Colors, FontName } from '../../../utils';


export default styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.LIGH_PINK,
        flex:1,
},
  
txtTitle:{
    flex:1,
    marginTop:10,
    marginStart: 20,
    marginBottom:10,
    fontSize:16,
    fontFamily: FontName.simibold,
    color:Colors.PureBlack,
},

headerContainer:{
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center' 
},

    cellContainer:{
        marginTop:40,
        borderBottomColor: Colors.LightBlack,
        borderBottomWidth: 1,
        marginHorizontal: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' 
    },
    txtButtonLabel:{
        flex:1,
        marginTop:10,
        marginBottom:10,
        fontSize:15,
       marginEnd:10,
        fontFamily:FontName.simibold,
        color:Colors.PureBlack,
    },
   
});