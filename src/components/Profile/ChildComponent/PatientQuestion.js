import React, {Component} from 'react';

import {View, Text, Image, SafeAreaView, Linking} from 'react-native';
import {Clickable, Button, ScrollContainer} from '../../common';
import {connect} from 'react-redux';
import {strings} from '../../../language/Language';
import {Images, FontName, FontSize, Colors, Utils} from '../../../utils';
// import {NavigationEvents} from 'react-navigation';
import RenderFooter from '../../Home/ChildComponent/RenderFooter';
import CommonStyles from '../../common/CommonStyles';
import Styles from '../Styles/PatientQuestion.styles';
import {
  GET_QUESTION,
  SUBMIT_QUESTION,
  SUBMIT_UPDATE_QUESTION,
} from '../../../network/ApiConstants';
import ApiService, {METHOD} from '../../../network/ApiService';
import ImageSlider from 'react-native-image-slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import {FlatList} from 'react-native-gesture-handler';
import {getItem, getLanugageName, setItem} from '../../../data/PrefUtils';
import {store} from '../../../App';
import {setactivetabnumber} from '../../../actions/CommonActions';
import Navigator from '../../../navigation/Navigator';
import {Picker, DatePicker} from '@davidgovea/react-native-wheel-datepicker';
import {QUESTION_STATUS} from '../../../data/PrefKeys';
import {germanFormatDate} from '../../../utils/Utils';
import FloatingButton from '../../Home/ChildComponent/FloatingButton';
import DeviceInfo from 'react-native-device-info';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const dialogPickerDate = 'date';
const dialogPickerTime = 'time';
const numberOfJaws = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
];
import ProgressLoader from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
class PatientQuestion extends Component {
  _onChange = (selectedDate) => {
    const date = selectedDate.toISOString().slice(0, 10);
    this.state.selectedDate = selectedDate;
    let HH = selectedDate.getHours();
    let mm = selectedDate.getMinutes();
    let ss = selectedDate.getSeconds();
    if (this.state.questions[this.state.selectedPosition].type == 'calendar') {
      this.state.selectedQuesitonValue = date;
    } else {
      var hh = HH.toString();
      if (HH.toString().length == 1) {
        hh = '0' + HH;
      }
      var MM = mm.toString();
      if (mm.toString().length == 1) {
        MM = '0' + mm;
      }
      this.state.selectedQuesitonValue = hh + ':' + MM + ':' + '00';
    }
    //  setShow(Platform.OS === 'ios');
  };

  _showDatepicker = () => {
    // showMode('date');
  };

  componentDidMount = async () => {
    this._getAllQuestion();
  };

  constructor() {
    super();

    let minimum = new Date();
    minimum.setHours(16, 0, 0, 0);

    let maximum = new Date();
    maximum.setHours(22, 0, 0, 0);
    this.state = {
      selectedPosition: 0,
      selectedDate: maximum,
      maximum: maximum,

      spinner: false,
      minimumDate: minimum,
      questions: [],
      selectedQuesitonValue: null,
      showPickerDialog: false,
      dialogType: dialogPickerDate,
      dropDownPickerDialog: false,
    };
  }

  _getTypeOfValue(status) {
    if (status == 'calendar') {
      const date = new Date().toISOString().slice(0, 10);
      return date;
    } else if (status == 'text') {
      return '1';
    } else {
      return '22:00:00 ';
    }
  }

  _onClickValue(status, pos) {
    console.error(status);
    if (status == 'calendar') {
      this.setState({
        dialogType: dialogPickerDate,
        showPickerDialog: true,
      });
      return;
    } else if (status == 'text') {
      this.setState({
        dropDownPickerDialog: true,
        showPickerDialog: false,
      });
      return;
    } else {
      this.setState({
        dialogType: dialogPickerTime,
        showPickerDialog: true,
      });
      return;
    }
  }

  _renderItems = ({item, index}) => {
    console.log(index);
    return (
      <Clickable
        onPress={() => {
          this.state.questions[
            this.state.selectedPosition
          ].selectedValues = item;
          this.setState({
            question: this.state.questions,
            dropDownPickerDialog: false,
          });
        }}>
        <View style={{...CommonStyles.flex1style, width: '100%'}}>
          <Text style={Styles.txtDropDown}> {item} </Text>
        </View>
      </Clickable>
    );
  };

  render() {
    return (
      <>
        <View
          style={{
            ...CommonStyles.flex1style,
            backgroundColor: Colors.LightBlue,
          }}>
          <View
            style={{
              ...CommonStyles.flex1style,
              backgroundColor: Colors.LightBlue,
            }}>
            {/* <NavigationEvents
              onDidFocus={async () => {
                await this.componentDidMount();
              }}
            /> */}

            <Clickable
              style={{marginStart: 20, height: 25, width: 25, marginTop: 51}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Image
                source={Images.BackIcon}
                style={{width: 25, height: 25}}></Image>
            </Clickable>

            <ImageSlider
              style={{flex: 1, backgroundColor: Colors.LightBlue}}
              key={1}
              images={this.state.questions}
              customSlide={({index, item, style, width}) => (
                // It's important to put style here because it's got offset inside
                <View style={style}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      paddingHorizontal: 37,
                      backgroundColor: Colors.LightBlue,
                    }}>
                    <Text style={{...Styles.txtTitle, marginTop: 278}}>
                      {item.question}
                    </Text>
                    <Clickable
                      style={{}}
                      onPress={() => {
                        this.state.selectedPosition = index;
                      //  alert(index)
                        this.state.selectedQuesitonValue = item.selectedValues;
                        this._onClickValue(item.type, index);
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          marginTop: 26,
                          justifyContent: 'center',
                        }}>
                        <Text style={Styles.txtDropDown}>
                          {item.type == 'calendar'
                            ? germanFormatDate(item.selectedValues)
                            : item.selectedValues}
                        </Text>
                        <Image
                          source={Images.Dropdown}
                          style={{marginStart: 20}}
                          resizeMode="center"></Image>
                      </View>
                    </Clickable>

                    {index == this.state.questions.length - 1 && (
                      <Button
                        style={{marginTop: 26,}}
                        onPress={() => {
                          this._submitQuestions();
                        }}
                        title={strings.GetStarted}></Button>
                    )}
                  </View>
                </View>
              )}
              customButtons={(position, move) => (
                <View style={Styles.buttons}>
                  {this.state.questions.map((image, index) => {
                    if (position === index) {
                      return <View style={Styles.buttonSelected}></View>;
                    } else {
                      return <View style={Styles.buttonUnSelected}></View>;
                    }
                  })}
                </View>
              )}
            />
          </View>
          {this.state.showPickerDialog && (
            <View style={Styles.containerFullDropDown}>
              <Clickable
                style={{marginStart: 20, height: 25, width: 25, marginTop: 51}}
                onPress={() => {
                  this.setState({
                    showPickerDialog: false,
                  });
                }}>
                <Image
                  source={Images.BackIcon}
                  style={{width: 25, height: 25}}></Image>
              </Clickable>
              <View style={Styles.containerMainDropDownQuestion}>
                <View style={{...Styles.containerDropDown}}>
                  <Text style={Styles.txtDropDownTitle}>
                    {' '}
                    {'Select ' + this.state.dialogType}{' '}
                  </Text>
                  {this.state.dialogType == dialogPickerDate && (
                    <DatePicker
                      style={{backgroundColor: Colors.LightBlue}}
                      date={this.state.selectedDate}
                      // minimumDate={new Date()}
                      mode={this.state.dialogType}
                      onDateChange={this._onChange}
                    />
                  )}

                  {this.state.dialogType == dialogPickerTime && (
                    <DatePicker
                      style={{backgroundColor: Colors.LightBlue}}
                      minimumDate={this.state.minimumDate}
                      maximumDate={this.state.maximum}
                      date={this.state.selectedDate}
                      mode={this.state.dialogType}
                      onDateChange={this._onChange}
                    />
                  )}
                  <Button
                    style={{marginTop: 32}}
                    onPress={() => {
                      this.state.questions[
                        this.state.selectedPosition
                      ].selectedValues = this.state.selectedQuesitonValue;
                      this.setState({
                        question: this.state.questions,
                        showPickerDialog: false,
                      });
                    }}
                    title={strings.Submit}></Button>
                </View>
              </View>
            </View>
          )}
          {this.state.dropDownPickerDialog && (
            <View style={Styles.containerFullDropDown}>
              <Clickable
                style={{marginStart: 20, height: 25, width: 25, marginTop: 51}}
                onPress={() => {
                  this.setState({
                    dropDownPickerDialog: false,
                  });
                }}>
                <Image
                  source={Images.BackIcon}
                  style={{width: 25, height: 25}}></Image>
              </Clickable>
              <View style={Styles.containerMainDropDownQuestion}>
                <View style={{...Styles.containerDropDown}}>
                  <Text style={Styles.txtDropDownTitle}>
                    {' '}
                    Select no. of aligner?
                  </Text>
                  <Picker
                    style={{flex: 1, backgroundColor: Colors.LightBlue}}
                    selectedValue={
                      this.state.questions[this.state.selectedPosition]
                        .selectedValues
                    }
                    pickerData={numberOfJaws}
                    onValueChange={(value) => {
                      this.state.selectedQuesitonValue = value;
                    }}
                  />
                  <Button
                    style={{marginTop: 26}}
                    onPress={() => {
                      // AsyncStorage.setItem("ProgressSelfies",'1')
                      // this.props.navigation.navigate('AlignerProgressSelfies')
                      this.state.questions[
                        this.state.selectedPosition
                      ].selectedValues = this.state.selectedQuesitonValue;
                      this.setState({
                        question: this.state.questions,
                        dropDownPickerDialog: false,
                      });
                    }}
                    title={strings.Submit}></Button>
                </View>
              </View>
            </View>
          )}


          
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
          onPress={async() => {
          
            this.props.navigation.navigate('MainAligner')

         

           
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
            // this.props.navigation.navigate('Login')


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

        <View
          style={{
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ProgressLoader
            style={{fontFamily: FontName.simibold}}
            visible={this.state.spinner}
            textContent={''}
          />
        </View>
      </>
    );
  }

  async _submitQuestions() {
    let questStatus = (await getItem(QUESTION_STATUS)) == '0';
    var questionsArray = [];


    for (var i = 0; i < this.state.questions.length; i++) {
      var item = {};
      item['type'] = this.state.questions[i].type;
      item['useranswer'] = this.state.questions[i].selectedValues;
      item['question_id'] = this.state.questions[i].id;
      item['title'] = this.state.questions[i].title;
      questionsArray.push(item);
    }
    this.setState({
      spinner: true,
    });
    var param = {user_answer: JSON.stringify(questionsArray)};
    ApiService(
      questStatus ? SUBMIT_QUESTION : SUBMIT_UPDATE_QUESTION,
      param,
      (res) => {
        AsyncStorage.setItem('Question','1')

        console.error(res.data);
        Utils.showDangerToast(res.data.message);
        // store.dispatch(setactivetabnumber(2));


        // Notification to switch aligner
        // var date= new Date();
        // var date2 = new Date();
        // var date3 = new Date();
        // date.setDate(date.getDate()+10)
        // date2.setDate(date.getDate()+20)
        // date3.setDate(date.getDate()+30)
     
        // PushNotificationIOS.scheduleLocalNotification({
        //     //... You can use all the options from localNotifications
        //     alertTitle:'Aligner Reminder',
        //     message: "Switch your Aligner", // (required)
        //     // date: new Date(Date.now()+5), // in 60 secs
        //     allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        //     fireDate:date.toISOString(),
        //     /* Android Only Properties */
        //     // repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        //   });

        //   PushNotificationIOS.scheduleLocalNotification({
        //     //... You can use all the options from localNotifications
        //     alertTitle:'Aligner Reminder',
        //     message: "Switch your Aligner", // (required)
        //     // date: new Date(Date.now()+5), // in 60 secs
        //     allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        //     fireDate:date2.toISOString(),
        //     /* Android Only Properties */
        //     // repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        //   });

        //   PushNotificationIOS.scheduleLocalNotification({
        //     //... You can use all the options from localNotifications
        //     alertTitle:'Aligner Reminder',
        //     message: "Switch your Aligner", // (required)
        //     // date: new Date(Date.now()+5), // in 60 secs
        //     allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        //     fireDate:date3.toISOString(),
        //     /* Android Only Properties */
        //     // repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        //   });


        this.props.navigation.navigate('ProgressSelfies')

        // Navigator.resetNavigation('Home');

        setItem(QUESTION_STATUS, '1');
        //    Navigator.push('TeethSelfies')
        //   Linking.openURL('https://www.smileunion.eu/')
        this.setState({
          spinner: false,
        });
      },
      (error) => {
        //  Utils.showDangerToast(error)
        //   store.dispatch(setactivetabnumber(2))
        // Navigator.navigate('Home')
        this.props.navigation.navigate('Theethselfies')
        AsyncStorage.setItem('Question','0')
        //Navigator.push('TeethSelfies')
        Utils.showDangerToast(error);
        this.setState({
          spinner: false,
        });
      },
      METHOD.POST,
    );
  }

  async _getAllQuestion() {
    let url = GET_QUESTION;
    this.setState({
      spinner: true,
    });
    ApiService(
      url,
      {},
      (res) => {
        console.error(res.data);
        var questionsList = res.data.data;
        for (var i = 0; i < questionsList.length; i++) {
          var values = this._getTypeOfValue(questionsList[i].type);

          questionsList[i].selectedValues = values;
        }
        this.setState({
          questions: questionsList,
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
}


export default PatientQuestion;
