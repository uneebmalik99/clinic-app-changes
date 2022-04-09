import React, { Component } from 'react';
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
} from 'react-native';
import {
    MainContainer,
    ScrollContainer,
    Button,
    Clickable,
    ProgressDialog,
    EditText,
} from '../../common';
import { connect } from 'react-redux';
import { strings } from '../../../language/Language';
import styles from '../Styles/Loginandregister.style';
import { Images, FontName, FontSize, Colors, Utils } from '../../../utils';

import CommonStyles from '../../common/CommonStyles';
import { DatePicker } from 'native-base';
import ApiService, { METHOD } from '../../../network/ApiService';
import { REGISTER_NEW_USER } from '../../../network/ApiConstants';
import ProgressLoader from 'react-native-loading-spinner-overlay';
var QueryString  = require('querystring');

// import DatePicker from '../../common/ModalDatePicker';
class Register extends Component {
    state = {
        FIRSTNAME: '',
        LASTNAME:'',
        Password: '',
        Email: '',
        spinner: false,
    };

    create_new_user = async () => {
        if (Utils.isEmpty(this.state.FIRSTNAME)) {
            Utils.showDangerToastLoginRegister(strings.pleaseenter + " " + strings.FullName)
        } else if (Utils.isEmpty(this.state.LASTNAME)) {
            Utils.showDangerToastLoginRegister(strings.pleaseenter + " " + strings.FullName)
        } 
        else if (Utils.isEmpty(this.state.Email)) {
            Utils.showDangerToastLoginRegister(strings.pleaseenter + " " + strings.emailaddress)
        } else if (!Utils.isValidEmail(this.state.Email)) {
            Utils.showDangerToastLoginRegister(strings.pleaseentervalid + " " + strings.emailaddress)
        }
        else if (Utils.isEmpty(this.state.Password)) {
            Utils.showDangerToastLoginRegister(strings.pleaseenter + " " + strings.password)
        }
       else {
            this.setState({
                spinner: !this.state.spinner
            });
            let params = {
                'first_name': this.state.FIRSTNAME,
                'last_name':this.state.LASTNAME,
                'email': this.state.Email,
                'password': this.state.Password,
            }
            ApiService(REGISTER_NEW_USER, params, (res) => {
                this.setState({
                    spinner: !this.state.spinner
                });
                console.log("Registernewuser Data:->", res.data)
                let params = {
                    'first_name': this.state.FIRSTNAME,
                    'last_name':this.state.LASTNAME,
                    'email': this.state.Email,
                    'password': this.state.Password,
                    'customer_id':'',
                    'type':''
                }

                this.props.navigation.navigate("VerificationCode",params)
                Utils.showToastRegister(res.data.message)
            }, (error) => {
                this.setState({
                    spinner: !this.state.spinner
                });
                Utils.showDangerToastLoginRegister(error)
            }, METHOD.POST
            )
        }
    }

    render() {
        return (
            <>
     <View style={CommonStyles.flex1style}>
                <Clickable style={{ marginStart: 20, height: 25, width: 25,marginTop:20, }} onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Image source={Images.BackIcon}   style={{width:25,height:25}} ></Image>
                        </Clickable>
                        <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',

          alignContent: 'center',
        }}
            style={{flex:1,height:"100%"}}
        >

                    <View style={{ ...CommonStyles.flex1style, backgroundColor: Colors.Defaultwhite, justifyContent: 'center' }}>
                        <View style={{ marginTop: 20, marginHorizontal: 40 }}>
                            <Text style={{ fontSize: 22, color: Colors.PureBlack, alignSelf: 'center', fontFamily: FontName.simibold }}>{strings.Register}</Text>

                            <EditText hint={strings.yourname}
                                left={Images.user}
                                inputType={'email-address'}
                                value={this.state.FIRSTNAME}
                                onChangeText={(text) => {
                                    this.setState({ FIRSTNAME: text })
                                }}
                                style={{ borderWidth: 1, borderColor: Colors.NormalGreyColor, alignSelf: 'center', borderRadius: 0, marginTop: 21, backgroundColor: Colors.Defaultwhite, }}></EditText>

<EditText hint={strings.lastName}
                                left={Images.user}
                                inputType={'email-address'}
                                value={this.state.LASTNAME}
                                onChangeText={(text) => {
                                    this.setState({ LASTNAME: text })
                                }}
                                style={{ borderWidth: 1, borderColor: Colors.NormalGreyColor, alignSelf: 'center', borderRadius: 0, marginTop: 21, backgroundColor: Colors.Defaultwhite, }}></EditText>

                       
                            <EditText hint={strings.youremail}
                                left={Images.Email}
                                value={this.state.Email}
                                inputType={'email-address'}

                                onChangeText={(text) => {
                                    this.setState({ Email: text })
                                }}
                                style={{ borderWidth: 1, borderColor: Colors.NormalGreyColor, alignSelf: 'center', borderRadius: 0, marginTop: 21, backgroundColor: Colors.Defaultwhite }}></EditText>
                            <EditText hint={strings.ChooseYourPassword}
                                left={Images.Password}
                                password
                                value={this.state.Password}
                                onChangeText={(text) => {
                                    this.setState({ Password: text })
                                }}
                                style={{ borderWidth: 1, borderColor: Colors.NormalGreyColor, alignSelf: 'center', borderRadius: 0, marginTop: 21, backgroundColor: Colors.Defaultwhite }}></EditText>
                            <Button style={{ marginTop: 23 }}
                                onPress={() => {
                                    this.create_new_user()
                                }}
                                title={strings.CreateAccount}></Button>
                            <Clickable style={{}} onPress={() => { 
                                this.props.navigation.goBack()
                            }}>
                                <View style={{ height: 40, marginTop: 22 }} >
                                    <Text style={{ alignItems: 'center', textAlign: 'center' }}>
                                        <Text style={{ fontSize: 14, color: Colors.PureBlack, fontFamily: FontName.regular }}>{strings.alreadyhaveaccount}</Text>
                                        <Text style={{ fontSize: 14, color: Colors.PureBlack, fontFamily: FontName.simibold }}>{strings.Login}</Text>
                                    </Text>
                                </View>
                            </Clickable>
                            <Text style={{ textAlign: 'center', marginTop: 40 }}>
                                <Text style={{ fontSize: 11, color: Colors.lightGreyColor, alignSelf: 'center', textDecorationLine: 'none', fontFamily: FontName.regular }}>{strings.reg_privacypolicy1}</Text>
                                <Text style={{ fontSize: 11, color: Colors.lightGreyColor, alignSelf: 'center', textDecorationLine: 'underline', fontFamily: FontName.regular }}>{strings.reg_privacypolicy2}</Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>

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



}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
