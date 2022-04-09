import { StyleSheet } from 'react-native'
import { FontName, FontSize, Colors } from '../../../utils';
import { Content } from 'native-base';

export default style = StyleSheet.create({
    mainView: {
        alignSelf: 'center',

        width: 200,
        marginVertical: 5
    },
    chooseLanguage: {
        fontSize: 22,
        color: Colors.Defaultblack,
        fontFamily:FontName.simibold

    },
    languageButton: {
        fontSize: 15,
        color: Colors.LANGUAGE_COLOR,
        fontFamily:FontName.regular
    },

    tutorialTitle: {
        width:'100%',
        fontSize: 23,
        marginBottom: 21,
        alignSelf: 'stretch',
        textAlign:'center',
        textAlignVertical:'center',
        fontFamily:FontName.simibold,
        color: Colors.Defaultblack,

    },
    tutorialDesc: {
        textAlign: 'center',
        lineHeight: 29,
        alignSelf: 'stretch',
        fontSize: 14,
        fontFamily:FontName.light,
        color: Colors.Defaultblack,

    },
    chooselocationtext: {
        color: Colors.Defaultwhite,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    SorryText: {
        color: Colors.Defaultwhite,
        fontSize: 27,
        alignSelf: 'center'
    },
    dontofferText: {
        color: Colors.Defaultwhite,
        marginTop: 20,
        fontSize: 14,
        alignSelf: 'center',
        textAlign: 'center'
    },
    cantfindcityView: {
        alignSelf: 'center',
        width: 240,
        height: 35,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',


    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    cantfindcityText: {
        textAlignVertical: 'center',
        color: Colors.Defaultwhite,
        height: '100%',
        width: '100%',
        fontWeight: 'bold',
        marginHorizontal: 10,
        fontSize: 16,
        alignItems: 'center',

    },
    birthdatefontformattitle: {
        fontFamily: FontName.regular,
        flex: 1,

        marginLeft: 10,
        alignSelf: "center",
        fontSize: 16,
        color: Colors.WHITE_TRANSPARENT,
        //  paddingLeft: 10,
    },


    birthdatefontformat: {
        marginTop: 10,
        color: Colors.Defaultwhite,
        fontFamily: FontName.regular,
        //  right:5,
        top: 3,
        fontSize: 16,
        paddingBottom: 5,
        textAlign: 'left',
        marginHorizontal: 15,
    },

    txtinputonebirthdate: {
        //height:80,
        flexDirection: "row",
        marginTop: 16,
        paddingBottom: 4,
        borderWidth: 2,
        borderColor: Colors.Defaultwhite,
        minHeight: 40,
        borderRadius: 35,
        width: 240, alignSelf: 'center'
        //    marginTop: hasCountry && !isFocused ? 0 : 0,
        //    left: hasCountry ? this.state.width : 0,

    },

    container: {
        flex: 1,
    },
    slider: { backgroundColor: '#000', height: 350 },
    content1: {
        width: '100%',
        height: 50,
        marginBottom: 10,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content2: {
        width: '100%',
        height: 100,
        marginTop: 10,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText: { color: '#fff' },
    buttons: {
        zIndex: 1,
        height: 15,
        marginTop: -25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        margin: 3,
        width: 15,
        height: 15,
        opacity: 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonSkip: {
        padding: 10,
        fontSize: 16,
        fontFamily:FontName.simibold,

        color:Colors.PureBlack,

    },

    buttonSelected: {
        height: 21,
        width: 21,
        marginStart: 10,
        marginBottom:51,
        marginEnd:10,
        borderRadius: 21,
        backgroundColor: Colors.RED,
    },

    buttonUnSelected: {
        height: 13,
        marginBottom:51,
        width: 13,
        marginStart: 10,
        marginEnd:10,
        borderRadius: 13,
        backgroundColor: Colors.Defaultwhite,
    },
    customSlide: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    customImage: {
        width: "100%",
        height: "100%",
    },
});

