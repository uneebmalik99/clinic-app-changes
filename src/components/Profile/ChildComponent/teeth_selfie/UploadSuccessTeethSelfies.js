import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    StatusBar,
} from 'react-native';
import {
    ScrollContainer,
    Clickable
} from '../../../common';
import { connect } from 'react-redux';

import {  Colors, Images,  } from '../../../../utils';

import RenderFooter from '../../../Home/ChildComponent/RenderFooter';
import CommonStyles from '../../../common/CommonStyles';
import Styles from '../../Styles/UploadSuccessTeethSelfies.styles'
import { getItem, setItem } from '../../../../data/PrefUtils';
import { FIRST_SELFIES_UPLOAD_STATUS, QUESTION_STATUS } from '../../../../data/PrefKeys';
import { string } from 'prop-types';
import { strings } from '../../../../language/Language';
import FloatingButton from '../../../Home/ChildComponent/FloatingButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import PushNotificationIOS from '@react-native-community/push-notification-ios';


class UploadSuccessTeethSelfies extends Component {
    componentDidMount(){
        setItem(FIRST_SELFIES_UPLOAD_STATUS,'1')
      AsyncStorage.setItem('FirstSelfiesUploaded','1')
      let g = new Date();
      g.setDate(g.getDate()+28)
      // alert(g)
      AsyncStorage.setItem('Date',g.toISOString());

      var date= new Date();
      date.setDate(date.getDate()+28)
  
   
      PushNotificationIOS.scheduleLocalNotification({
          //... You can use all the options from localNotifications
          alertTitle:'Upload your Selfies',
          message: "Need to Upload Your Selfies.", // (required)
          // date: new Date(Date.now()+5), // in 60 secs
          allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
          fireDate:date.toISOString(),
          /* Android Only Properties */
          // repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        });




      // AsyncStorage.setItem('Question','1')
      this.setQuestiInfo()
    }

    async setQuestiInfo(){
        let questStatus=await getItem(QUESTION_STATUS)  == '0'
        if(questStatus){
            await setItem(QUESTION_STATUS,"0")
        }else{
            await   setItem(QUESTION_STATUS,"2")
        }

    }
    render() {
        return (
           
            <>
           <View style={{flex:1}}>
         <View style={CommonStyles.flex1style}>
                  <View style={Styles.container}>
                    <Image source={Images.RoundCheck} style={{  marginTop: 40,  height: 80, width: 80 }} ></Image>
                        <Text style={Styles.txtTitle}>{strings.allDone}</Text>
                        <Text style={Styles.txtDesc}>{strings.allDoneMessage}</Text>
                    </View>
                  </View>
              
         <View
        style={{
          backgroundColor: Colors.FooterColor,
          height: DeviceInfo.hasNotch() ? 85 : 70,
          flexDirection: 'row',
         
         paddingHorizontal:5,
          paddingBottom: DeviceInfo.hasNotch() ? 20 : 5,
        }}>

        <Clickable
          style={{
            ...CommonStyles.flex1style,
            ...CommonStyles.ContentCenterstyle,
          }}
          onPress={async() => {
          let logincheck=   await AsyncStorage.getItem('ISUSERLOGIN');
          if(logincheck == '1'){
            AsyncStorage.setItem('')
            this.props.navigation.navigate('MainAligner')

          }else{
            this.props.navigation.navigate('Login')

          }

           
          }}>
          <Image
            style={{alignSelf: 'center', width: 32, height: 32}}
            resizeMode={'contain'}
            source={Images.MenuHomeUnselect}></Image>
        </Clickable>
        <Clickable
          style={{
            ...CommonStyles.flex1style,
            ...CommonStyles.ContentCenterstyle,
          }}
          onPress={() => {
            this.props.navigation.navigate('UploadSuccessTeethSelfies')


            // this.checkLogin(2);
            // console.log(
            //   'dsahbadjsab',
            //   store.getState().common.active_tab_number,
            // );
          }}>
          <Image
            style={{alignSelf: 'center', width: 35, height: 28}}
            resizeMode={'stretch'}
            source={Images.MenuCameraSelected}></Image>
        </Clickable>
        <Clickable
          style={{
            ...CommonStyles.flex1style,
            ...CommonStyles.ContentCenterstyle,
          }}
          onPress={() => {
            AsyncStorage.getItem('ISUSERLOGIN').then((login)=>{
              if(login == '1'){
                this.props.navigation.navigate('Setting')
              }else{
                this.props.navigation.navigate('Login')
              }
            })
            // this.checkLogin(4);
          }}>
          <Image
            style={{alignSelf: 'center', width: 32, height: 28}}
            resizeMode={'contain'}
            source={Images.MenuUser}></Image>
        </Clickable>

        <Clickable
          style={{
            ...CommonStyles.flex1style,
            ...CommonStyles.ContentCenterstyle,
          }}
          onPress={() => {
            // this.props.navigation.navigate('Login')

            // this.checkLogin(4);
          }}>
          <Image
            style={{alignSelf: 'center', width: 32, height: 28}}
            resizeMode={'contain'}
            source={Images.MenuUser}></Image>
        </Clickable>

        <FloatingButton/>
      </View>
            </View>

            </>
        )
    }
}



export default UploadSuccessTeethSelfies;
