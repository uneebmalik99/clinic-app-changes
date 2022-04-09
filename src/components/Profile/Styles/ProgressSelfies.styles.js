import { StyleSheet } from 'react-native'
import { FontName, Colors } from '../../../utils'

export default styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.TEETH_SEFIES_BG_COLOR,
    },
    selfieItem: {
        backgroundColor: Colors.Defaultwhite,
        marginTop: 10,
        marginBottom: 37,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 200
    },
    txtTitle: {
        paddingHorizontal: 37,
        marginTop: 51,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: FontName.simibold,
        fontSize: 30,
        color: Colors.PureBlack,
    },
    txtDesc: {
        paddingHorizontal: 37,
        textAlign: 'center',
        marginTop: 4,
        alignSelf: 'center',
        fontFamily: FontName.regular,
        fontSize: 14,
        color: Colors.PureBlack,
    },
    txtCellTitle: {
        fontSize: 16,
        fontFamily: FontName.simibold,
        color: Colors.PureBlack,

    },
    containerCellRound: {
        borderRadius: 116 / 2,
        width: 116,
        alignItems: 'center',
        justifyContent: 'center',
        height: 116,
        backgroundColor: Colors.BG_Pink
    },
    txtCellName: {
        marginTop:20,
        fontSize: 16,
        color: Colors.lightGreyColor,
        fontFamily: FontName.simibold
    }
    ,
    txtCellBoldName: {
        marginTop:20,
        fontSize: 16,
        color: Colors.PureBlack,
        textDecorationLine: 'underline',
        fontFamily: FontName.simibold
    }
});

