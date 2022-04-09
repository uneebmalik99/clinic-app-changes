import React, {Component} from 'react';
import {View, Text, Image, SafeAreaView, StatusBar} from 'react-native';
import {ScrollContainer, Button, Clickable} from '../../common';
import {connect} from 'react-redux';
import {Colors, Images, Utils} from '../../../utils';
// import {DrawerActions} from 'react-navigation';
import CommonStyles from '../../common/CommonStyles';
import styles from '../Styles/Aligner.styles';
import ApiService, {METHOD} from '../../../network/ApiService';
import {
  ALIGNER_INFO,
  END_TIMER,
  START_TIMER,
  STOP_TIMER,
} from '../../../network/ApiConstants';
import {FlatList} from 'react-native-gesture-handler';
import Aligner from './Aligner';
import TreatmentAlignerNotSet from './TreatmentAlignerNotSet';
import BackgroundTimer from 'react-native-background-timer';
import {USER} from '../../../data/PrefKeys';
import {getItem} from '../../../data/PrefUtils';
import {strings} from '../../../language/Language';

class MainAligner extends Component {
  state = {
    alignerData: [],
    trackerTime: '',
    currentAligner: '',
    treatmentStartDate: '',
    timerStart: false,
    totalAligner: '',
    totalDaysPending: '',
    treatmentstop: false,
    isTreatmentStart: false,
    timerId: 0,
  };

  _resetData() {
    this._endTimer();
    this.setState({
      alignerData: [],
      trackerTime: '',
      currentAligner: '',
      timerStart: false,
      totalAligner: '',
      totalDaysPending: '',
      isTreatmentStart: false,
    });
    this._myAlignerInfoApi();
  }
  async _myAlignerInfoApi() {
    this.setState({
      spinner: false,
    });
    ApiService(
      ALIGNER_INFO,
      {},
      (res) => {
        console.log(res);
        this._setAlignerInfo(res.data.data, res.data.message);
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

  _timerStart() {
    if (this.state.isTreatmentStart) {
      this.setState({
        timerStart: true,
      });

      this.state.timerId = BackgroundTimer.setInterval(() => {
        if (this.state.trackerTime != '00:00:00') {
          let time = Utils.trackerTimer(this.state.trackerTime);
          if (time == '00:00:00') {
            this.setState({
              trackerTime: '00:00:00',
            });
            this._endTimer();
            this._stopTimerApi();
          } else {
            this.setState({
              trackerTime: time,
            });
          }
        }
      }, 1000);
      BackgroundTimer.start();
    } else {
      Utils.showDangerToast('Treatment not started yet');
    }
  }

  _endTimer() {
    this.setState({
      timerStart: false,
    });
    BackgroundTimer.clearInterval(this.state.timerId);
    BackgroundTimer.stop();
  }

  componentDidMount = async () => {
    this._myAlignerInfoApi();
  };

  componentWillUnmount = async () => {
    this._endTimer();
  };

  async _stopTimerApi() {
    this.setState({
      spinner: false,
    });
    let userInfo = JSON.parse(await getItem(USER));
    console.log(userInfo);
    let param = {user_id: userInfo.id};
    ApiService(
      END_TIMER,
      param,
      (res) => {
        this.setState({
          spinner: false,
        });
        this._resetData();
      },
      (error) => {
        Utils.showDangerToast(error);
        this.setState({
          spinner: false,
        });
      },
      METHOD.POST,
    );
  }

  async _startTimer() {
    this.setState({
      spinner: false,
    });
    let param = {start_time: Utils.currentTime()};
    ApiService(
      START_TIMER,
      param,
      (res) => {
        this.setState({
          spinner: false,
        });
        this._timerStart();
      },
      (error) => {
        Utils.showDangerToast(error);
        this.setState({
          spinner: false,
        });
      },
      METHOD.POST,
    );
  }

  async _stopTimer(leftTime) {
    this.setState({
      spinner: false,
    });
    let param = {end_time: Utils.currentTime(), left_time: leftTime};
    ApiService(
      STOP_TIMER,
      param,
      (res) => {
        this.setState({
          spinner: false,
        });
        this._endTimer();
      },
      (error) => {
        Utils.showDangerToast(error);
        this.setState({
          spinner: false,
        });
      },
      METHOD.POST,
    );
  }

  _setAlignerInfo(data, message) {
    var dailyReport = data.dailyreport;
    this.state.treatmentstop = data.treatmentstop;
    var switchAligner = data.switch_aligner;
    let userTreatmentPlan = data.user_treatment_plan;
    this.state.currentAligner = userTreatmentPlan.current_aligner;
    if (
      parseInt(userTreatmentPlan.upper_jaw) <
      parseInt(userTreatmentPlan.lower_jaw)
    ) {
      this.state.totalAligner = userTreatmentPlan.lower_jaw;
    } else {
      this.state.totalAligner = userTreatmentPlan.upper_jaw;
    }
    this.state.totalDaysPending =
      userTreatmentPlan.left_days + ' ' + strings.perfectSmile;
    var lastDate = '';
    this.state.isTreatmentStart = false;
    for (var i = 0; i < dailyReport.length; i++) {
      dailyReport[i].weekName = Utils.formatWeekObject(dailyReport[i].date); /// Week Name
      dailyReport[i].showDate = Utils.formatCurrentObject(dailyReport[i].date); /// Date
      lastDate = dailyReport[i].date;
      if (dailyReport[i].date_status == 'today') {
        ///  comparing date is today
        this.state.trackerTime = dailyReport[i].time;
        if (this.state.trackerTime == '00:00:00') {
          dailyReport[i].goalmissed = 'no';
        } else {
          dailyReport[i].goalmissed = 'notcomplete';
        }
        dailyReport[i].current_date = true;
        this.state.isTreatmentStart = true;
        if (this.state.isTreatmentStart) {
          if (!data.treatmentstop) {
            if (dailyReport[i].status == 1) {
              this._timerStart();
            }
          }
        }
      } else {
        dailyReport[i].current_date = false;
      }
    }

    console.log(dailyReport);
    if (dailyReport.length == 0) {
      /// Aligner should be in future
      var currentDate = Utils.currentDate();
      for (var m = 0; m < userTreatmentPlan.left_days; m++) {
        let showDate = Utils.formatCurrentObject(
          Utils.formatAddDaysObject(currentDate, m + 1),
        );
        let weekName = Utils.formatWeekObject(
          Utils.formatAddDaysObject(currentDate, m + 1),
        );
        var data = {
          weekName: weekName,
          showDate: showDate,
          date: Utils.formatAddDaysObject(currentDate, m + 1),
          aligner: false,
          goalmissed: 'notstart',
        };
        if (data.date == userTreatmentPlan.date) {
          ///  comparing date is today
          data.current_date = false;
        } else {
          data.current_date = false;
        }
        dailyReport.push(data);
      }
    }

    for (i = 0; i < dailyReport.length; i++) {
      for (var j = 0; j < switchAligner.length; j++) {
        if (dailyReport[i].date == switchAligner[j].switch_aligner) {
          /// comparing date with aligner date
          dailyReport[i]['changeAligner'] = true;
          break;
        } else {
          dailyReport[i]['changeAligner'] = false;
        }
      }
    }

    ///   Adding 4 days to checking the values
    this.setState({
      alignerData: dailyReport,
      trackerTime: this.state.trackerTime,
      currentAligner: this.state.currentAligner,
      totalAligner: this.state.totalAligner,
      totalDaysPending: this.state.totalDaysPending,
      treatmentstop: this.state.treatmentstop,
    });

    this.state.treatmentStartDate = message;
    this.setState({
      treatmentStartDate: this.state.treatmentStartDate,
    });
  }

  _renderItems = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'column',
        }}>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={styles.txtWeekName}>{item.weekName}</Text>
        </View>

        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text
            style={
              item.current_date
                ? styles.txtSelectedWeekDays
                : styles.txtWeekDays
            }>
            {item.showDate}
          </Text>
          {item.changeAligner && (
            <Image
              source={Images.AlignerTeeth}
              style={{height: 22, width: 18}}
              resizeMode="contain"></Image>
          )}
          {item.goalmissed === 'no' && (
            <Image
              source={Images.CHECK}
              style={{height: 22, width: 18}}
              resizeMode="contain"></Image>
          )}
          {(Utils.isEmpty(item.goalmissed) || item.goalmissed == 'yes') &&
            item.date_status != 'future' && (
              <Image
                source={Images.AlignerCross}
                style={{height: 22, width: 18}}
                resizeMode="contain"></Image>
            )}
        </View>
      </View>
    );
  };

  renderElement() {
    if (this.state.trackerTime) {
      return (
        <View
          style={{
            backgroundColor: Colors.LightBlue,
            flex: 1,
            flexDirection: 'column',
            paddingHorizontal: 37,
            marginTop: 11,
          }}>
          <Text style={{...styles.txtDailyTracker, color: Colors.PureBlack}}>
            {strings.DailyTracker}
          </Text>
          <Text style={{...styles.txtTimeCounter, color: Colors.PureBlack}}>
            {this.state.trackerTime ? this.state.trackerTime : '00:00:00'}
          </Text>
          <Text style={{...styles.txtTimeLeft, color: Colors.PureBlack}}>
            {strings.TimeLeftToday}
          </Text>

          <Clickable
            onPress={() => {
              console.error(this.state.timerStart);

              if (this.state.treatmentstop) {
                Utils.showDangerToast(strings.treatment_stopped);
              } else {
                if (this.state.trackerTime) {
                  if (this.state.trackerTime != '00:00:00') {
                    if (this.state.timerStart) {
                      this._stopTimer(this.state.trackerTime);
                    } else {
                      this._startTimer();
                    }
                  }
                }
              }
            }}>
            <View style={styles.outer_circle}>
              <View
                style={{...styles.inner_circle, backgroundColor: Colors.PINK}}>
                <Text style={styles.txtStart}>
                  {this.state.trackerTime == '00:00:00'
                    ? strings.completed
                    : this.state.timerStart
                    ? strings.stop
                    : strings.start}
                </Text>
              </View>
            </View>
          </Clickable>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                source={Images.tick}
                style={{height: 22, width: 22}}
                resizeMode="contain"></Image>
              <Text
                style={{
                  ...styles.txtStatus,
                  marginStart: 15,
                  color: Colors.PureBlack,
                }}>
                {strings.goalReached}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Image
                source={Images.AlignerCross}
                style={{height: 18, width: 22}}
                resizeMode="contain"></Image>
              <Text
                style={{
                  ...styles.txtStatus,
                  marginStart: 15,
                  color: Colors.PureBlack,
                }}>
                {strings.treatmentGoalMissed}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Image
                source={Images.AlignerTeeth}
                style={{height: 22, width: 22}}
                resizeMode="contain"></Image>
              <Text
                style={{
                  ...styles.txtStatus,
                  marginStart: 15,
                  color: Colors.PureBlack,
                }}>
                {strings.switch_aligner}
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            marginTop: 24,
            backgroundColor: Colors.LightBlue,
            flex: 1,
            flexDirection: 'column',
            paddingHorizontal: 37,
          }}>
          <Text style={{...styles.txtDailyTracker}}>{strings.goalReached}</Text>
          <Text style={{...styles.txtTimeCounter}}>{'00:00:00'}</Text>
          <Text style={{...styles.txtTimeLeft}}>{strings.TimeLeftToday}</Text>
          <View style={styles.outer_circle}>
            <View style={styles.inner_circle}></View>
          </View>
        </View>
      );
    }
  }

  _loadView() {
    return (
      <View style={{flex: 1}}>
        <ScrollContainer>
          <View
            style={{
              ...CommonStyles.flex1style,
              backgroundColor: Colors.Defaultwhite,
            }}>
            <Text style={styles.txtAlignerCount}>
              {strings.aligner +
                ' ' +
                this.state.currentAligner +
                '/' +
                this.state.totalAligner}
            </Text>
            <Text style={styles.txtDays}>
              {this.state.treatmentstop
                ? strings.treatment_stopped
                : this.state.trackerTime
                ? this.state.totalDaysPending
                : this.state.treatmentStartDate}{' '}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}>
              <FlatList
                horizontal
                style={{marginHorizontal: 20, marginTop: 10}}
                data={this.state.alignerData}
                renderItem={this._renderItems}
                //Setting the number of column
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            {this.renderElement()}
          </View>
        </ScrollContainer>
      </View>
    );
  }
  _renderWeekNameItems = ({item, index}) => {
    return (
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Text style={styles.txtWeekName}>{item.weekName}</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={CommonStyles.flex1style}>
        {this.state.alignerData.length == 0 ? (
          <TreatmentAlignerNotSet />
        ) : (
          this._loadView()
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainAligner);
