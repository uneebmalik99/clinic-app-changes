import { StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated';
import { FontName, Colors } from '../../../utils';



export default styles = StyleSheet.create({
        mainContainer:{
                backgroundColor: Colors.TEETH_SEFIES_BG_COLOR,
                flex:1,
        },
        container:{
                flex:1,
                paddingVertical:20,
                alignItems:'center',
                justifyContent:'center',
        },
        txtTitle: {
                paddingHorizontal:37,
                marginTop:29,
                fontSize: 22,
                fontFamily: FontName.simibold,
                color: Colors.PureBlack,
                alignSelf: 'center',
                textAlign: 'center',

        },
        txtDesc:{
                paddingHorizontal:37,
                alignSelf: 'center',
                textAlign: 'center',
                marginTop: 29,
                color: Colors.PureBlack,
                fontSize: 14,
                fontFamily: FontName.regular,

        },
      
});