import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    ProgressBarAndroid,
    StyleSheet,
    Switch
} from 'react-native';
import {
    Clickable,
    Button,
    ScrollContainer,
} from '../../common';
import { connect } from 'react-redux';
import { Images, Colors } from '../../../utils';
import CommonStyles from '../../common/CommonStyles';

import Styles from '../Styles/NotificationSetting.styles'
import { string } from 'prop-types';
import { getNotificationValue, setItem, setNotificationDisable, setNotificationEnable } from '../../../data/PrefUtils';
// import { NavigationEvents } from 'react-navigation';

class NotificationSetting extends Component {
    state = {
        spinner: false,
        isEnabled: false
    }

    componentDidMount(){
            this.checkNotification()
    }

    
    async checkNotification(){
        let notification=await getNotificationValue()
        console.log('----------notification')
     
        console.log(notification)
        if(notification && notification =='1'){
            this.setState({
                isEnabled:true
            })
        }else{
            this.setState({
                isEnabled:false
            })
        }
    }


    async _changeNotification(switchValue){
        if(switchValue){
            setNotificationEnable()
        }else{
            setNotificationDisable()
        }
    }

    render() {
        return (
           
           
            <>
  
            {/* <NavigationEvents onDidFocus={async () => {
                    await this.componentDidMount()
                }} /> */}

           <View style={{ ...CommonStyles.flex1style, ...Styles.container }}>
            
         

                <ScrollView>
                    <View style={Styles.headerContainer}>
                        <Clickable  
                        style={{
                            marginTop:51,
                            marginStart: 20,
                        }}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Image source={Images.BackIcon} style={{  height: 25, width: 25 }} ></Image>
                        </Clickable>
                        <Text style={{...Styles.txtTitle,
                            marginTop:60,
                        }}> {'Notification'}</Text>
                    </View>
                    <View style={Styles.cellContainer}>
                        <Text style={Styles.txtButtonLabel} >{'App Notification'}</Text>
                        <Switch
                            onValueChange ={(switchValue)=>{
                                this.setState({
                                    isEnabled:switchValue
                                })
                                this._changeNotification(switchValue)
                     
                            }}
                            trackColor={{ false: "#767577", true: '#F45561'}}
                            thumbColor={this.state.isEnabled ?'#F45561' : "#f4f3f4"}
                            value={this.state.isEnabled}
                        />
                    </View>
                </ScrollView>
            </View>
            </>
        )
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default NotificationSetting;
