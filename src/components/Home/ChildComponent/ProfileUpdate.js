import React, { Component } from 'react';
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
    SafeAreaView,
    ImageBackground,
    Alert,
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
import { strings } from '../../../language/Language';

import { Images, FontName, FontSize, Colors, Utils } from '../../../utils';
import { Platform } from 'react-native'
// import { NavigationEvents } from 'react-navigation';
import CommonStyles from '../../common/CommonStyles';
import { UPDATE_PROFILE } from '../../../network/ApiConstants';
import ApiService, { METHOD } from '../../../network/ApiService';
import { getItem, setItem, setToken } from '../../../data/PrefUtils';
import { USER, IS_LOGGED_IN, FIRST_SELFIES_UPLOAD_STATUS, QUESTION_STATUS } from '../../../data/PrefKeys';
import { store } from '../../../App';
import { setactivetabnumber } from '../../../actions/CommonActions';
import ProgressLoader from 'react-native-loading-spinner-overlay';
var QueryString = require('querystring');
import ImagePicker from 'react-native-image-picker';
import RenderFooter from './RenderFooter';
import Styles from '../Styles/ProfileUpdate.style'
import { Picker } from '@davidgovea/react-native-wheel-datepicker';
import { ScrollView } from 'react-native-gesture-handler';
import FloatingButton from './FloatingButton';

//
const countryCode = [
	'+44',
	'+1',
	'+213',
	'+376',
	'+244',
	'+1264',
	'+1268',
	'+54',
	'+374',
	'+297',
	'+61',
	'+43',
	'+994',
	'+1242',
	'+973',
	'+880',
	'+1246',
	'+375',
	'+32',
	'+501',
	'+229',
	'+1441',
	'+975',
	'+591',
	'+387',
	'+267',
	'+55',
	'+673',
	'+359',
	'+226',
	'+257',
	'+855',
	'+237',
	'+1',
	'+238',
	'+1345',
	'+236',
	'+56',
	'+86',
	'+57',
	'+269',
	'+242',
	'+682',
	'+506',
	'+385',
	'+53',
	'+90392',
	'+357',
	'+42',
	'+45',
	'+253',
	'+1809',
	'+1809',
	'+593',
	'+20',
	'+503',
	'+240',
	'+291',
	'+372',
	'+251',
	'+500',
	'+298',
	'+679',
	'+358',
	'+33',
	'+594',
	'+689',
	'+241',
	'+220',
	'+7880',
	'+49',
	'+233',
	'+350',
	'+30',
	'+299',
	'+1473',
	'+590',
	'+671',
	'+502',
	'+224',
	'+245',
	'+592',
	'+509',
	'+504',
	'+852',
	'+36',
    '+354',
    '+91',
    '+62',
    '+98',
    '+964',
    '+353',
    '+972',
    '+39',
    '+250',
    '+378',
    '+239',
    '+966',
    '+221',
    '+381',
    '+248',
    '+232',
    '+65',
    '+421',
    '+386',
    '+677',
    '+252',
    '+27',
    '+34',
    '+94',
    '+290',
    '+1869',
	'+1758',
	'+249',
	'+597',
	'+268',
	'+46',
	'+41',
	'+963',
	'+886',
	'+7',
	'+66',
	'+228',
	'+676',
	'+1868',
	'+216',
	'+90',
	'+7',
	'+993',
	'+1649',
	'+688',
	'+256',
	'+380',
	'+971',
	'+598',
	'+7',
	'+678',
	'+379',
	'+58',
	'+84',
	'+1284',
	'+1340',
	'+681',
	'+969',
	'+967',
	'+260',
	'+263',
    '+1876',
    '+81',
   '+962',
   '+7',
   '+254',
   '+686',
   '+850',
   '+82',
   '+965',
   '+996',
   '+856',
   '+371',
   '+961',
   '+266',
   '+231',
   '+218',
  '+417',
  '+370',
  '+352',
  '+853',
  '+389',
  '+261',
  '+265',
  '+60',
  '+960',
  '+223',
  '+356',
  '+692',
  '+596',
  '+222',
  '+269',
  '+52',
  '+691',
  '+373',
  '+377',
  '+976',
  '+1664',
  '+212',
  '+258',
  '+95',
  '+264',
  '+674',
  '+977',
  '+31',
  '+687',
  '+64',
  '+505',
  '+227',
  '+234',
  '+683',
  '+672',
  '+670',
  '+47',
  '+968',
  '+680',
  '+507',
  '+675',
  '+595',
  '+51',
  '+63',
  '+48',
  '+351',
  '+1787',
  '+974',
  '+262',
  '+40',
  '+7',
   
];

class ProfileUpdate extends Component {
    state = {
        spinner: false,
        username: '',
        email: '',
        country_code:'',
        mobile_no:'',
        image:'',
        isEditable:false,
        dropDownPickerDialog:false,
    };


    componentDidMount(){
        this.setUserInfo();
    }

    async setUserInfo(){
        let userInfo=  JSON.parse( await getItem(USER))
        console.log(userInfo)
        this.setState({
            username:userInfo.username,
            email:userInfo.email,
            country_code:userInfo.country_code,
            mobile_no:userInfo.mobile_no,
            image:userInfo.image
        })

        if(Utils.isEmpty(userInfo.country_code)){
            this.setState({
                country_code:'+91',
            })
        }else{

        }
    }

    login_user = async () => {
        if (Utils.isEmpty(this.state.email)) {
            Utils.showDangerToast(strings.pleaseenter + " " + strings.emailaddress)
        } else if (Utils.isEmpty(this.state.username)) {
            Utils.showDangerToast(strings.pleaseenter + " " + strings.userName)
        } else if (!Utils.isValidEmail(this.state.email)) {
            Utils.showDangerToast(strings.pleaseentervalid + " " + strings.emailaddress)
        }else if (Utils.isEmpty(this.state.mobile_no)) {
            Utils.showDangerToast(strings.pleaseenter + " " + strings.mobileNo)
        } else {

            this.setState({
                isEditable:false
            })
            let params =
            {
                'username': this.state.username,
                'email': this.state.email,
                'mobile_no': this.state.mobile_no,
                'image': this.state.image,
                'country_code':this.state.country_code,
            }
        this.setState({ 
            spinner: !this.state.spinner
        });
        ApiService(UPDATE_PROFILE, params, (res) => {
            Utils.showDangerToast(res.data.message);
            this.setState({
                spinner: false
            });
            this.profileUpdate()
        }, (error) => {
            Utils.showDangerToast(error)
            console.log("Login User error:->", error)
            this.setState({
                spinner: !this.state.spinner
            });

        }, METHOD.POST
        )
        /*
           */
        }
    }

    async profileUpdate(){
        let userInfo=  JSON.parse( await getItem(USER))
        userInfo.country_code=this.state.country_code;
        userInfo.mobile_no=this.state.mobile_no;
        userInfo.image=this.state.image
        await  setItem(USER, JSON.stringify(userInfo))
        this.props.navigation.goBack()
    }

    _imageLaunchCamera() {
        ImagePicker.launchCamera(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 800,
                maxWidth: 800,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    console.log(response);
                    this.setState({
                        image: response.data,
                    })
                    console.log(response.data)
                }

            },
        )
    }

  
    render() {
        return (
          
            
            <>
  
         
          <View style={{ ...CommonStyles.flex1style, color:Colors.BG_Pink }}>
          
            <View style={{ ...CommonStyles.flex1style, ...Styles.container,color:Colors.BG_Pink }}>
                 <Clickable style={{ marginStart: 20, height: 25, width: 25,marginTop:20, }} onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Image source={Images.BackIcon}   style={{width:25,height:25}} ></Image>
                        </Clickable>
                {/* <NavigationEvents onDidFocus={() => {
                        this.componentDidMount();
}} /> */}

            <ScrollView>

                <View style={{ ...CommonStyles.flex1style, backgroundColor: Colors.Defaultwhite, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 37 }}>
               
                    <View>
                    <Clickable
                    style={{marginTop:40}}
                        onPress={()=>{
                            if(this.state.isEditable){
                                this._imageLaunchCamera()
                            }
                        }}
                        >
                        {
                      
                      this.state.image?(  <Image
                                source={{ uri: `data:image/png;base64,${this.state.image}`}}
                                style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 120 / 2,
                                    overflow: "hidden",
                                    borderWidth: 1,
                                    borderColor: Colors.lightGreyColor
                                  }}
                                />):( 
                                    <Image
                                    source={Images.user}
                                    style={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: 120 / 2,
                                        overflow: "hidden",
                                        borderWidth: 1,
                                        borderColor: Colors.lightGreyColor
                                      }}
                                    />
                                ) 
                        }
                       </Clickable>
                           {this.state.isEditable &&(<Image source={Images.SelfieCamera} style={{ width: 47, height: 47,position: "absolute", bottom: 0, right: 0 }} resizeMode='contain'/>)}
                       </View>
                    <Text  style={ (this.state.isEditable? Styles.txtUpdateProfileNormalStyle:Styles.txtNormalStyle)}>{this.state.email}</Text>
                       <Text  style={ (this.state.isEditable? Styles.txtUpdateProfileNormalStyle:Styles.txtNormalStyle)}>{this.state.username}</Text>
                       <View style={Styles.mobileNoContainer}>
                  <Clickable style={Styles.countryContainerDropDown} onPress={()=>{
                      if(this.state.isEditable){
                    this.setState({
                        dropDownPickerDialog:true
                      })
                    }
                }} >
                          <Text style={Styles.countryDropDown}>{this.state.country_code}</Text>
                        <View style={{width:31,height:51 ,marginStart: 10,alignItems:'center',justifyContent:'center'}}>
                        <Image source={Images.Dropdown} resizeMode='center' ></Image>
                   </View>
                </Clickable>
                <TextInput  
                 placeHolderTextColor={ Colors.PureBlack }
                 style={Styles.edtProfileUpdate}  
                    placeholder={strings.phone_No} 
                    multiline={false}
                    returnKeyType={'done'}
                    keyboardType = 'numeric'
                    editable={this.state.isEditable}
                      maxLength={14} 
                      value={this.state.mobile_no} 
                    onChangeText={(text) => this.setState({mobile_no:text})}  
                />  
                  </View>
   <Button style={{ marginTop: 46 }}
                        onPress={() => { 
                            if(this.state.isEditable){
                                
                            this.login_user()
                        }else{
                            this.setState({
                                isEditable:true
                            })
                        } }}
                        title={this.state.isEditable? strings.UpdateProfile:strings.EditProfile}></Button>
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
            {this.state.dropDownPickerDialog && (
                    <View style={Styles.containerMainDropDown}>
                        <View style={{ ...Styles.containerDropDown, }}>
                            <Text style={Styles.txtDropDownTitle}>  Select country code</Text>
                            <Picker
                                style={{ flex: 1, backgroundColor: Colors.LightBlue }}
                                selectedValue={this.state.country_code}
                                pickerData={countryCode}
                                onValueChange={value => {
                                    this.setState({
                                        country_code: value,
                                    })
                                }}
                            />
                            <Button style={{ marginTop: 26 }}
                                onPress={() => {
                                    this.setState({
                                        dropDownPickerDialog: false
                                    })
                                }}
                                title={strings.Submit}></Button>
                        </View>
                    </View>
                )}

       
<RenderFooter  
                 typeImage={4}
                 />



                <FloatingButton>
                    
                    </FloatingButton>

                      </View>
                      </>

        )
    }
}



export default ProfileUpdate;
