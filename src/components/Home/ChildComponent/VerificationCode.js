import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    DeviceEventEmitter,
    NativeAppEventEmitter,
    FlatList,
    Dimensions,
    ImageBackground,
} from 'react-native';
import {
    MainContainer,
    ScrollContainer,

    Button,
    Clickable,
    EditText,
    ProgressDialog,
} from '../../common';
import { connect } from 'react-redux';
import Navigator from '../../../navigation/Navigator';
import { strings } from '../../../language/Language';

import { Images, FontName, FontSize, Colors, Utils } from '../../../utils';

import RenderHeader from './RenderHeader';
import CommonStyles from '../../common/CommonStyles';
import { LOGIN_USER, REGISTER_NEW_USER, RESEND_OTP } from '../../../network/ApiConstants';
import ApiService, { METHOD } from '../../../network/ApiService';
import CodeInput from 'react-native-confirmation-code-input';
import BackgroundTimer from 'react-native-background-timer';
import ProgressLoader from 'react-native-loading-spinner-overlay';
import { VERIFICATION_CODE } from '../../../network/ApiConstants';

import {
    notifications,
  
  } from "../../../notifications/index"
import { setItem, setNotificationEnable, setToken } from '../../../data/PrefUtils';
import { FIRST_SELFIES_UPLOAD_STATUS, IS_LOGGED_IN, QUESTION_STATUS, USER } from '../../../data/PrefKeys';
import { setactivetabnumber } from '../../../actions/CommonActions';
import { store } from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventEmitter = Platform.select({
    ios: () => NativeAppEventEmitter,
    android: () => DeviceEventEmitter,
})();


class VerificationCode extends Component {


    _startTimer() {
        BackgroundTimer.runBackgroundTimer(() => {
            var currentTimeCountDown = this.state.time - 1;

            if (this.state.time != 0) {
                this.setState({
                    time: currentTimeCountDown
                })
            }

        }, 1400);
    }

    _endTimer() {
        BackgroundTimer.stop();
    }
    constructor(props) {
        super(props);
        this.state = {
            email:    this.props.route.params.email,
            code: '',
            spinner: false,
            time: 300
        };
     }
    login_user = async () => {
        if (Utils.isEmpty(this.state.emailaddress)) {
            Utils.showToastRegister(strings.pleaseenter + " " + strings.emailaddress)
        } else {

        }
    }


    componentDidMount = async () => {
        this._startTimer();
    }


    componentWillUnmount = async () => {
        console.log("AMMMOUNT")
        this._endTimer();
    }




    _onFulfill(code) {
        this.state.code = code
        // TODO: call API to check code here
        // If code does not match, clear input with: this.refs.codeInputRef1.clear()
    }

    _resendOtp() {
        this.setState({
            spinner: true
        });
        let params =
        {
            'email': this.props.route.params.email
              
           }
        ApiService(RESEND_OTP, params, (res) => {
            this.setState({
                spinner: false
            });
            this.setState({
                time: 300
            })
            console.log("Registernewuser Data:->", res.data)
            Utils.showToastRegister(res.data.message)
        }, (error) => {
            this.setState({
                spinner: false
            });
            Utils.showToastRegister(error)
        }, METHOD.POST
        )
    }

    _renderElementResendOtp() {

        if (this.state.time == 0) {
            return <Clickable onPress={() => {
                this._resendOtp()
            }}>
                <View  >
                    <Text style={{ fontSize: 14, color: Colors.PureBlack, alignSelf: 'center', marginTop: 30, fontFamily: FontName.regular, textDecorationLine: 'underline', paddingLeft: 5, paddingRight: 5 }}>{strings.Sendagain}</Text>
                </View>
            </Clickable>
        } else {
            return <Text style={{ fontSize: 22, color: Colors.PureBlack, alignSelf: 'center', fontFamily: FontName.regular, marginTop: 27 }}>{Utils.otpLeftTime(this.state.time)}</Text>
        }
    }
    render() {
        return (
            <>
  
         <View style={CommonStyles.flex1style}>
              
              {/* <NavigationEvents onDidFocus={async () => {
                }} /> */}

                <Clickable style={{ marginStart: 20, height: 25, width: 25, marginTop:50,}} onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Image source={Images.BackIcon}   style={{width:25,height:25}} ></Image>
                        </Clickable>

                <View style={{ flex: 2, backgroundColor: Colors.Defaultwhite, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 37 }}>
                <Text style={{ fontSize: 22, color: Colors.PureBlack, alignSelf: 'center', fontFamily: FontName.simibold }}>{strings.VerificationCode}</Text>
                    <Text style={{ fontSize: 14, color: Colors.PureBlack, fontFamily: FontName.light, textAlign: 'center', marginTop: 29 }}>{strings.verificationCodeSent}</Text>
                    <View style={{ height: 80, marginTop: 25 }}>
                        <CodeInput
                            ref="codeInputRef1"
                            codeLength={4}
                            keyboardType="numeric"
                            codeInputStyle={{ fontFamily: FontName.light, color: Colors.Defaultblack, fontSize: 30, borderWidth: 1, }}
                            activeColor={Colors.PureBlack}
                            inactiveColor={Colors.NormalGreyColor}
                            space={12}
                            autoFocus={true}
                            ignoreCase={true}
                            inputPosition='center'
                            size={56}
                            onFulfill={(code) => this._onFulfill(code)}
                            onCodeChange={(code) => { this.state.code = code }}
                        />
                    </View>
                    {
                        this._renderElementResendOtp()
                    }
                    <Button style={{ marginTop: 26 }}
                        onPress={() => {

                            if (Utils.isEmpty(this.state.code)) {
                                Utils.showDangerToast(strings.pleaseenter + " " + strings.VerificationCode)
                            } else {
                                    this.callVerifyOTP()
                            }

                        }}
                        title={strings.confirm}></Button>
                </View>
                <View style={{ flex: 1, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                    <ProgressLoader
                        style={{ fontFamily: FontName.simibold }}
                        visible={this.state.spinner}
                        textContent={''}
                    />
                </View>
            </View>
            </>

        )
    }

    async callVerifyOTP(){
        const token = await notifications.getToken()
        let params =
        {
         
            'email':  this.props.route.params.email,
            'fcm_token': token,
            'customer_id': this.props.route.params.customer_id,
            'device_type': 'android',
            'otp': this.state.code,

        }
        this.setState({
            spinner: true
        });
        console.log('---------Param-------------');
        console.log(params);
        ApiService(VERIFICATION_CODE, params, (res) => {


            // alert(JSON.stringify(res))

            let username = res.data.data.username
            AsyncStorage.setItem("username",username)
            
            this._redirectToHomeScreen(res)
        }, (error) => {
            Utils.showDangerToast(error)
            console.log("Login User error:->", error)
            this.setState({
                spinner: false
            });

        }, METHOD.POST
        )
        
    }

    async _redirectToHomeScreen(res){
        Utils.showDangerToast(res.data.message)
        await setNotificationEnable()
        await  setToken(res.data.data.form_token)
        await  setItem(USER, JSON.stringify(res.data.data))
        await  setItem(IS_LOGGED_IN, '1')
        await  setItem(FIRST_SELFIES_UPLOAD_STATUS, '0')
        await  setItem(QUESTION_STATUS, '0')
        await  setItem(FIRST_SELFIES_UPLOAD_STATUS, res.data.teeth_selfies.toString())
        await  setItem(QUESTION_STATUS, res.data.key.toString())
        await setNotificationEnable()
       await AsyncStorage.setItem('Question',res.data.key.toString())
        // alert(res.data.key.toString())
       console.log('+++++',JSON.stringify(res));
    await   AsyncStorage.setItem('ISUSERLOGIN','1')

      await AsyncStorage.getItem(FIRST_SELFIES_UPLOAD_STATUS).then((v)=>{
        AsyncStorage.setItem('FirstSelfiesUploaded',res.data.key.toString())
        if(FIRST_SELFIES_UPLOAD_STATUS == 1){

            this.props.navigation.navigate('Theethselfies')

        }else{
            this.props.navigation.navigate('MainAligner')

        }

       })

// this.props.navigation.navigate('Theethselfies')
        // store.dispatch(setactivetabnumber(1))
          this.setState({
              spinner: false
          });
        //  Navigator.resetNavigation("Home")

        /*       */
}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default VerificationCode;
