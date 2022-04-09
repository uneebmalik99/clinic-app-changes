import { StyleSheet } from 'react-native'
import { Colors, FontName } from '../../../utils';



export default styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    tryit: {
       
        marginTop:23,
        alignSelf:'center',
        fontSize: 22,
        color: Colors.PureBlack,
        fontFamily: FontName.simibold

    },
    tryiteasysteps: {
        alignSelf:'center',
        marginTop:14,
        fontSize: 15,
        color: Colors.PureBlack,
        fontFamily: FontName.regular
    },

    image:{
        marginTop:32,
        width:'100%',
        height:220,
    },

    step:{
        marginTop:32,
        fontFamily:FontName.medium,
        fontSize:22,
        color:Colors.HomeTabStepColor
    },

    stepDesc:{
        marginTop:25,
        fontFamily:FontName.light,
        fontSize:15,
        color:Colors.PureBlack
    },
  
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    horizontalLine: {
        marginTop: 20,
        height: 2,
        width: '100%',
        backgroundColor: Colors.borderBottomColor,
    },
    edittextstyle: {
        borderWidth: 1,
        borderColor: Colors.borderBottomColor,
        alignSelf: 'center',
        borderRadius: 40,
        backgroundColor: Colors.Defaultwhite
    },

});