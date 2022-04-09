import { StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated';
import { Colors, FontName } from '../../../utils';


export default styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.LIGH_PINK,
        flex:1,
},
    txtUserNameBold:{
        textAlign:'center',
        width:'100%',
        marginTop:56,
        fontSize:20,
        fontFamily: FontName.simibold,
        color:Colors.PureBlack,
    },
    txtAlignerCount:{
        textAlign:'center',
        fontSize: 12,
        width:'100%',
        fontFamily:FontName.regular,
        color:Colors.PureBlack,
    },
    cellContainer:{
        borderBottomColor: Colors.LightBlack,
        borderBottomWidth: 1,
        marginHorizontal: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' 
    },
    txtButtonLabel:{
        textTransform:'capitalize',
        flex:1,
        marginTop:10,
        marginBottom:10,
        fontSize:13,
       marginEnd:10,
        fontFamily:FontName.simibold,
        color:Colors.PureBlack,
    },
    txtButtonDesc:{
       marginEnd:10,
        marginTop:10,
        marginBottom:10,
         fontSize:13,
        fontFamily:FontName.light,
        color:Colors.PureBlack,
    },
    txtlogout:{
        fontSize:13,
        marginStart:10,
        fontFamily:FontName.simibold,
        color:Colors.PINK,
    }
});