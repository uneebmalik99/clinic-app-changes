import { StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated';
import { FontName, Colors } from '../../../utils';



export default styles = StyleSheet.create({
        txtTitle: {
                fontSize: 22,
                fontFamily: FontName.simibold,
                color: Colors.PureBlack,
                alignSelf: 'center',
                textAlign: 'center',

        },
        txtDropDown: {
                marginTop: 40,
                fontSize: 25,
                fontFamily: FontName.light,
                alignSelf: 'center',
                color: Colors.PureBlack,

        },
        buttonSelected: {
                height: 21,
                width: 21,
                marginStart: 10,
                marginBottom: 51,
                marginEnd: 10,
                borderRadius: 21,
                backgroundColor: Colors.RED,
        },

        buttonUnSelected: {
                height: 13,
                marginBottom: 51,
                width: 13,
                marginStart: 10,
                marginEnd: 10,
                borderRadius: 13,
                backgroundColor: Colors.Defaultwhite,
        },

        buttons: {
                zIndex: 1,
                height: 15,
                marginTop: -25,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
        },

        containerDown: {
                position: 'absolute',

        },
        containerMainDropDown: {

                flex: 1,
                width:'100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                position: 'absolute',
                backgroundColor: Colors.LightBlack,

        },
        containerMainDropDownQuestion: {

                flex: 1,
                width:'100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',

        },
        containerDropDown: {
                height: '60%',
                width:'90%',
                padding:20,
                backgroundColor: Colors.LightBlue,
                color: Colors.Defaultwhite,
        },

        containerFullDropDown: {
                position: 'absolute',
                height: '100%',
                width:'100%',
                color: Colors.Defaultwhite,

                backgroundColor: Colors.LightBlack,
        },


        txtDropDownTitle: {
                textAlign: 'center',
                fontSize: 20,
                fontFamily: FontName.simibold,
                alignSelf: 'center',
                color: Colors.PureBlack,

        },

        txtDropDown: {
                textAlign: 'center',
                fontSize: 22,
                fontFamily: FontName.regular,
                color: Colors.PureBlack,

        },
        
        flatListStyle: {
                height:'80%'
        },
});