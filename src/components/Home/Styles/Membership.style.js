import { StyleSheet } from 'react-native'
import { Images, FontName, FontSize, Colors } from '../../../utils';


export default styles = StyleSheet.create({
    txtDiscountPercent: {
        alignSelf: 'center',
        fontSize: 25,
        color: Colors.Defaultwhite,
        fontWeight: "bold",
    },
    membershipStyle: {
        backgroundColor: Colors.GreenColor,
        color: Colors.GreenColor,
        flexDirection: 'row',
        alignItems: 'center'
    },
    membershipOrderDesc: {
        alignSelf: 'center',
        color: Colors.Defaultwhite,
        fontSize: 16,

    },
    membershipVoucher: {
        alignItems:'center',
        flex: 1,
        padding:10,
        fontSize: 16,
    },
    borderHeight: {
        height: 1,
        backgroundColor: Colors.Defaultwhite,
        width: '100%'
    },
    memberShipVoucher: {
        backgroundColor: Colors.StatusYellowColor,
        color: Colors.StatusYellowColor,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }

});

