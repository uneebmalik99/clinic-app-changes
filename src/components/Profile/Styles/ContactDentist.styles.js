import { StyleSheet } from 'react-native'
import { Colors, FontName } from '../../../utils';


export default styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.BG_Pink,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

    },

    txtTitle: {
        paddingHorizontal: 37,
        fontSize: 22,
        fontFamily: FontName.simibold,
        color: Colors.PureBlack,
        alignSelf: 'center',
        textAlign: 'center',

    },
  

})