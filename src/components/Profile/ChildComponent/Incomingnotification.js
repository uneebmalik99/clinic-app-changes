import React from 'react';
import { Text, View ,Image, } from 'react-native';
// import {AlertDialog, Clickable} from ' ./components/common';
import {AlertDialog, Clickable} from '../../common';
import { Images, Utils } from '../../../utils'
import { useNavigation } from '@react-navigation/core';

const Incomingnotification = ({token , isVisible , onClose}) => {

  const navigation = useNavigation()
    // const token = route.params.token
    const  rejectVideoCallApi= async (value) => {

        let userInfo = JSON.parse(await getItem(USER))
        let param = { "user_id": userInfo.id }
         ApiService(END_VIDEO_CALL, param, (res) => {
           console.log("-------------->")
           console.log(res)
         }, (error) => {
        
     }, METHOD.POST
     )
      }

    

      
  return isVisible &&  (
    
    <View style={CommonStyles.containerMainDropDown}>
    <View style={{ ...CommonStyles.containerVideoCallBg, }}>
      
    <Image
          source={Images.VideoProfileIcon}
                style={{
                    width: 160,
                    height: 160,
                  }}
                  resizeMode='contain'
                />
        <Text style={{...CommonStyles.txtDropDownTitle,marginTop:20}}>{"Incoming video call..."}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Clickable  style={{ marginStart: 12,marginEnd:18, marginTop: 105 }} onPress={async () => {
this.setState({
notificationCall:false
})    
rejectVideoCallApi()

}} >
<View>

<Image source={Images.RejectCall} style={{ width: 67, height: 67,  }}resizeMode='contain' />
<Text style={CommonStyles.txtDropDownDesc}>{"Reject"}</Text>

</View>

</Clickable>
<Clickable style={{ marginStart: 12,marginStart:18, marginTop: 105 }}
 onPress={async () => {
   typeof onClose === 'function' && onClose()
navigation.navigate("DoctorVideoCall",{"token":token});

}}
>
<View>
<Image source={Images.AcceptCall} style={{ width: 67, height: 67,  }} resizeMode='contain' />
<Text style={CommonStyles.txtDropDownDesc}>{"Accept"}</Text>

</View>

</Clickable>

</View>
</View>
</View>
  )
}
export default Incomingnotification;

















// import React, { Component } from 'react';
// import {
//     View,
//     Text,
//     Image,
//     StatusBar
// } from 'react-native';
// import {
//     ScrollContainer,
//     Button,
// } from '../../common';
// import { connect } from 'react-redux';
// import { strings } from '../../../language/Language';

// import { Colors, Images, } from '../../../utils';

// // import { SafeAreaView } from 'react-navigation';
// import CommonStyles from '../../common/CommonStyles';

// import styles from '../Styles/Aligner.styles';
// import { string } from 'prop-types';



// //import PermissionWebview from '../../../webview/native/PermissionWebview';
// import { videoLink } from '../../../network/ApiConstants';

// /**
//  * 
//  *  <PermissionWebview 
//         style={{flex: 1}}
//         mediaPlaybackRequiresUserAction={false}
//         domStorageEnabled={true}
//         allowsInlineMediaPlayback={true}
//         source={{uri: videoLink}} 
//         sourceUri={videoLink} 
//         allowFileAccessFromFileURLs={true}
//         allowUniversalAccessFromFileURLs={true}
//       />
//  */

// class Incomingnotification extends Component {
   
//     Incomingnotification  = ({back, cart, shareProduct, onSharePress, mixpanelBack}) => {
//         const navigation = useNavigation();
//       const Header = ({back, cart, shareProduct, onSharePress, mixpanelBack}) => {
//         const navigation = useNavigation();

 

    

//     async rejectVideoCallApi(){
// alert('rejected')
//         let userInfo = JSON.parse(await getItem(USER))
//         let param = { "user_id": userInfo.id }
//          ApiService(END_VIDEO_CALL, param, (res) => {


//            console.log("-------------->")
//            console.log(res)
//          }, (error) => {
        
//      }, METHOD.POST
//      )
//       }

 
//     render() {
    
//                 <View style={CommonStyles.containerMainDropDown}>
//                     <View style={{ ...CommonStyles.containerVideoCallBg, }}>
                      
//                     <Image
//                           source={Images.VideoProfileIcon}
//                                 style={{
//                                     width: 160,
//                                     height: 160,
//                                   }}
//                                   resizeMode='contain'
//                                 />
//                         <Text style={{...CommonStyles.txtDropDownTitle,marginTop:20}}>{"Incoming video call..."}</Text>
//                         <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//                         <Clickable  style={{ marginStart: 12,marginEnd:18, marginTop: 105 }} onPress={async () => {
//             this.setState({
//              notificationCall:false
//         })    
//         this.rejectVideoCallApi()

//             }} >
//                 <View>

//                 <Image source={Images.RejectCall} style={{ width: 67, height: 67,  }}resizeMode='contain' />
//                 <Text style={CommonStyles.txtDropDownDesc}>{"Reject"}</Text>

//                 </View>

//             </Clickable>
//             <Clickable style={{ marginStart: 12,marginStart:18, marginTop: 105 }} onPress={async () => {
//                 this.setState({
//                     notificationCall:false
//                 })     
//                 // alert(this.state.videoToken)
//                 console.log(this.state.videoToken);
//                 // alert('jug')
//                 this.props.navigation.replace("DoctorVideoCall",{"token":this.state.videoToken});
//                 // this.props.navigation.push("DoctorVideoCall",{"token":this.state.videoToken});
//                 // this.props.navigation.navigate("Setting",{"token":this.state.videoToken});

//         }}
//             >
//                 <View>
//                 <Image source={Images.AcceptCall} style={{ width: 67, height: 67,  }} resizeMode='contain' />
//                 <Text style={CommonStyles.txtDropDownDesc}>{"Accept"}</Text>

//                 </View>
          
//             </Clickable>
            
//             </View>
//            </View>
//          </View>
            
        
//     }
// }


// export default Incomingnotification;
















