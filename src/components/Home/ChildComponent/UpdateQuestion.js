import React, {Component} from 'react';

import {View, Text, Image, SafeAreaView} from 'react-native';
import {Clickable, Button, ScrollContainer} from '../../common';
import {connect} from 'react-redux';
import {strings} from '../../../language/Language';
import {Images, FontName, FontSize, Colors, Utils} from '../../../utils';
// import {NavigationEvents} from 'react-navigation';
import RenderFooter from '../../Home/ChildComponent/RenderFooter';
import CommonStyles from '../../common/CommonStyles';
import Styles from '../../Profile/Styles/PatientQuestion.styles';
import {GET_QUESTION, UPDATE_QUESTION} from '../../../network/ApiConstants';
import ApiService, {METHOD} from '../../../network/ApiService';
import ImageSlider from 'react-native-image-slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import {FlatList} from 'react-native-gesture-handler';
import {setItem} from '../../../data/PrefUtils';
import {store} from '../../../App';
import {setactivetabnumber} from '../../../actions/CommonActions';
import Navigator from '../../../navigation/Navigator';
import {Picker, DatePicker} from '@davidgovea/react-native-wheel-datepicker';
import {QUESTION_STATUS} from '../../../data/PrefKeys';
import {
  chooseUpdateQuestionTime,
  germanFormatDate,
  getUpdateQuestionDate,
} from '../../../utils/Utils';
import FloatingButton from './FloatingButton';
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

class UpdateQuestion extends Component {
  constructor(props) {
    super(props);

    let minimum = new Date();
    minimum.setHours(16, 0, 0, 0);

    let maximum = new Date();
    maximum.setHours(22, 0, 0, 0);
    let selectedDate = new Date();

    let questionObj = props.route.params.question;
    if (questionObj.type == 'calendar') {
      let date = questionObj.value;
      selectedDate = getUpdateQuestionDate(date);
    } else if (questionObj.type != 'text') {
      let time = questionObj.value;
      selectedDate = chooseUpdateQuestionTime(time);
    }

    this.state = {
      spinner: false,
      questions: questionObj,
      newQuestions: null,
      minimumDate: minimum,
      maximum: maximum,
      selectedDate: selectedDate,

      showPickerDialog: false,
      dialogType: dialogPickerDate,
      dropDownPickerDialog: false,
    };
  }

  _onChange = (selectedDate) => {
    this.state.selectedDate = selectedDate;
    const date = selectedDate.toISOString().slice(0, 10);
    let HH = selectedDate.getHours();
    let mm = selectedDate.getMinutes();
    let ss = selectedDate.getSeconds();

    if (this.state.questions.type == 'calendar') {
      this.state.newQuestions = date;
    } else {
      var hh = HH.toString();
      if (HH.toString().length == 1) {
        hh = '0' + HH;
      }
      var MM = mm.toString();
      if (mm.toString().length == 1) {
        MM = '0' + mm;
      }
      this.state.newQuestions = hh + ':' + MM + ':' + '00';
    }
    //  setShow(Platform.OS === 'ios');
  };

  _onClickValue(status) {
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

  _apiAlignerUpdate() {
    this.setState({
      spinner: true,
    });
    ApiService(
      UPDATE_QUESTION,
      this.state.questions,
      (res) => {
        console.error(res.data);
        Utils.showDangerToast(res.data.message);
        setItem(QUESTION_STATUS, '1');
        this.setState({
          spinner: false,
        });
        this.props.navigation.goBack();
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

  render() {
    return (
      <>
        <View
          style={{
            ...CommonStyles.flex1style,
            backgroundColor: Colors.LightBlue,
          }}>
          <View style={{...CommonStyles.flex1style}}>
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

            <View
              style={{
                flex: 1,
                alignItems: 'center',
                paddingHorizontal: 37,
                backgroundColor: Colors.LightBlue,
              }}>
              <Text style={{...Styles.txtTitle, marginTop: 278}}>
                {this.state.questions.name}
              </Text>

              <Clickable
                style={{marginTop: 26}}
                onPress={() => {
                  this._onClickValue(this.state.questions.type);
                  this.state.newQuestions = this.state.questions.value;

                  console.error(this.state.questions);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={Styles.txtDropDown}>
                    {this.state.questions.type == 'calendar'
                      ? germanFormatDate(this.state.questions.value)
                      : this.state.questions.value}
                  </Text>
                  <Image
                    source={Images.Dropdown}
                    style={{marginStart: 20}}
                    resizeMode="center"></Image>
                </View>
              </Clickable>
              <Button
                style={{marginTop: 26}}
                onPress={() => {
                  this._apiAlignerUpdate();
                }}
                title={strings.Submit}></Button>
            </View>
          </View>

          {this.state.showPickerDialog && (
            <View style={Styles.containerFullDropDown}>
              <Clickable
                style={{marginStart: 20, height: 25, width: 25, marginTop: 51}}
                onPress={() => {
                  this.setState({
                    showPickerDialog: false,
                    question: this.props.route.params.question,
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
                      minimumDate={new Date()}
                      mode={this.state.dialogType}
                      onDateChange={this._onChange}
                    />
                  )}

                  {this.state.dialogType == dialogPickerTime && (
                    <DatePicker
                      style={{
                        backgroundColor: Colors.LightBlue,
                        width: '100%',
                        alignSelf: 'center',
                      }}
                      minimumDate={this.state.minimumDate}
                      date={this.state.selectedDate}
                      maximumDate={this.state.maximum}
                      mode={this.state.dialogType}
                      onDateChange={this._onChange}
                    />
                  )}
                  <Button
                    style={{marginTop: 26}}
                    onPress={() => {
                      this.state.questions.value = this.state.newQuestions;
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
                    question: this.props.route.params.question,
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
                    Select no. of jaw?
                  </Text>
                  <Picker
                    style={{flex: 1, backgroundColor: Colors.LightBlue}}
                    selectedValue={parseInt(this.state.questions.value)}
                    pickerData={numberOfJaws}
                    onValueChange={(value) => {
                      this.state.newQuestions = value;
                    }}
                  />
                  <Button
                    style={{marginTop: 26}}
                    onPress={() => {
                      this.state.questions.value = this.state.newQuestions;
                      this.setState({
                        dropDownPickerDialog: false,
                      });
                    }}
                    title={strings.Submit}></Button>
                </View>
              </View>
            </View>
          )}
          <RenderFooter typeImage={1}></RenderFooter>

          <FloatingButton></FloatingButton>
        </View>
      </>
    );
  }

  _submitQuestions() {}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default UpdateQuestion;
