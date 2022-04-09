import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
  ImageBackground,
  LogBox,
  Linking,
  Platform,
} from 'react-native';
import {
  MainContainer,
  ScrollContainer,
  Button,
  Clickable,
  EditText,
  ProgressDialog,
} from '../../common';
import {connect} from 'react-redux';
import {strings} from '../../../language/Language';
import Styles from '../Styles/TeethSelfies.styles'

import {Images, FontName, FontSize, Colors, Utils} from '../../../utils';

// import {NavigationEvents} from 'react-navigation';
import CommonStyles, {windowHeight, windowWidth} from '../../common/CommonStyles';
import {getItem, getStarterKitUrl} from '../../../data/PrefUtils';
import {IS_LOGGED_IN, QUESTION_STATUS} from '../../../data/PrefKeys';
import {FloatingMenu} from 'react-native-floating-action-menu';
import DeviceInfo from 'react-native-device-info';
import FloatingButton from '../../Home/ChildComponent/FloatingButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const items = [
  {label: '', image: Images.ContactMessenger},
  {label: '', image: Images.ContactWhatsapp},
  {label: '', image: Images.ContactEmail},
];
class Theethselfies extends Component {
  state = {
    routes: [],
    title: strings.GetYourStarterKit,
    isMenuOpen: false,
  };
 

  render() {
    const data = [
      {
        title: strings.step1Title,
        desc: strings.step1Desc,
        image: Images.TryIt1,
      },
      {
        title: strings.step2Title,
        desc: strings.step2Desc,
        image: Images.TryIt2,
      },
      {
        title: strings.step3Title,
        desc: strings.step3Desc,
        image: Images.TryIt3,
      },
    ];

    return (
      <>
      <View style={{ ...CommonStyles.flex1style, ...Styles.mainContainer, }}>
      <ScrollView style={{marginTop:Platform.OS == 'ios'? 20: 10}}>
        
          <View style={Styles.container}>
              <Text style={Styles.txtTitle}> {strings.teethSelfies}</Text>
              <Text style={Styles.txtDesc}> {strings.teethSelfiesDesc}</Text>
              <Image source={Images.SELFIEICON} style={{ flex: 1, height:320,  width: '100%' }} resizeMode={'cover'}></Image>
              <Button style={{ marginTop: 26, marginHorizontal: 37 }}
                  onPress={() => {
                      

                      this.props.navigation.navigate("ConfirmSelfies",{ 'aligner':1,
                      'title':'Before Treatment Selfies',
                     })
                  }}
                  title={strings.TakeASelfie}></Button>

{/* <Button style={{ marginTop: 26, marginHorizontal: 37 }}
                            onPress={() => {
                                
                                this.props.navigation.navigate('MainAligner')
                            }}
                            title='go to where 1'></Button> */}
          </View>
    
      </ScrollView>
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
          onPress={() => {
            
            this.props.navigation.navigate('Theethselfies', )

            // this.checkLogin(1);
          }}>
          <Image
            style={{alignSelf: 'center', width: 32, height: 32}}
            resizeMode={'contain'}
            source={Images.MenuHome}></Image>
        </Clickable>
        <Clickable
          style={{
            ...CommonStyles.flex1style,
            ...CommonStyles.ContentCenterstyle,
          }}
          onPress={() => {
                      

            this.props.navigation.navigate("ConfirmSelfies",{ 'aligner':1,
            'title':'Before Treatment Selfies',
           })
        }}>
          <Image
            style={{alignSelf: 'center', width: 35, height: 28}}
            resizeMode={'stretch'}
            source={Images.MenuCamera}></Image>
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


      </>
    );
  }
}


export default Theethselfies;
