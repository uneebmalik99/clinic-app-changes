import { StyleSheet } from 'react-native'
import { Images, FontName, FontSize, Colors } from '../../../utils';


export default styles = StyleSheet.create({
       txtOrderID: {
        fontSize: 20,
        color: Colors.borderBottomColor,
        
    },
    txtLastUpdated: {
        fontSize: 16,
        color: Colors.GreenColor,
    },
    txtBlack: {
        fontSize: 16,
        flex:1,
        color: Colors.Defaultblack,
    },
    txtNormal: {
        fontSize: 16,
        color: Colors.Defaultblack,
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
    },
    container: {
        flex: 1,
        flexDirection: 'row',
      },

});

