import React, {Component} from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  ProgressBarAndroid,
  StyleSheet,
  Modal,
} from 'react-native';
import {Clickable, Button, ScrollContainer, AlertDialog} from '../../common';
import {connect} from 'react-redux';
import {Images, String} from '../../../utils';
import RNRestart from 'react-native-restart'; // Import package from node modules
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {NavigationEvents} from 'react-navigation';
import CommonStyles from '../../common/CommonStyles';
import Styles from '../Styles/Setting.styles';
import {
  ALIGNER_INFO,
  GET_QUESTION,
  USER_TREATMENT_INFO,
} from '../../../network/ApiConstants';
import ApiService, {METHOD} from '../../../network/ApiService';
import ImagePicker from 'react-native-image-picker';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {string} from 'prop-types';
import Animated from 'react-native-reanimated';
import {strings} from '../../../language/Language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  clearSession,
  getItem,
  getLanugage,
  setLanguage,
} from '../../../data/PrefUtils';
import {USER,KEY_LANGUAGES} from '../../../data/PrefKeys';
import {store} from '../../../App';
import {setactivetabnumber} from '../../../actions/CommonActions';
import {germanFormatDate} from '../../../utils/Utils';
import FloatingButton from '../../Home/ChildComponent/FloatingButton';
import DeviceInfo from 'react-native-device-info';

var VIEW_ADD = 1;
var VIEW_UPLOAD = 2;
var VIEW_NEXT = 3;

class Setting extends Component {
  state = {
    alignerQuestions: [],
    title: '',
    email: '',
    daysLeft: '',
    currentAligner: '',
    language: '',
    treatmentStop: false,
    isNotLogin:false,
    lang:false,
    settings: [
      {
        type: 1,
        // title: strings.resetTreamtnet,
        title: 'Reset Treatment',
        
        img: Images.resetTreatment,
      },
      {
        type: 2,
        // title: strings.notificationSetting,
        title: 'Notification Settings',

        
        img: Images.notificationBell,
      },
      {
        type: 3,
        // title: strings.progressSelfies,
        title: 'Progress Selfies',

        img: Images.settingUser,
      },
    ],
  };

  async _alignerLogoutDialog() {
    console.log('LOGOUT');
    let lang = await getLanugage();
    await clearSession();

    AsyncStorage.setItem('ISUSERLOGIN','0')
    // store.dispatch(setactivetabnumber(1));
    // Navigator.resetNavigation('Home');
    this.props.navigation.navigate('Welcome')
    setLanguage(lang);
  }
  async _getUserTreatmentInfo() {
    let languageCode = await getLanugage();
    this.setState({
      language: strings.languagekey,
    });
    ApiService(
      USER_TREATMENT_INFO,
      {},
      (res) => {
        console.log(res);
        this.setState({
          alignerQuestions: res.data.data,
          spinner: false,
        });

        this._myAlignerInfoApi();
      },
      (error) => {
        //  Utils.showDangerToast(error)
        //   store.dispatch(setactivetabnumber(2))
        // Navigator.navigate('Home')
        //Navigator.push('TeethSelfies')
        Utils.showDangerToast(error);
        this.setState({
          spinner: false,
        });
      },
      METHOD.POST,
    );
  }

  componentDidMount() {

    this._getUserTreatmentInfo();
    this._setUserName();
  }

  _renderAlignerChange() {
    return (
      <View>
        <View>
          <Text style={Styles.txtButtonLabel}>
            {"Reminder to Switch Aligner It's time to switch your aligner!"}
          </Text>
          <Text style={Styles.txtButtonDesc}>
            {'Change from Aligner 5 to Aligner 6'}
          </Text>
          <Button
            style={{marginTop: 26}}
            onPress={() => {}}
            title={'CHANGE ALIGNER'}></Button>
          <Clickable style={{}} onPress={() => {}}>
            <View style={{marginTop: 23}}>
              <Text style={{alignItems: 'center', textAlign: 'center'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.PureBlack,
                    fontFamily: FontName.regular,
                  }}>
                  {'Not now?'}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.PureBlack,
                    fontFamily: FontName.simibold,
                  }}>
                  {'Change Settings'}
                </Text>
              </Text>
            </View>
          </Clickable>
        </View>
      </View>
    );
  }

  _renderQuestionItems = ({item}) => {
    console.log(item.name);
    return (
      <Clickable
        onPress={async () => {
       this.props.navigation.navigate('UpdateQuestion', {question: item});
        }}>
        <View>
          <View style={Styles.cellContainer}>
            <Text style={Styles.txtButtonLabel}>{item.name == 'start Plan'? strings.startplan:
              item.name == 'Total Upper Jaw Aligner'? strings.totalupperjawAligner:
               item.name == 'Total Lower Jaw Aligner'? strings.totallowerjawAligner: 
               item.name == 'Daily Goal'? strings.dailygoal:item.name }</Text>
            <Text style={Styles.txtButtonDesc}>
              {item.type == 'calendar'
                ? germanFormatDate(item.value)
                : item.value}
            </Text>
            <Image
              source={Images.arrow}
              style={{
                height: 20,
                width: 20,
                resizeMode: 'center',
                transform: [{rotate: '270deg'}],
              }}></Image>
          </View>
        </View>
      </Clickable>
    );
  };

  _getAlignerAnswers(item) {}
  
  _renderSettingsItems = ({item}) => {
    
    return (
      <Clickable
        onPress={async () => {
          if (item.type == 1) {
            this.props.navigation.navigate('PatientQuestion',{alignerQuestions:this.state.alignerQuestions,})
            // Navigator.push('PatientQuestion', {
            //   alignerQuestions: this.state.alignerQuestions,
            // });
          } else if (item.type == 2) {
            this.props.navigation.navigate('NotificationSetting');
          } else if (item.type == 3) {
            this.props.navigation.navigate('AlignerProgressSelfies');
          }
          //      Navigator.push('EditProfile');
        }}>
        <View style={Styles.cellContainer}>
          <Text style={Styles.txtButtonLabel}>{item.title == 'Reset Treatment'? strings.resetTreamtnet:item.title == 'Notification Settings'? strings.notificationSetting :item.title == 'Progress Selfies'? strings.progressSelfies:item.title }</Text>
          <Image
            source={item.img}
            style={{height: 20, width: 20, resizeMode: 'contain'}}></Image>
        </View>
      </Clickable>
    );
  };

  async _myAlignerInfoApi() {
    this.setState({
      spinner: false,
    });
    ApiService(
      ALIGNER_INFO,
      {},
      (res) => {
        console.log(res);

        this._setAlignerInfo(res.data.data);
        this.setState({
          spinner: false,
        });
      },
      (error) => {
        Utils.showDangerToast(error);
        this.setState({
          spinner: false,
        });
      },
      METHOD.GET,
    );
  }

  _setAlignerInfo(data) {
    var dailyReport = data.dailyreport;
    var switchAligner = data.switch_aligner;
    let userTreatmentPlan = data.user_treatment_plan;
    this.state.currentAligner = userTreatmentPlan.current_aligner;
    /// Comparing daily report  and switch aligner with date, if date equal then the aligner value is true .....
    /// Comparing daily
    ///   Adding 4 days to checking the values
    this.setState({
      treatmentStop: data.treatmentstop,
      daysLeft: userTreatmentPlan.left_days,
      currentAligner: this.state.currentAligner,
    });
  }

  async _setUserName() {
    let email = JSON.parse(await getItem(USER)).username;
    const emailLower = email.toString().toLowerCase();
    let userName = strings.happySmile;
    this.setState({
      title: userName,
      email: emailLower + '',
    });
  }

  render() {
    return (
      <View style={{...CommonStyles.flex1style, ...Styles.container}}>
        {/* <NavigationEvents
          onDidFocus={async () => {
            await this.componentDidMount();
          }}
        /> */}


        <ScrollView>

        
       
       <View style={{flexDirection:'row',paddingVertical:5, justifyContent:'space-between', paddingHorizontal:15 , }}>
    
    
    
       <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.lang}
        
      >

<>

<View style={CommonStyles.flex1style}>


    <View style={{ backgroundColor: Colors.Defaultwhite, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1 }}>

  


<Text style={styles.chooseLanguage}>{strings.chooseLanguage}</Text>
        <View style={{alignItems:'flex-start'}}>
        <Clickable style={{marginTop: 27,}} onPress={() => {
             strings.setLanguage("de")
             this.setState({lang:false})
             this.setState({language:'de'})
          //  this.navigationtopage("de")
          //  RNRestart.Restart();

        }}>
            <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                <Image source={Images.German}></Image>
                <Text style={{ ...styles.languageButton, marginStart: 20,alignSelf:'center' }}>{strings.german}</Text>
            </View>
        </Clickable>
        <Clickable
         style={{marginTop: 27,}}
        onPress={() => {
             strings.setLanguage("en")
             this.setState({lang:false})
             this.setState({language:'en'})

         
            //  var lang1=     getLanugage()
            //  if(lang1){
            //    alert(JSON.stringify(lang1))
            //     //  strings.setLanguage(lang1)
            //  }
             


        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                <Image source={Images.England}></Image>
                <Text style={{ ...styles.languageButton, marginStart: 20 ,alignSelf:'center'}}>{strings.english}</Text>
            </View>
        </Clickable>

        <Clickable
        
        style={{marginTop: 27,}}
        onPress={() => {
             strings.setLanguage("it")
             this.setState({lang:false})
             this.setState({language:'it'})




          //  this.navigationtopage("it")
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                <Image source={Images.Italian}></Image>
                <Text style={{ ...styles.languageButton, marginStart: 20,alignSelf:'center' }}>{strings.italian}</Text>
            </View>
        </Clickable>

        <Clickable
        
        style={{marginTop: 27,}}
        onPress={() => {
             strings.setLanguage("fr")
             this.setState({lang:false})
             this.setState({language:'fr'})



          
          // this.navigationtopage("fr")
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                <Image source={Images.French}></Image>
                <Text style={{ ...styles.languageButton, marginStart: 20 ,alignSelf:'center'}}>{strings.french}</Text>
            </View>
        </Clickable>
        <Clickable
         style={{marginTop: 27,}}
          onPress={() => {
             strings.setLanguage("es")
             this.setState({lang:false})
             this.setState({language:'es'})


          //  this.navigationtopage("es")
        }}>
            <View style={{   flexDirection: 'row', alignItems: 'center',  }} >
                <Image source={Images.Spanish}></Image>
                <Text style={{ ...styles.languageButton, marginStart: 20,alignSelf:'center' }}>{strings.spanish}</Text>
            </View>
        </Clickable>
        <Clickable 
         style={{marginTop: 27,}}
         onPress={() => {
             strings.setLanguage("nl")
             this.setState({lang:false})

             this.setState({language:'nl'})


        // this.navigationtopage("nl")
        }}>
            <View style={{  flexDirection: 'row', alignItems: 'center',  }} >
                <Image source={Images.Dutch}></Image>
                <Text style={{ ...styles.languageButton, marginStart: 20,alignSelf:'center' }}>{strings.dutch}</Text>
            </View>
        </Clickable>
        </View>


        <Button
  onPress={()=> {this.setState({lang:false})}}

  title="Cancel"
  style={{paddingHorizontal:25,
    backgroundColor:'red',
    borderRadius:10,
    marginTop:40,
    alignSelf:'center',
    width:'30%',
    paddingVertical:5,
    }}
      color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>


        {/* <TouchableOpacity 
        onPress={()=> { 
          
          
          // this.setState({lang:false})
        
        }}
        style={{paddingHorizontal:30,
        backgroundColor:'red',
        borderRadius:10,
        marginTop:40,
        paddingVertical:10,
        }}>
           <Text style={{color:'white', fontWeight:'bold'}}>Cancel</Text>
    </TouchableOpacity> */}

        {/* <TouchableOpacity 
        onPress={()=> { 
          
          
          // this.setState({lang:false})
        
        }}
        style={{paddingHorizontal:30,
        backgroundColor:'red',
        borderRadius:10,
        marginTop:40,
        paddingVertical:10,
        }}>
           <Text style={{color:'white', fontWeight:'bold'}}>Cancel</Text>
    </TouchableOpacity> */}

    
   
       


    </View>

   
</View>
</>



  </Modal>
     
     
       <Clickable
            style={{height: 25, width: 25,marginTop:Platform.OS == 'ios'? 50 :50 , }}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={Images.BackIcon}
              style={{width: 25,alignSelf:'center', height: 25}}></Image>
          </Clickable>


       <View>

       <Text style={Styles.txtUserNameBold}> {this.state.title}</Text>
            <Text
              style={{
                ...Styles.txtUserNameBold,
                fontSize: 16,
                marginTop: 0,
                textTransform: 'capitalize',
              }}>
              {' '}
              {this.state.email}
            </Text>
         </View>

          <Clickable
            style={{height: 25, width: 25,marginTop:Platform.OS == 'ios'? 50 :20 , }}
            >
         
          </Clickable>

         

         </View>



          <View >
            

            <Text style={Styles.txtAlignerCount}>
              {' '}
              {this.state.treatmentStop
                ? strings.treatment_stopped
                : this.state.daysLeft == null
                ? '0'
                : this.state.daysLeft == null + strings.perfectSmile}
            </Text>
            <View>
              <View style={Styles.cellContainer}>
                <Text style={Styles.txtButtonLabel}>
                  {strings.currentAligner}
                </Text>
                <Text style={Styles.txtButtonDesc}>
                  {this.state.currentAligner}
                </Text>
              </View>
            </View>
            <FlatList
              style={{marginTop: 12}}
              scrollEnabled={false}
              data={this.state.alignerQuestions}
              showsVerticalScrollIndicator={false}
              renderItem={(item) => this._renderQuestionItems(item)}
              keyExtractor={(item, index) => 'key' + index}
            />
            <FlatList
              style={{marginTop: 85}}
              scrollEnabled={false}
              data={this.state.settings}
              showsVerticalScrollIndicator={false}
              renderItem={(item) => this._renderSettingsItems(item)}
              keyExtractor={(item, index) => 'key' + index}
            />
            <Clickable style={Styles.cellContainer} 
            // onPress={()=> { strings.setLanguage("nl")}}
             >
              <Text style={Styles.txtButtonLabel}>{strings.language}</Text>
              <Text onPress={()=> {

                this.setState({lang: true})
              }} style={Styles.txtButtonDesc}>{this.state.language}</Text>
            </Clickable>
            <Clickable style={{}} onPress={() => this.props.navigation.navigate('DoctorChat')}>
              <View style={Styles.cellContainer}>
                <Text style={Styles.txtButtonLabel}>{strings.contactUs}</Text>
              </View>
            </Clickable>
            <View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                marginBottom: 40,
              }}>
              <Clickable
                style={{marginTop: 22}}
                onPress={() => this._alignerLogoutDialog()}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={Images.settingLogoutUser}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'contain',
                    }}></Image>
                  <Text style={Styles.txtlogout}>{strings.logout}</Text>
                </View>
              </Clickable>
            </View>
          </View>
        </ScrollView>


        {/* <View
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
          onPress={async() => {
          let logincheck=   await AsyncStorage.getItem('ISUSERLOGIN');
          if(logincheck == '1'){
            this.props.navigation.navigate('MainAligner')

          }else{
            this.props.navigation.navigate('Login')

          }

           
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
            AsyncStorage.getItem('Question').then((v)=>
            {
              if(v == '1'){
                this.props.navigation.navigate('ProgressSelfies');
  
              }else{
                this.props.navigation.navigate('PatientQuestion');
  
              }

            })
         
          }}>
          <Image
            style={{alignSelf: 'center', width: 35, height: 28}}
            resizeMode={'stretch'}
            source={Images.MenuCamera}></Image>
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
            // this.props.navigation.navigate('Login')

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
            // AsyncStorage.getItem('ISUSERLOGIN').then((login)=>{
              // if(login == '1'){
                // this.props.navigation.navigate('Login')
              // }else{
              //   this.props.navigation.navigate('EditProfile')
              // }
            // })

            // this.checkLogin(4);
          }}>
          <Image
            style={{alignSelf: 'center', width: 32, height: 28}}
            resizeMode={'contain'}
            source={Images.MenuUser}></Image>
        </Clickable>

        <FloatingButton/>
      </View> */}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default Setting;
