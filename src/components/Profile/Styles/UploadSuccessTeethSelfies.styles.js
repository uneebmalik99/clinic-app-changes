import { StyleSheet } from 'react-native'
import { FontName, Colors } from '../../../utils';

export default styles=StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:37,
        flex:1
    },
    txtTitle:{
        fontFamily: FontName.simibold,
        textAlign:'center',
        fontSize:18,
        marginTop:20,
        alignSelf:'center',
        color:Colors.PureBlack
    },
    txtDesc:{
        textAlign:'center',
        marginTop:20,
        fontFamily: FontName.regular,
        fontSize:16,
        alignSelf:'center',
        color:Colors.PureBlack
    }
});