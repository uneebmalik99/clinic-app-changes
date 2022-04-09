import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    SafeAreaView,
} from 'react-native';
import {
    Clickable,
    Button,
    ScrollContainer,
} from '../../common';
import { connect } from 'react-redux';
import { strings } from '../../../language/Language';
import { Images, FontName, FontSize, Colors, Utils } from '../../../utils';
import RenderFooter from '../../Home/ChildComponent/RenderFooter';
import CommonStyles from '../../common/CommonStyles';
import Styles from '../Styles/ContactDentist.styles'
import FloatingButton from '../../Home/ChildComponent/FloatingButton';
import { store } from '../../../App';
import { setactivetabnumber } from '../../../actions/CommonActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

class ContactDentist extends Component {
  
    
    render() {
        return (
            <>

         <View style={{ ...CommonStyles.flex1style, backgroundColor: Colors.BG_Pink }}>
                <View style={{
                    flexDirection: 'row',  alignItems: 'center', width: '100%'
                }
                }>

                   <View style={{flex:1}}>
                    </View>
                    <Clickable onPress={ async()=>{
                        // alert('j')
           await  store.dispatch(setactivetabnumber(8))
           await AsyncStorage.setItem('diseased','1')
             this.props.navigation.navigate("Welcome")

                //   Navigator.resetNavigation("Home")
              }}>
                    <Image source={Images.close} style={{ marginEnd: 20, marginTop: 51, height: 40, width: 40 }} ></Image>
                    </Clickable>
                </View>
                <View style={Styles.container}>
                    <Image source={Images.Info} style={{ marginVertical: 37, height: 66, width: 66 }} resizeMode={'stretch'}></Image>
                    <Text style={Styles.txtTitle}> {this.props.route.params.message}</Text>
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
            
            this.props.navigation.navigate('Theethselfies', )

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
            this.props.navigation.navigate('ConfirmSelfies')


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
            </>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default  ContactDentist;
