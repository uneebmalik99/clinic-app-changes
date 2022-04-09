import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Alert,
  SafeAreaView,
  Keyboard,
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
import {Platform} from 'react-native';
import CommonStyles from '../../common/CommonStyles';
import {LOGIN_USER} from '../../../network/ApiConstants';
import ApiService, {METHOD} from '../../../network/ApiService';
import {
  getItem,
  setItem,
  setNotificationEnable,
  setToken,
} from '../../../data/PrefUtils';
import {
  USER,
  IS_LOGGED_IN,
  FIRST_SELFIES_UPLOAD_STATUS,
  QUESTION_STATUS,
  FIREBASE_TOKEN,
} from '../../../data/PrefKeys';
import {store} from '../../../App';
import {setactivetabnumber} from '../../../actions/CommonActions';
import ProgressLoader from 'react-native-loading-spinner-overlay';

var QueryString = require('querystring');

import {notifications} from '../../../notifications/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends Component {
  state = {
    spinner: false,
    emailaddress: '',
    orderId: '',
  };

  

  getToken = async () => {

    //get the messeging token
    //you can also call messages.getToken() (does the same thing)

    return token;
  };

  login_user = async () => {
    if (Utils.isEmpty(this.state.emailaddress)) {
      Utils.showDangerToastLoginRegister(
        strings.pleaseenter + ' ' + strings.emailaddress,
      );
    } else if (!Utils.isValidEmail(this.state.emailaddress)) {
      Utils.showDangerToastLoginRegister(
        strings.pleaseentervalid + ' ' + strings.emailaddress,
      );
    } else if (Utils.isEmpty(this.state.orderId)) {
      Utils.showDangerToastLoginRegister(strings.pleaseenter + ' Order ID');
    } else {
      const token = await notifications.getToken();


      // const billbee = require('billbee-node-api')({
      //   apiKey: '',
      //   user: 'AppDev',
      //   pass: 'Ali.sufyan'
      // });
       
      // billbee.get('orders')
      //   .then((res) => console.log(res.Data));


      let params = {
        email: this.state.emailaddress,
        device_type: Platform.OS,
        order_id: this.state.orderId,
        fcm_token: token,
        lang_code: strings.languagekey,
      };
      console.log(params);
      this.setState({
        spinner: !this.state.spinner,
      });

      ApiService(
        LOGIN_USER,
        params,
        (res) => {
          console.log('res.data');
          console.log(res.data);
          // alert(JSON.str81ingify(res.data))
          AsyncStorage.setItem('email',this.state.emailaddress)
          AsyncStorage.setItem('Orderid',this.state.orderId)
          Utils.showToastRegister(res.data.message);
          let params = {
            email: this.state.emailaddress,
            order_id: this.state.orderId,
            customer_id: res.data.customer_id.toString(),
          };
         console.log(JSON.stringify(res));
        //  alert(JSON.stringify(res.data))
        //  alert(this.state.orderId)
          this.props.navigation.navigate('VerificationCode',{ email: this.state.emailaddress ,order_id: this.state.orderId, customer_id : res.data.customer_id.toString(),} );
          this.setState({
            spinner: false,
          });
        },
        (error) => {
          console.log(error);

          if (error == strings.purchase) {
            this.props.navigation.goBack();
            Utils.showToast(error);

            console.log(error);
          }
          if (error == strings.purchase1) {
            this.props.navigation.goBack();
            Utils.showToast(error);
            console.log(error);

          } else {
            console.log(error);

            Utils.showDangerToastLoginRegister(error, (bottom = 0));
          }
          console.log(error);

          this.setState({
            spinner: false,
          });
        },
        METHOD.POST,
      );
    }
  };

  async _redirectToHomeScreen(res) {
    await setToken(res.data.data.form_token);
    await setItem(USER, JSON.stringify(res.data.data));
    await setItem(IS_LOGGED_IN, '1');
    await setItem(
      FIRST_SELFIES_UPLOAD_STATUS,
      res.data.teeth_selfies.toString(),
    );
    await setItem(QUESTION_STATUS, res.data.key.toString());
    await setNotificationEnable();
    //  Utils.showToast(res.data.message)
    store.dispatch(setactivetabnumber(1));
    this.setState({
      spinner: false,
    });
    setNotificationEnable();
    //    this.props.navigation.goBack()
    
    this.props.navigation.navigate('Theethselfies');
  }

 componentDidMount(){
   alert(strings.languagekey)
  //  let p= this.props.route.params('email')
  
  //  alert(p)
 }
  render() {
    return (
      <>
        <KeyboardAvoidingView
          style={{flex:1,backgroundColor:'white'}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <Clickable
            style={{marginStart: 20, height: 25, width: 25,marginTop:Platform.OS == 'ios'? 50 :20 , backgroundColor:'white' }}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={Images.BackIcon}
              style={{width: 25, height: 25}}></Image>
          </Clickable>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              justifyContent: 'center',
              alignContent: 'center',
              flex: 1,
            }}>
            <View
              style={{
                ...CommonStyles.flex1style,
                backgroundColor: Colors.Defaultwhite,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 37,
              }}>
              <Text
                style={{
                  fontSize: 22,
                  color: Colors.PureBlack,
                  alignSelf: 'center',
                  fontFamily: FontName.simibold,
                }}>
                {strings.Login}
              </Text>

              <EditText
                hint={strings.youremail}
                left={Images.Email}
                inputType={'email-address'}
                value={this.state.emailaddress}
                onChangeText={(text) => {
                  this.setState({emailaddress: text});
                }}
                style={{
                  borderWidth: 1,
                  borderColor: Colors.NormalGreyColor,
                  alignSelf: 'center',
                  borderRadius: 0,
                  marginTop: 21,
                  backgroundColor: Colors.Defaultwhite,
                }}></EditText>

              <EditText
                hint={'Order Id'}
                left={Images.Key}
                inputType={'email-address'}
                value={this.state.orderId}
                autoCapitalize="characters"
                isHashEnable={true}
                onChangeText={(text) => {
                  let txt = text.toUpperCase();
                  this.setState({orderId: txt});
                }}
                style={{
                  borderWidth: 1,
                  borderColor: Colors.NormalGreyColor,
                  alignSelf: 'center',
                  borderRadius: 0,
                  marginTop: 21,
                  backgroundColor: Colors.Defaultwhite,
                }}></EditText>

              <Button
                style={{marginTop: 26}}
                onPress={() => {
                  this.login_user();
                }}
                title={strings.Submit}></Button>

              <Text style={{textAlign: 'center', marginTop: 40}}>
                <Text
                  style={{
                    fontSize: 11,
                    color: Colors.lightGreyColor,
                    alignSelf: 'center',
                    textDecorationLine: 'underline',
                    fontFamily: FontName.regular,
                  }}>
                  {'Note: '}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    color: Colors.lightGreyColor,
                    alignSelf: 'center',
                    textDecorationLine: 'none',
                    fontFamily: FontName.regular,
                  }}>
                  {
                    'You can find your order ID in the order confirmation e-mail for your impression kit.'
                  }
                </Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ProgressLoader
            style={{fontFamily: FontName.simibold}}
            visible={this.state.spinner}
            textContent={''}
          />
        </View>

        </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default Login;
