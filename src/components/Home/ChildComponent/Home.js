import React, {Component} from 'react';
import {
  StatusBar,
  Text,
  Image,
  Linking,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import {
  MainContainer,
  ScrollContainer,
  FloatingEditText,
  Button,
  Clickable,
  EditText,
  ProgressDialog,
} from '../../common';
import {connect} from 'react-redux';
import {Images, FontName, FontSize, Colors, Utils} from '../../../utils';
// import {NavigationEvents} from 'react-navigation';
import RenderFooter from './RenderFooter';
import CommonStyles from '../../common/CommonStyles';
// import Hometab from '../../Profile/ChildComponent/Welcome';
import TeethSelfies from '../../Profile/ChildComponent/TeethSelfies';
import ProgressSelfies from '../../Profile/ChildComponent/ProgressSelfies';
import MyProgressSelfies from '../../Profile/ChildComponent/MyProgressSelfies';
import Setting from '../../Profile/ChildComponent/Setting';
import MainAligner from '../../Profile/ChildComponent/MainAligner';
import Aligner from '../../Profile/ChildComponent/Aligner';
import HomeTabSelection from './HomeTabSelection';
import {View} from 'native-base';

import {
  notifications,
  messages,
  NotificationMessage,
  Android,
} from '../../../notifications/index';
import {IS_LOGGED_IN, USER} from '../../../data/PrefKeys';
import {getItem} from '../../../data/PrefUtils';
import {FALSE} from '../../../utils/AppConstants';
import {strings} from '../../../language/Language';
import FloatingButton from './FloatingButton';
import ApiServiceTwilio from '../../../network/ApiServiceTwilio';
import {METHOD} from '../../../network/ApiService';
import { number } from 'prop-types';

class Home extends Component {
  constructor(props) {
  
  
    super(props);
    this.state = {
      toggleOpen: false,
    };
  }
  componentDidMount = async () => {
  };

  _renderImage(tabNumber) {
    console.log(tabNumber, '---0-0-0-');
    if (tabNumber == 1 || tabNumber == 5 || tabNumber == 7 || tabNumber == 8) {
      return 1;
    } else if (tabNumber == 2 || tabNumber == 6) {
      return 2;
    } else if (tabNumber == 3) {
      return 3;
    } else {
      return 4;
    }
  }

  openDrawer() {}

  render() {
  
    return (
      <>
        <View style={{flex: 1}}>
          {/* <NavigationEvents
            onDidFocus={() => {
              console.log(this.props.active_tab_number);
            }}
          /> */}
          {this.props.active_tab_number == 1 ? (
            <HomeTabSelection></HomeTabSelection>
          ) : null}

          {this.props.active_tab_number === 2 ? (
            <ProgressSelfies></ProgressSelfies>
          ) : null}
          {this.props.active_tab_number === 3 ? (
            <MyProgressSelfies></MyProgressSelfies>
          ) : null}
          {this.props.active_tab_number === 4 ? <Setting></Setting> : null}
          {this.props.active_tab_number === 6 ? (
            <MainAligner></MainAligner>
          ) : null}
          {this.props.active_tab_number == 5 ? (
            <TeethSelfies></TeethSelfies>
          ) : null}
          {this.props.active_tab_number == 7 ? <Aligner></Aligner> : null}
          {/* {this.props.active_tab_number === 8 ? <Hometab> </Hometab> : null} */}

          <RenderFooter
            typeImage={this._renderImage(
              this.props.active_tab_number,
            )}></RenderFooter>
          <FloatingButton></FloatingButton>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  
  active_tab_number: state.common.active_tab_number,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
