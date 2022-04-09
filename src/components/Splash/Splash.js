import React, { Component } from 'react'
import { Image, StatusBar, View, ImageBackground } from 'react-native'

import { connect } from 'react-redux'

import * as actions from '../../actions/CommonActions'

import { Colors, Images } from '../../utils';

import { getItem } from '../../data/PrefUtils'
import { IS_INTRO_DONE, IS_LOGGED_IN, SUCCESSFUL, CURRENCY, KEY_LANGUAGE_ID, KEY_LANGUAGE_CONTENT } from '../../../src/data/PrefKeys'
import Navigator from '../../navigation/Navigator';
import { DIAL_CODE } from '../../utils/AppConstants';
import { strings } from '../../language/Language';
import { isEmpty } from '../../utils/Utils';
import { Button } from '../common';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Splash extends Component {


    componentDidMount() {
        // alert('jj')
        // setTimeout(() => {
            AsyncStorage.getItem('Firsttime').then((value)=> {
                // alert(value)
                if(value == '1'){
                    AsyncStorage.getItem('ISUSERLOGIN').then((value2)=> {
                        if(value2 == '1'){
                            AsyncStorage.getItem('FirstSelfiesUploaded').then((value3)=> {                      
                                if(value3 == '1'){
                                    console.log('jjjjjjjjjjjj')

                                    this.props.navigation.navigate('MainAligner')
                                }else{
                                    // alert('jg')
                                    console.log('jjjjjjjjjjjj')
                                    this.props.navigation.navigate('Theethselfies')
                                }                            
                            })
                        }else
                        {
                            // alert('kjh')
                            this.props.navigation.navigate('Welcome')
                        }             
                }) 
                }else{
                    // this.props.navigation.navigate('ChooseLanguage')
                    this.props.navigation.navigate('TutorialScreen')
            
                }
            
            })
        // }, 1800);



    }

    // _navigationtolocationpage = async () => {
    //     this.props.navigation.navigate("Loacation")
    // }
   
    render() {


        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor='transparent' translucent />

                <View style={{
                    flex: 1,
                    // alignItems: 'center',
                    // backgroundColor: Colors.Defaultwhite,
                    // justifyContent: 'center'
                }}>
                    <ImageBackground style={{ flex: 1, justifyContent: 'center' }} 
                  
                    >

                    </ImageBackground>
                    <View>

                    </View>
                </View>
            </View>
        )
    }
}

export default Splash

