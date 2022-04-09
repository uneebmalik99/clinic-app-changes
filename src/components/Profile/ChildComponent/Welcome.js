import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
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

import {Images, FontName, FontSize, Colors, Utils} from '../../../utils';

// import {NavigationEvents} from 'react-navigation';
import CommonStyles, {windowHeight, windowWidth} from '../../common/CommonStyles';
import Styles from '../Styles/HomeTab.styles';
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
class Welcome extends Component {
  state = {
    routes: [],
    title: strings.GetYourStarterKit,
    isMenuOpen: false,
  };
  componentDidMount() {
    
    // this.setButtonTitle();
  }

  async setButtonTitle() {
    let logged = await getItem(IS_LOGGED_IN);
    if (logged == 1) {
      let teethSelfies = await getItem(QUESTION_STATUS);
      if (teethSelfies == '1') {
        this.setState({
          title: 'Take a selfie',
        });
      } else {
        this.setState({
          title: strings.GetYourStarterKit,
        });
      }
    } else {
      this.setState({
        title: strings.GetYourStarterKit,
      });
    }
  }

  renderItem = ({item, index}) => {
    return (
      <View>
        <Image source={item.image} style={Styles.image}></Image>
        <Text style={Styles.step}>{strings.step + (index + 1)}</Text>
        <Text style={{...Styles.step, marginTop: 26, color: Colors.PureBlack}}>
          {item.title}
        </Text>
        <Text style={{...Styles.stepDesc}}>{item.desc} </Text>
      </View>
    );
  };

  _callOnClickGetYourStartedKit = async () => {

    let url = await getStarterKitUrl();
    Linking.openURL(url);

    // let logged = await getItem(IS_LOGGED_IN);
    // if (logged == 1) {
    //   let teethSelfies = await getItem(QUESTION_STATUS);
    //   if (teethSelfies == '1') {
    //     Navigator.push('TeethSelfies');
    //   } else {
    //     Navigator.push('StartAligner');
    //   }
    // } else {
    //   let url = await getStarterKitUrl();
    //   Linking.openURL(url);
    // }
  };

  handleMenuToggle = (isMenuOpen) => this.setState({isMenuOpen});

  renderItemIcon = (item, index, menuState) => {
    return (
      <Image
        style={{
          height: 60,
          width: 60,
          resizeMode: 'contain',
        }}
        source={item.image}
        resizeMode="contain"
      />
    );
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
      <View style={{flex:1}}>
        {/* <NavigationEvents
          onDidFocus={async () => {
            await this.componentDidMount();
          }}
        /> */}
        <ScrollContainer>
          <View
            style={{
              ...CommonStyles.flex1style,
              backgroundColor: Colors.Defaultwhite,
              paddingStart: 37,
              paddingTop:Platform.OS == 'android' ?20:30,
              paddingEnd: 37,
            }}>
            <Text style={Styles.tryit}>{strings.tryIt}</Text>
            <Text style={Styles.tryiteasysteps}>{strings.threeEasySteps}</Text>
            <FlatList
              data={data}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => 'key' + index}
            />
            <Button
              style={{marginTop: 29, marginBottom: 43}}
              onPress={() => {
                this._callOnClickGetYourStartedKit();
              }}
              title={this.state.title}></Button>
          </View>
        </ScrollContainer>


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
            this.props.navigation.navigate('Welcome')

          }else{
            this.props.navigation.navigate('Login')

          }

           
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
          onPress={async() => {
            let logincheck=   await AsyncStorage.getItem('ISUSERLOGIN');
            if(logincheck == '1'){
              this.props.navigation.navigate('Theethselfies')
  
            }else{
              this.props.navigation.navigate('Login')
  
            }


            // this.checkLogin(2);
            // console.log(
            //   'dsahbadjsab',
            //   store.getState().common.active_tab_number,
            // );
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

      </View>
    );
  }
}


export default Welcome;
