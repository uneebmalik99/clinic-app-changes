import React, { Component } from 'react'
import { Image, StatusBar, View, ImageBackground, Text, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../../actions/CommonActions'
import { Colors, Images, Utils } from '../../../utils';
import { Button, Clickable, EditText } from '../../common';
import { strings } from '../../../language/Language';
import CommonStyles from '../../common/CommonStyles';
import styles from '../Style/Location.styles';
import { getItem, getLanugage, setLanguage } from '../../../data/PrefUtils';
import { IS_LOGGED_IN } from '../../../data/PrefKeys';


import PushNotificationIOS from '@react-native-community/push-notification-ios';

class ChooseLanguage extends Component {

   
    constructor(props){
        super(props)
        this.state = {
            isNotLogin:false,

        };
    }
    componentDidMount() {
        this.checkLangugage()
        this.isLogin()
    }
    async isLogin(){
    let is_log_in = await getItem(IS_LOGGED_IN)
    if( is_log_in == 1 ){
        this.setState({
            isNotLogin:false
            })
        }else{
            this.setState({
                isNotLogin:true
            })


}
   
    }
    async checkLangugage(){
        
    var lang=    await getLanugage()
    if(lang){
        strings.setLanguage(lang)
    }
    }
    navigationtopage = async(language) => {
        // await  setLanguage(language)
    this.props.navigation.navigate("Welcome")

    }
    sendLocalNotification = () => {
        PushNotificationIOS.presentLocalNotification({
          alertTitle: 'Sample Title',
          alertBody: 'Sample local notification',
          applicationIconBadgeNumber: 1,
        });
    };
    scheduleLocalNotification = () => {

        
       
        //   PushNotificationIOS.addNotificationRequest({
        //     id:'1',
        //     title:'Aligner Reminder',
        //     body:'bjhvhh',
        //     fireDate: new Date(),
           
        //   });

    //   var date2 =  new Date()
    //   date2.setSeconds(date2.getSeconds() +  25)
    //   console.log(date2.toISOString());
    // //   alert(date2)
    //         PushNotificationIOS.addNotificationRequest({
    //           id: 'test',
    //           title: 'title',
    //           subtitle: 'subtitle',
    //           body: 'body',
    //           category: 'test',
    //           threadId: 'thread-id',
    //           fireDate: new Date().toISOString(),
    //           repeats: true,
    //           userInfo: {
    //             image: 'https://www.github.com/Naturalclar.png',
    //           },
    //         });
          
        // var date= new Date();
        // date.setSeconds(date.getSeconds()+15)
        // PushNotificationIOS.scheduleLocalNotification({
        //     //... You can use all the options from localNotifications
        //     alertTitle:'Aligner Reminder',
        //     message: "My Notification Message", // (required)
        //     // date: new Date(Date.now()+5), // in 60 secs
        //     allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        //     fireDate:date.toISOString(),
           
        //     /* Android Only Properties */
        //     // repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        //   });


        PushNotificationIOS.addNotificationRequest({
            id: 'test-1',
            title: 'First',
            subtitle: 'subtitle',
            body: 'First Notification out of 3',
            category: 'test',
            threadId: 'thread-id',
            fireDate: new Date(new Date().valueOf() + 1000),
            repeats: true,
          });
      
          PushNotificationIOS.addNotificationRequest({
            id: 'test-2',
            title: 'Second',
            subtitle: 'subtitle',
            body: 'Second Notification out of 3',
            category: 'test',
            threadId: 'thread-id',
            fireDate: new Date(new Date().valueOf() + 1200),
            repeats: true,
          });
      
          PushNotificationIOS.addNotificationRequest({
            id: 'test-3',
            title: 'Third',
            subtitle: 'subtitle',
            body: 'Third Notification out of 3',
            category: 'test',
            threadId: 'thread-id',
            fireDate: new Date(new Date().valueOf() + 1400),
            repeats: true,
          });
        
    };

    render() {
        return (
          <>

            <View style={CommonStyles.flex1style}>
                <View style={{ backgroundColor: Colors.Defaultwhite, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1 }}>



           {  this.state.isNotLogin &&  <>

            <Text style={styles.chooseLanguage}>{strings.selectstore}</Text>

            <Text style={{textAlign:'center',fontSize:15,fontWeight:'400', marginTop:10, paddingHorizontal:'18%'}}>Please select the domain where you ordered your Impressions kit</Text>

                    <View style={{alignItems:'flex-start'}}>
                    <Clickable style={{marginTop: 27,}}
                     onPress={() => {
                        //  strings.setLanguage("de")
                       this.navigationtopage("de")
                    }}
                    >
                        <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                            <Image source={Images.German}></Image>
                            {/* <Text style={{ ...styles.languageButton, marginStart: 20,alignSelf:'center' }}>{strings.german}</Text> */}
                            <Text style={{ ...styles.languageButton, marginStart: 20,alignSelf:'center' }}>smileunion.de</Text>

                        </View>
                    </Clickable>
                    <Clickable
                     style={{marginTop: 27,}}
                    onPress={() => {
                        //  strings.setLanguage("en")

                       this.navigationtopage("en")
                    }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                            <Image source={Images.England}></Image>
                            <Text style={{ ...styles.languageButton, marginStart: 20 ,alignSelf:'center'}}>smileunion.eu</Text>

                            <Text style={{ ...styles.languageButton, marginStart: 20 ,alignSelf:'center'}}></Text>
                        </View>
                    </Clickable>

                    <Clickable
                    
                    style={{marginTop: 27,}}
                    onPress={() => {
                        //  strings.setLanguage("it")

                       this.navigationtopage("it")
                    }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                            <Image source={Images.Italian}></Image>
                            {/* <Text style={{ ...styles.languageButton, marginStart: 20,alignSelf:'center' }}>{strings.italian}</Text> */}
                            <Text style={{ ...styles.languageButton, marginStart: 20,alignSelf:'center' }}>smile-union.it</Text>
                        </View>
                    </Clickable>

                    <Clickable
                    
                    style={{marginTop: 27,}}
                    onPress={() => {
                        //  strings.setLanguage("fr")
                      
                      this.navigationtopage("fr")
                    }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                            <Image source={Images.French}></Image>
                            {/* <Text style={{ ...styles.languageButton, marginStart: 20 ,alignSelf:'center'}}>{strings.french}</Text> */}

                            <Text style={{ ...styles.languageButton, marginStart: 20 ,alignSelf:'center'}}>smileunion.fr</Text>
                        </View>
                    </Clickable>
                    <Clickable
                     style={{marginTop: 27,}}
                      onPress={() => {
                        //  strings.setLanguage("es")

                       this.navigationtopage("es")
                    }}
                    >
                        <View style={{   flexDirection: 'row', alignItems: 'center',  }} >
                            <Image source={Images.Spanish}></Image>
                            {/* <Text style={{ ...styles.languageButton, marginStart: 20,alignSelf:'center' }}>{strings.spanish}</Text> */}

                            <Text style={{ ...styles.languageButton, marginStart: 20,alignSelf:'center' }}>smileunion.es</Text>
                        </View>
                    </Clickable>
                    <Clickable 
                     style={{marginTop: 27,}}
                     onPress={() => {
                        //  strings.setLanguage("nl")
                    this.navigationtopage("nl")
                    }}
                    >
                        <View style={{  flexDirection: 'row', alignItems: 'center',  }} >
                            <Image source={Images.Dutch}></Image>
                            {/* <Text style={{ ...styles.languageButton, marginStart: 20,alignSelf:'center' }}>{strings.dutch}</Text> */}

                            <Text style={{ ...styles.languageButton, marginStart: 20,alignSelf:'center' }}>smileunion.nl</Text>
                        </View>
                    </Clickable>
                    <Clickable 
                     style={{marginTop: 27,}}
                     onPress={() => {
                        //  strings.setLanguage("nl")
                    this.navigationtopage("nl")
                    }}
                    >
                        <View style={{  flexDirection: 'row', alignItems: 'center',  }} >
                            <Image source={Images.England}></Image>
                            {/* <Text style={{ ...styles.languageButton, marginStart: 20,alignSelf:'center' }}>{strings.dutch}</Text> */}

                            <Text style={{ ...styles.languageButton, marginStart: 20,alignSelf:'center' }}>smileunion.co.uk</Text>
                        </View>
                    </Clickable>
                    </View>

                    {/* <Button
            onPress={this.scheduleLocalNotification}
            label="Send fake local notification"
          /> */}
               
               </>

           }
                </View>
            </View>
            </>
        )
    }
}

const mapStateToProps = (state) => {

    return {}
}

const mapDispatchToProps = {}

export default ChooseLanguage

