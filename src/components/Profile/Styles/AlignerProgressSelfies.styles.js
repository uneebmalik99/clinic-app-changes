import { StyleSheet } from 'react-native'
import { FontName, Colors } from '../../../utils'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        backgroundColor: Colors.BG_Pink,
    },
    selfieItem: {
        backgroundColor: Colors.Defaultwhite,
        marginTop: 10,
        marginBottom: 37,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150
    },
    txtTitle: {
        paddingHorizontal: 37,
        marginTop: 28,
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
        width:'80%',
        marginTop:5,
        fontSize: 16,
        color: Colors.lightGreyColor,
        fontFamily: FontName.regular
    }
    ,
    txtCellBoldName: {
        width:80,
        marginTop:20,
        fontSize: 16,
        color: Colors.PureBlack,
        textDecorationLine: 'underline',
        fontFamily: FontName.simibold
    }
});

