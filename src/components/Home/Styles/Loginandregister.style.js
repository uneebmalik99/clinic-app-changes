import { StyleSheet } from 'react-native'
import { Images, FontName, FontSize, Colors } from '../../../utils';


export default styles = StyleSheet.create({
    edittextstyle: {
        borderWidth: 1,
        borderColor: Colors.borderBottomColor,
        alignSelf: 'center',
        borderRadius: 40,
        backgroundColor: Colors.Defaultwhite
    },
    dobstyle: {
        borderWidth: 1,
        borderColor: Colors.borderBottomColor,
        color:Colors.NormalGreyColor,
        fontSize:14,
        alignSelf: 'center',
        borderRadius: 40,
        paddingStart:20,
        paddingEnd:20,
        marginTop:10,
        width:'100%',
        backgroundColor: Colors.Defaultwhite
    },

    coontainerStyle: {
        alignItems:'center',
        width:'100%',
        flexDirection: 'row',
        marginTop: 8,
        backgroundColor: '#FF000000',
        borderRadius: 5,

    },
    dobstyledate: {
    
        borderWidth: 1,
        
        borderColor: Colors.borderBottomColor,
        fontSize:14,
        alignSelf: 'center',

        borderRadius: 40,
        marginTop:10,
        width:'100%',
        backgroundColor: Colors.Defaultwhite,
        paddingStart:20,
        paddingEnd:20
    },
});

