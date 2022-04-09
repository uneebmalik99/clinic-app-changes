import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import {
    Clickable,
} from '../../../common';
import { connect } from 'react-redux';
import { strings } from '../../../../language/Language';
import { Images, FontName, FontSize, Colors, Utils } from '../../../../utils';
import RenderFooter from '../../../Home/ChildComponent/RenderFooter';
import CommonStyles from '../../../common/CommonStyles';
import Styles from '../../Styles/TeethSelfies.styles'
import Navigator from '../../../../navigation/Navigator';
import ImagePicker from 'react-native-image-picker';
import ApiService, { METHOD } from '../../../../network/ApiService';
import { UPLOAD_SELFIES  ,UPDATE_SELFIES} from '../../../../network/ApiConstants';
var VIEW_ADD = 1;
var VIEW_UPLOAD = 2;
var VIEW_IMAGE_SELECTED = 3;
import ProgressLoader from 'react-native-loading-spinner-overlay';
import FloatingButton from '../../../Home/ChildComponent/FloatingButton';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_TOKEN} from '../../../../data/PrefKeys';

class LaterallyClosedLeftSide extends Component {


    constructor(props){
        super(props);
        this.state={
            AddImage: VIEW_ADD,
            imagePath: null,
            base64:"",
            spinner:false,
            aligner:this.props.route.params.aligner,
            title:this.props.route.params.title,
            orderid:'',
            username:'',
            Apitoken:'',
            email:'',
            
        }
    
    }


    componentDidMount (){
        AsyncStorage.getItem('Orderid').then((value)=>{
            this.setState({orderid:value})
        })
        AsyncStorage.getItem('email').then((value)=>{
            this.setState({email:value})
        })
        AsyncStorage.getItem('username').then((username)=>{
            this.setState({username:username})
        })
        AsyncStorage.getItem(API_TOKEN).then((Apitoken1)=>{
            this.setState({Apitoken:Apitoken1})
        })
    }

    renderElement() {
        if (this.state.AddImage == VIEW_ADD) {

            return <Clickable style={{  marginTop: 45 }} onPress={async () => {
                this.setState({
                    AddImage: VIEW_UPLOAD
                })
            }} >
                <Image source={Images.SelfieAdd} style={{ width: 67, height: 67}}resizeMode='contain' >
                </Image>
            </Clickable>
                ;
        } else if (this.state.AddImage == VIEW_UPLOAD) {
            return <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

                <Clickable style={{ marginStart: 12,marginEnd:12, marginTop: 45 }} onPress={async () => {
                    this._imageLaunchCamera();
                }}
                >
                    <Image source={Images.SelfieCamera} style={{ width: 67, height: 67,  }} resizeMode='contain' >
                    </Image>

                </Clickable>
                <Clickable  style={{ marginStart: 12,marginEnd:12, marginTop: 45 }} onPress={async () => {
                    this._resetImage()

                }} >
                    <Image source={Images.SelfieCross} style={{ width: 67, height: 67,  }}resizeMode='contain' >
                    </Image>
                </Clickable>
                <Clickable style={{ marginStart: 12,marginEnd:12, marginTop: 45 }} onPress={async () => {
                    this._imageLaunchImageLibrary();
                }} >
                    <Image source={Images.SelfieGallery} style={{ width: 67, height: 67,}}resizeMode='contain' >
                    </Image>
                </Clickable>
            </View>

        } else if (this.state.AddImage == VIEW_IMAGE_SELECTED) {
            return <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Clickable style={{ marginStart: 12,marginEnd:12, marginTop: 45 }} onPress={async () => {
                        this._resetImage()
            }}
                >
                    <Image source={Images.Trash} style={{ width: 67, height: 67}}resizeMode='contain' >
                    </Image>

                </Clickable>
              
                <Clickable  style={{ marginStart: 12,marginEnd:12, marginTop: 45 }}onPress={async () => {
    
                        this._sendImageUpload();

    }} >
                    <Image source={Images.RoundCheck} style={{ width: 67, height: 67}}resizeMode='contain' >
                    </Image>
                </Clickable>
            </View>
        }
        return null;
    }

    _resetImage() {
        this.setState({
            AddImage: VIEW_ADD,
            imagePath: null
        })
    }

    _resetImageChange(){
        this.setState({
            AddImage: VIEW_UPLOAD,
            imagePath: null
        })  
    }

    _confirmImage(){
        this.setState({
            AddImage: VIEW_IMAGE_SELECTED,
        })  
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
                        imagePath: response.uri,
                        base64:response.data
                    })
                    this._confirmImage()
                }

            },
        )
    }

    _imageLaunchImageLibrary() {
        ImagePicker.launchImageLibrary(
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
                        imagePath: response.uri,
                        base64:response.data
                    })
                    this._confirmImage()
                }
            },
        )
    }
    
    _sendImageUpload(){
        this.setState({
            spinner: true
        });     
        let form = new FormData();

        form.append( 'aligner', this.state.aligner);
        form.append('selfie_type', 5);
        form.append('title', this.state.title);
       
        form.append("image", {
            uri: this.state.imagePath,
            type: "image/jpeg",
            name: this.state.email+'_'+this.state.aligner+"_Side View - Left Side_"+new Date().toLocaleString()+"photo.jpg"
            // UserID_AligerNumber_SelfieNumber_Date.jpg
        });
        form.append('lang', "eng");
    
        ApiService( this.state.title == "Before Treatment Selfies"? UPLOAD_SELFIES:UPDATE_SELFIES, form, (res) => {

            // alert(JSON.stringify(res))
            
            
                this.salesapicall(res.data.data);
               
            }, (error) => {
                Utils.showDangerToast(error)
                this.setState({
                    spinner: !this.state.spinner
                });
    
            }, METHOD.MULTIPART
            )

    }
   
    salesapicall(data){

        var value0 = new FormData();
        value0.append("grant_type", 'password');
        value0.append("client_id", '3MVG9SOw8KERNN08.tmC_Q5eR0V2Wi5fOqzKtRUQNSGLuQnB5YZL_Abj8qIgmDPChZO7FdBq9BEURaQQi8.cp');
        value0.append("client_secret", 'AF8D42AE1994C29B7DB7B7E89547DABA09AD139309FAA9E0B4734F758CB70602');
        value0.append("username", 'smileunion+integration@salesfive.com');
        value0.append("password", 'rxa0qpd.YZY0drw3fwn');

        
        var url = 'https://login.salesforce.com/services/oauth2/token';
        fetch(url, {
          method: "POST",
          body: value0,
       
        })
          .then((response) => response.json())
          .then((responseJson) => {
        this.salesapicall2(data, responseJson.access_token, responseJson.token_type);
            // this.setState({ isLoading: false })
          })
          .catch((error) => {
            Utils.showDangerToast(error)
            this.setState({
                spinner: !this.state.spinner
            });
             // this.setState({ isLoading: false })
          });
    }

    salesapicall2(urlimg,token2, type){
        var url = 'https://smileunion.my.salesforce.com/services/apexrest/create_picture';
        fetch(url, {
          method: "POST",
          headers: {
         "Authorization": "Bearer " +token2,
        "Content-Type": "application/json",
          },
          body: JSON.stringify({
                 "name": this.state.username,            
                "orderNo": this.state.orderid.toString,            
                "url":urlimg,
            }),
       
        })
        .then((response) =>  response.json())
          .then((responseJson) => {
         
        this.setState({
            spinner: !this.state.spinner
        });
        this.props.navigation.navigate('LaterallyClosedRightSide',{
            'aligner':this.state.aligner,
            'title':this.state.title,
        })

            // this.setState({ isLoading: false })
          })
          .catch((error) => {
            Utils.showDangerToast(error)

            this.setState({
                spinner: !this.state.spinner
            });
            
            // this.setState({ isLoading: false })
          });
    }


    render() {
        return (

            <>
  
          
            <View style={{flex:1}}>

            <View style={{ ...CommonStyles.flex1style, ...Styles.mainContainer, backgroundColor: Colors.BG_Pink }}>
                <ScrollView>
                       <View style={Styles.container}>
                        <Image source={this.state.imagePath == null ? Images.TeethLaterralyClosedLeftSide : { uri: this.state.imagePath }}style={{ flex: 1,  marginVertical: 20, height: 240, width: '95%' }} resizeMode={'contain'}></Image>
                        <Text style={Styles.txtTitle}> {strings.teeth5Title}</Text>
                        <Text style={Styles.txtDesc}> {strings.teeth5Desc}</Text>
                        {this.renderElement()}
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
            
            AsyncStorage.getItem('FirstSelfiesUploaded').then((login)=>{
                if(login == '1'){
            this.props.navigation.navigate('MainAligner')
                }else{
                    this.props.navigation.navigate('Theethselfies')

                }})
            // this.checkLogin(1);
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
            this.props.navigation.navigate('LaterallyClosedLeftSide')


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

export default LaterallyClosedLeftSide;
