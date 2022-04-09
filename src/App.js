import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import AppNavigator from './navigation/Routes'
import reducers from './reducers'
import ReduxThunk from 'redux-thunk'
import React, {Component} from 'react';
import {Platform, View,Image,Text, StatusBar} from 'react-native';
import { Root, } from 'native-base'
import {AlertDialog, Clickable} from './components/common';
import {configureAWS} from './utils/AwsUtils'
import { getItem, getNotificationValue, setItem } from './data/PrefUtils'
import { FIREBASE_TOKEN, IS_LOGGED_IN, USER } from './data/PrefKeys'
import {notifications,messages, NotificationMessage,Android} from "./notifications/index"
import CommonStyles from './components/common/CommonStyles'
import { Images, Utils } from './utils'
import { strings } from './language/Language'
import ApiServiceTwilio from './network/ApiServiceTwilio'
import ApiService, { METHOD } from './network/ApiService'
import { CHECK_VIDEO_CALL, END_VIDEO_CALL, PROGRESS_SELFIES } from './network/ApiConstants'
import { TRUE } from './utils/AppConstants'
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from "react-native-push-notification";
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import Incomingnotification from './components/Profile/ChildComponent/Incomingnotification'

export const navigationRef = createNavigationContainerRef()

const store = createStore(
    reducers,
    applyMiddleware(ReduxThunk),
);



export {store}

const type = 'notification';


// const route = useRoute();

class App extends Component {

  //  navigation = useNavigation()

    constructor(props) {
        super(props);
        this.state = {};
  
     console.disableYellowBox = true;
     this.checkPermission()
     this.onNotificationListener()
     this.onNotificationOpenedListener()
     this.onTokenButtonPress()
    
    
      this.state = {
          title: '',
          message: '',
          videoToken:'',
          showNotification:false,
          notificationCall:false,
          selfieUpload:false,
          toggleOpen:false,
          dateSelfieInfo:{},
          currentAligner:0,
      };
    
      this.checkVideoCallApi()
    
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
          console.log("TOKEN:", token);
        },
      
        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
          console.log("NOTIFICATION:", notification);
      
          // process the notification
      
          // (required) Called when a remote is received or opened, or local notification is opened
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
      
        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
          console.log("ACTION:", notification.action);
          console.log("NOTIFICATION:", notification);
      
          // process the action
        },
      
        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function(err) {
          console.error(err.message, err);
        },
      
        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
      
        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,
      
        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
      });
    
    }

    
   onRemoteNotification = (notification) => {
      const isClicked = notification.getData().userInteraction === 1;
  
      if (isClicked) {
        // Navigate user to another screen
      } else {
        // Do something else with push notification
      }
    };


     onRemoteNotification = (notification) => {
      const isClicked = notification.getData().userInteraction === 1;
  
      if (isClicked) {
        // alert('click')
        // Navigate user to another screen
      } else {
        // alert('no click')

        // Do something else with push notification
      }
    };
 testpush = () =>{

// alert('j')
  // AsyncStorage.getItem('alignernotification').then((value)=>{
  //   if(value !==  null || value !== undefined ){
  //       if(value == 1){

  //       }else{

  //       }


  //   }
  // })
  // PushNotificationIOS.addNotificationRequest({
  //   fireDate: this.getCorrectDate(),
  //   repeats: true,
  //   repeatsComponent: {
  //     hour: true,
  //     minute: true,
  //   },
  // });
  PushNotification.localNotificationSchedule({
    //... You can use all the options from localNotifications
    message: "My Notification Message", // (required)
    date: new Date(Date.now()), // in 60 secs
    allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
  
    /* Android Only Properties */
    repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
  });

  //  PushNotification.localNotificationSchedule({
  //   //... You can use all the options from localNotifications
  //   message: "My Notification Message", // (required)
  //   date: new Date(Date.now() + 10 * 1000), // in 60 secs
  //   allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
  //   repeatType:'minute',
  // });

 }

    onNotificationOpenedListener = () => {
      //remember to remove the listener on un mount
      //this gets triggered when the application is in the background
      notifications.onNotificationOpened(
        notification => {
         
        }
      )
    }


    async rejectVideoCallApi(){

      let userInfo = JSON.parse(await getItem(USER))
      let param = { "user_id": userInfo.id }
       ApiService(END_VIDEO_CALL, param, (res) => {
         console.log("-------------->")
         console.log(res)
       }, (error) => {
      
   }, METHOD.POST
   )
    }

    async checkVideoCallApi (){
      let userInfo = JSON.parse(await getItem(USER))
      if(userInfo){
      let param = { "user_id": userInfo.id }
       ApiService(CHECK_VIDEO_CALL, param, (res) => {
           let roomId= res.data.data.url
           let email=(userInfo.email)
// alsert('ugk')
           if( this.props.navigation.state.routeName !='DoctorVideoCall'){
           ApiServiceTwilio({"identity":email,"room":roomId}, (res) => {
            //  this.props.navigation.navigate('Incomingnotification')
               this.setState({
                   notificationCall:true,
                   title: "",
                   message: "",
                   videoToken:res
                 })
           },(error) => {
           })
          }       
        }, (error) => {
          console.log(error)
    }, METHOD.POST
    )
  }
}

    async _apiTwilioCall(data){
      let email=(JSON.parse( await getItem(USER)).email)
      if(email){
      let roomId=JSON.parse(data.data).room_link
      ApiServiceTwilio({"identity":email,"room":roomId}, (res) => {
        // alert('kg')
        // this.props.navigation.navigate('Incomingnotification')
        console.log(res)
          this.setState({
              notificationCall:true,
              title: "",
              message: "",
              videoToken:res
            })
      },(error) => {
      alert(error)
      })
    }    
    }

    async checkPermission() {
      if(  Platform.OS === 'ios' ){
     
        this.requestPermission()
      }
    }

    getToken = async () => {
        //get the messeging token
        const token = await notifications.getToken()
        //you can also call messages.getToken() (does the same thing)
        
        
        return token
      }
    
      onNotificationListener = () => {
        //remember to remove the listener on un mount
        //this gets triggered when the application is in the forground/runnning
        //for android make sure you manifest is setup - else this wont work
      
        //notifications.finish(PustNoti.FetchResult.NoData);
        this.removeOnNotification = notifications.onNotification(notification => {
          //do something with the notification
          console.log("onNotification", notification)
         console.log("===========>")
          if(notification.data.type =='message'){
          } if(notification.data.type =='call'){
            // alert('hi video')
            // this.props.route.name
            // let g = this.props.route
            

            // alert(route)
// alert(route.name);
            // const route = navigationRef.getCurrentRoute();
            // alert(route)
            // alert('ppp')
            // this.props.navigation.navigate('Incomingnotification')
            // this.props.navigation.replace('Incomingnotification');
            console.log(notification.data)
          //  if( this.props.navigation.state.routeName != 'DoctorVideoCall'){
            this._apiTwilioCall(notification.data)
            this.showNotification(notification)
          // }
        }  else  if(notification.data.type =='img_upload'){
          this.checkIsSelfieUpload(true)
          this.showNotification(notification)
        } else{
            this.setState({
                showNotification:true,
                selfieUpload:false,
                title: notification.data.title,
                message: notification.data.body
              })
              this.showNotification(notification)

            }
       

        })
      }
    
      async showNotification(notification){
     

        if(this.props.navigation.state.routeName =='DoctorChat'){
// alert('hkhkb')
        }else{
      //  alert('hjv')
      // alert(is_log_in)
    let is_log_in = await getItem(IS_LOGGED_IN)
 
   if( is_log_in == 1 ){
    let not=await getNotificationValue()
    if(not && not =='1'){
    
    let data=( notification.data)
          const channel = new Android.Channel(
            "test-channel",
            "Test Channel",
            Android.Importance.Max
          ).setDescription("My apps test channel")
          // for android create the channel
          notifications.android().createChannel(channel)
          await notifications.displayNotification(
            new NotificationMessage()
              .setNotificationId("notification-id")
              .setTitle(data.title)
              .setBody(data.body)
              .android.setChannelId("test-channel") //required for android
          )
        }
      }    
      
      }}

      async   checkIsSelfieUpload(checkStatus){
        ApiService(PROGRESS_SELFIES, {}, (res) => {
       for(item of res.data.data ){
            if(item.upload_date.length!=0 && item.status.toString() == '0'  &&   (item.date_status =="today" || item.date_status =="past")){
              if(checkStatus){
                this.setState({
                  showNotification:true,
                  title:"Selfie Upload Reminder",
                  message:"Please upload your 6 selfies today.",
                  selfieUpload:true,
                })
                this.state.dateSelfieInfo=item
                this.state.currentAligner=res.data.aligner.current_aligner
                break
              }else{

              }
            }
          }
          
      }, (error) => {
          
      }, METHOD.GET
      )
      }
      
      onTokenRefreshListener = () => {
        //remember to remove the listener on un mount
        //this gets triggered when a new token is generated for the user
        this.removeonTokenRefresh = messages.onTokenRefresh(token => {
          //do something with the new token
        })
      }
      setBadge = async number => {
        //only works on iOS for now
        return await notifications.setBadge(number)
      }
    
      getBadge = async () => {
        //only works on iOS for now
        return await notifications.getBadge()
      }
    
      hasPermission = async () => {
        //only works on iOS
        return await notifications.hasPermission()
      }
    
      requestPermission = async () => {
        //only works on iOS
        return await notifications.requestPermission()
      }
      componentWillUnmount() {
        //remove the listener on unmount
        if (this.removeOnNotificationOpened) {
          this.removeOnNotificationOpened()
        }
        if (this.removeOnNotification) {
          this.removeOnNotification()
        }
    
        if (this.removeonTokenRefresh) {
          this.removeonTokenRefresh()
        }
      }
    
      onTokenButtonPress = async () => {
        const token = await this.getToken()
        console.log("token : ", token)
        this.setState({ token: token })
      }

    async componentWillMount() {
        // this.messageListener = await setupPushNotification()
    }

    getInitialNotification = async () => {
      //get the initial token (triggered when app opens from a closed state)
      const notification = await notifications.getInitialNotification()
    let is_log_in = await getItem(IS_LOGGED_IN)
      if(notification && is_log_in == 1 ){
        this.props.navigation.navigate('DoctorChat')
          // Navigator.resetNavigation("DoctorChat")
      }else{
        if(is_log_in == 1){
          this.props.navigation.navigate('Welcome')

          // Navigator.resetNavigation("Home")
        }
      }
      console.log("getInitialNotification", notification)
      return notification
    }

    async componentDidMount() {
    //  this.testpush()
    let is_log_in = await getItem(IS_LOGGED_IN)
    if(is_log_in == 1){
      this.props.navigation.navigate('Theethselfies')

      // Navigator.resetNavigation("Home")
      this.checkIsSelfieUpload(true)
    }    
     StatusBar.setBarStyle('dark-content',true)

     
   }
     
   
    render() {
        return (
      <NavigationContainer  >


           <Provider store={store}>
                <Root>
                    <AlertDialog onRef={c => {
                        if (c)
                            AlertDialog.dialogInstance = c;
                    }}/>
                    <AppNavigator/>
                </Root>

                

                {this.state.notificationCall && (

                  <Incomingnotification onClose={()=> this.setState({notificationCall:false})} 
                  isVisible={this.state.notificationCall} 
                  token={this.state.videoToken} />
            //         <View style={CommonStyles.containerMainDropDown}>
            //             <View style={{ ...CommonStyles.containerVideoCallBg, }}>
                          
            //             <Image
            //                   source={Images.VideoProfileIcon}
            //                         style={{
            //                             width: 160,
            //                             height: 160,
            //                           }}
            //                           resizeMode='contain'
            //                         />
            //                 <Text style={{...CommonStyles.txtDropDownTitle,marginTop:20}}>{"Incoming video call..."}</Text>
            //                 <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            //                 <Clickable  style={{ marginStart: 12,marginEnd:18, marginTop: 105 }} onPress={async () => {
            //     this.setState({
            //      notificationCall:false
            // })    
            // this.rejectVideoCallApi()

            //     }} >
            //         <View>

            //         <Image source={Images.RejectCall} style={{ width: 67, height: 67,  }}resizeMode='contain' />
            //         <Text style={CommonStyles.txtDropDownDesc}>{"Reject"}</Text>

            //         </View>

            //     </Clickable>
            //     <Clickable style={{ marginStart: 12,marginStart:18, marginTop: 105 }} onPress={async () => {
            //         this.setState({
            //             notificationCall:false
            //         })     
            //         // alert(this.state.videoToken)
            //         console.log(this.state.videoToken);
            //         // alert('jug')

            //         this.props.navigation.navigate("DoctorVideoCall",{"token":this.state.videoToken});
            //         // this.props.navigation.push("DoctorVideoCall",{"token":this.state.videoToken});
            //         // this.props.navigation.navigate("Setting",{"token":this.state.videoToken});
 
            // }}
            //     >
            //         <View>
            //         <Image source={Images.AcceptCall} style={{ width: 67, height: 67,  }} resizeMode='contain' />
            //         <Text style={CommonStyles.txtDropDownDesc}>{"Accept"}</Text>

            //         </View>
              
            //     </Clickable>
                
            //     </View>
            //    </View>
            
            //  </View>
                )}
                
                {this.state.showNotification && (
                    <View style={CommonStyles.containerMainDropDown}>
                        <View style={{ ...CommonStyles.containerDropDown, }}>
                            <Image source={Images.callBg} style={{width:'100%',height:140}} ></Image>
                            <Text style={CommonStyles.txtDropDownTitle}>{this.state.title}</Text>
                            <Text style={CommonStyles.txtDropDownDesc}>{this.state.message}</Text>
                            <Button style={{ marginTop: 26 }}
                              onPress={() => {
                                if(this.state.selfieUpload){
                                  this.props.navigation.navigate("ConfirmSelfies",{  'aligner':this.state.currentAligner,
                                  'title':this.state.dateSelfieInfo.title,})
                                }
                                this.setState({
                                    showNotification: false,
                                    selfieUpload:false,
                                })
                            }}
                            title={strings.Okay}></Button>

{this.state.selfieUpload && ( 
  <View style={{width:'100%'}}>       
<Button style={{ marginTop: 26 }}
bordered={true}
                              onPress={() => {
                                this.setState({
                                    showNotification: false,
                                    selfieUpload:false,
                                })
                            }}
                            title={'Cancel'}></Button>
                            </View>
     )}   
       </View>
                    </View>
                )}

       
            </Provider>
            </NavigationContainer>

         
        );
    }

    onRegister = (token) => {
        setItem(FIREBASE_TOKEN,token);
        // this.setState({registerToken: token.token, fcmRegistered: true});
    };

    onNotif = (notif) => {
       console.error('Notification Details (onNotification) : ' + JSON.stringify(notif));
    };

}

export default (App);
