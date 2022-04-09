import { StyleSheet,Platform } from 'react-native'
import { Images, FontName, FontSize, Colors } from '../../../utils';


export default styles = StyleSheet.create({
   
  

    
    
    txtNormalStyle:{
        width:'100%',
        height:51,
        lineHeight: (51),
        paddingHorizontal:20,
        alignSelf: "center",
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize16,
        textAlignVertical:'center',
        borderWidth: 1, 
        borderColor: Colors.NormalGreyColor, 
        alignSelf: 'center', 
        borderRadius: 0, 
        color:Colors.PureBlack,
        marginTop: 21, 
        backgroundColor: Colors.Defaultwhite,
    },
    txtUpdateProfileNormalStyle:{
        textAlignVertical:'center',
        alignSelf: "center",
        width:'100%',
        paddingHorizontal:20,
        height:51,
        lineHeight: (51),
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize16,
        borderWidth: 1,
        borderColor: Colors.NormalGreyColor, 
        alignSelf: 'center', 
        color:Colors.NormalGreyColor,
        borderRadius: 0, 
        marginTop: 21, backgroundColor: Colors.Defaultwhite,
    },
    edtProfileUpdate:{
        textAlignVertical:'center',
        paddingHorizontal:10,
        height:51,
        flex:1,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize16,
        alignSelf: 'center', 
        borderRadius: 0,  backgroundColor: Colors.Defaultwhite,
    },
    countryDropDown:{
        textAlignVertical:'center',
        paddingHorizontal:5,
        height:51,
        width:70,
        lineHeight: (51),
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize16,
        color:Colors.PureBlack,
        alignSelf: "center",
         borderRadius: 0,  backgroundColor: Colors.Defaultwhite,
    },
    countryContainerDropDown:{
        paddingHorizontal:10,
        flexDirection:'row',
        height:51,
        alignSelf: 'center', 
        borderRadius: 0,  backgroundColor: Colors.Defaultwhite,
    },
    mobileNoContainer:{
        width:'100%',
        paddingHorizontal:10,
        borderWidth: 1,
        padding:1,
        borderColor: Colors.NormalGreyColor, 
        borderRadius: 0, 
        flexDirection:'row',
        marginTop: 21, backgroundColor: Colors.Defaultwhite,
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
containerDropDown: {
        height: '50%',
        width:'90%',
        padding:20,
        backgroundColor: Colors.LightBlue,
        color: Colors.Defaultwhite,
},
txtDropDownTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: FontName.simibold,
    alignSelf: 'center',
    color: Colors.PureBlack,

},


});