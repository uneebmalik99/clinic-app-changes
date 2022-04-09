import { StyleSheet } from 'react-native'
import { Images, FontName, FontSize, Colors } from '../../../utils';


export default styles = StyleSheet.create({

    titlestyle: {
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize22,
        marginTop: 22,
        marginHorizontal: 22
    },
    subtitlestyle: {
        color: Colors.borderBottomColor,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize19,
        marginTop: 25,
        marginHorizontal: 22
    },

    activeOrdertitlestyle: {
        color: Colors.Defaultwhite,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize19,
    },
    activeOrderSubtitlestyle: {

        color: Colors.Defaultwhite,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize14,
    },
    imagestyle: {
        marginTop: 14,
    },
    View_all: {
        color: Colors.borderBottomColor,
        fontFamily: FontName.light,
        fontSize: FontSize.fontSize20,
        marginTop: 5,
        marginHorizontal: 22,
        textAlign: 'right'
    }, submenuview: {
        marginHorizontal: 22,
        marginVertical: 6,
        flexDirection: 'row'
    }
    , submenutext: {

        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize19,
        marginTop: 6,
        marginHorizontal: 22
    }, logouttext: {
        color: "#A52122",
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize14,
        marginTop: 25,
        marginHorizontal: 22,
        textAlign: 'center'

    }
});