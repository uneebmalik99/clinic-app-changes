import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    FlatList,
    Dimensions,
    ImageBackground,
} from 'react-native';
import {
    MainContainer,
    ScrollContainer,
    FloatingEditText,
    Button,
    Clickable,
    EditText,
    ProgressDialog,
} from '../../common';
import { connect } from 'react-redux';
import { strings } from '../../../language/Language';

import { Images, FontName, FontSize, Colors, Utils } from '../../../utils';


import CommonStyles from '../../common/CommonStyles';
import { FORGOT_PWD_USER } from '../../../network/ApiConstants';
import ApiService, { METHOD } from '../../../network/ApiService';
import ProgressLoader from 'react-native-loading-spinner-overlay';

class ForgotPassword extends Component {


    state = {
        emailaddress: '',
        spinner:false,
    };

    forgotpwd_user = async () => {
        if (Utils.isEmpty(this.state.emailaddress)) {
            Utils.showDangerToast(strings.pleaseenter + " " + strings.emailaddress)
        } else if (!Utils.isValidEmail(this.state.emailaddress)) {
            Utils.showDangerToast(strings.pleaseentervalid + " " + strings.emailaddress)
        } else {
            let params =
            {
                'email': this.state.emailaddress,
            }
            this.setState({
                spinner: !this.state.spinner
            });
            ApiService(FORGOT_PWD_USER, params, (res) => {
                console.log("Login User Data:->", res.data)
                Utils.showToast(res.data.message)
                this.setState({
                    spinner: false
                });
                this.props.navigation.goBack()
                //      Navigator.resetNavigation("Home")
            }, (error) => {
                Utils.showDangerToast(error)
                console.log("Login User error:->", error)
                this.setState({
                    spinner: false
                });

            }, METHOD.POST
            )
        }
    }



   


    render() {
        return (


            <>
  
            <View style={CommonStyles.flex1style}>
                <Clickable style={{ marginStart: 20, height: 25,marginTop:20, width: 25, }} onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Image source={Images.BackIcon}   style={{width:25,height:25}} ></Image>
                        </Clickable>
                 
                    <View style={{ ...CommonStyles.flex1style, backgroundColor: Colors.Defaultwhite, justifyContent: 'center', alignItems: 'center',paddingHorizontal:37 }}>
                    <Text style={{ fontSize: 22, color: Colors.PureBlack, alignSelf: 'center', fontFamily: FontName.simibold }}>{strings.Forgotyourpassword}</Text>
                    <EditText hint={strings.youremail}
                        left={Images.Email}
                        inputType={'email-address'}
                        value={this.state.emailaddress}
                        onChangeText={(text) => {
                            this.setState({ emailaddress: text })
                        }}
                        style={{ borderWidth: 1, borderColor: Colors.NormalGreyColor, alignSelf: 'center', borderRadius: 0, marginTop: 21, backgroundColor: Colors.Defaultwhite, }}></EditText>
                   
                    <Button style={{ marginTop: 26 }}
                        onPress={() => { this.forgotpwd_user() }}
                        title={strings.send}></Button>
                  
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
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
