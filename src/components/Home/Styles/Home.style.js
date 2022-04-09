import { StyleSheet } from 'react-native'
import { Images, FontName, FontSize, Colors } from '../../../utils';


export default styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
    
    map: {
        ...StyleSheet.absoluteFillObject,
      },
      bubble: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
      },
      latlng: {
        width: 200,
        alignItems: 'stretch',
      },
      button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
      },
      buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
      },
    searchMainView:{
        backgroundColor:Colors.primaryColor
    },
    searchView:{
        backgroundColor:Colors.Defaultwhite,
        height:46,
        margin:10,
        borderRadius:4,
        flexDirection:'row',
        alignItems:'center'
    },
    searchView_finder:{
        position:"absolute",
        backgroundColor:Colors.Defaultwhite,
        height:46,
        margin:10,
        borderRadius:4,
        flexDirection:'row',
        alignItems:'center'
    },
    textSearch_finder:{
        width:"83%",
        color:Colors.Defaultblack,
        marginLeft:5,
        color: Colors.Defaultblack,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize16,
        
    },
    text_marker:{
        color:Colors.Defaultblack,
        marginLeft:5,
        color: Colors.Defaultblack,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize16,
    },
    AddressListView_nodata:{
        flex:1,
        marginTop:-100,
        justifyContent:'center',
        alignContent:'center',
    },
   
     no_data_map:{
        
       backgroundColor:'white',
        color: Colors.Defaultblack,
        height:40,
        top:10,
        justifyContent:'center',
        alignContent:'center',
    },
    no_data:{
        
        color:Colors.Defaultblack,
        textAlign:'center',
        color: Colors.Defaultblack,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize20,
    },
   
    image_marker:{
       
        height:20,width:20
    },
    textSearch:{
        color:Colors.NormalGreyColor,
        width:"100%",
        color:Colors.Defaultblack,
        marginLeft:5,
        color: Colors.Defaultblack,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize14,
    },
    searchImage:{
        marginLeft:10
    },
    ContaintMainView:{
        marginHorizontal:10,
        marginTop:10,
        backgroundColor:Colors.Defaultwhite,
        borderRadius:4,
    },
    userImage:{
        height:40,
        width:40,
        borderRadius:20,
    
    },
    userImagebg:{
        height:40,
        width:40,
        borderRadius:20,
        // resizeMode:'',
        backgroundColor:Colors.NormalGreyColor
    },
    ChildView:{
        flexDirection:'row',
        marginVertical:15,
        marginHorizontal:15
    },
    TextView:{
        flexDirection:'column',
        flex:1,
        marginLeft:15
    },
    titleText:{
        color: Colors.titleGreyColor,
        fontFamily: FontName.medium,
        fontSize: FontSize.fontSize16,
    },
    RateView:{
        marginTop:5,
        backgroundColor:Colors.StatusYellowColor,
        height:16
    },
    textAddress:{
        color: Colors.NormalGreyColor,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize14,
        marginTop:10,
        lineHeight:20
    },
    btnMapview:{
        position:'absolute',
        bottom:60,
        right:10,
        alignSelf:'flex-end'
    },

    nodataView:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        // top:-40,
        // overflow:'visible'
    },
    nodataTitle:{
        color: Colors.NormalGreyColor,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize16,
        marginTop:21,
        textAlign:'center',
        lineHeight:26,
        marginHorizontal:20
    },
    btnBottom:{
        marginHorizontal:20,
        marginBottom:25
    }
});