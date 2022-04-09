import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {
  MainContainer,
  ScrollContainer,
  Button,
  Clickable,
  EditText,
  ProgressDialog,
} from '../../common';
import {connect} from 'react-redux';
import Navigator from '../../../navigation/Navigator';
import {strings} from '../../../language/Language';
import {FloatingMenu} from 'react-native-floating-action-menu';

import {Images, FontName, FontSize, Colors, Utils} from '../../../utils';

// import {NavigationEvents} from 'react-navigation';
import CommonStyles from '../../common/CommonStyles';
import {store} from '../../../App';
import {setactivetabnumber} from '../../../actions/CommonActions';
import {getItem} from '../../../data/PrefUtils';
import {
  FIRST_SELFIES_UPLOAD_STATUS,
  IS_LOGGED_IN,
  QUESTION_STATUS,
} from '../../../data/PrefKeys';
import DeviceInfo from 'react-native-device-info';
const items = [
  {label: '', image: Images.ContactMessenger},
  {label: '', image: Images.ContactWhatsapp},
  {label: '', image: Images.ContactEmail},
];
class RenderFooter extends Component {
  constructor(props) {
    super(props);
    const {typeImage} = this.props;
    this.state = {
      oldPosition: 0,
      homeIcon: typeImage == 1 ? Images.MenuHome : Images.MenuHomeUnselect,
      cameraIcon:
        typeImage == 2 ? Images.MenuCameraSelected : Images.MenuCamera,
      calendarIcon:
        typeImage == 3 ? Images.MenuCalendarSelect : Images.MenuCalendar,
      isMenuOpen: false,

      profileIcon: typeImage == 4 ? Images.MenuProfileSelect : Images.MenuUser,
    };
  }

  selectCamera() {
    this.setState({
      homeIcon: Images.MenuHomeUnselect,
      cameraIcon: Images.MenuCameraSelected,
      calendarIcon: Images.MenuCalendar,
      profileIcon: Images.MenuUser,
    });
  }

  selectHome() {
    this.setState({
      homeIcon: Images.MenuHome,
      cameraIcon: Images.MenuCamera,
      calendarIcon: Images.MenuCalendar,
      profileIcon: Images.MenuUser,
    });
  }

  selectCalendar() {
    this.setState({
      homeIcon: Images.MenuHomeUnselect,
      cameraIcon: Images.MenuCamera,
      calendarIcon: Images.MenuCalendarSelect,
      profileIcon: Images.MenuUser,
    });
  }

  selectProfile() {
    this.setState({
      homeIcon: Images.MenuHomeUnselect,
      cameraIcon: Images.MenuCamera,
      calendarIcon: Images.MenuCalendar,
      profileIcon: Images.MenuProfileSelect,
    });
  }

  handleMenuToggle = (isMenuOpen) => this.setState({isMenuOpen});

  selectIcon(pos) {
    if (pos == 4) {
      this.selectProfile();
    } else if (pos == 2) {
      this.selectCamera();
    } else if (pos == 3) {
      this.selectCalendar();
    } else {
      this.selectHome();
    }
  }

  async checkHome() {}
  async checkLogin(pos) {
    let logged = await getItem(IS_LOGGED_IN);
    let FIRSTSELFIES = await getItem(FIRST_SELFIES_UPLOAD_STATUS);
    if (logged == 1 && FIRSTSELFIES == '0') {
      /// First Time Login  & Selfies not uploading...
      store.dispatch(setactivetabnumber(5));
      Navigator.navigate('Home');
    } else if (logged == 1 || (pos == 1 && logged == 1)) {
      this.selectIcon(pos);
      let QUESTION = await getItem(QUESTION_STATUS);
      let FIRSTSELFIES = await getItem(FIRST_SELFIES_UPLOAD_STATUS);
      if (pos == 4) {
        if (pos != this.state.oldPosition) {
          store.dispatch(setactivetabnumber(pos));
          Navigator.resetNavigation('Home');
        }
      } else if (FIRSTSELFIES == '0') {
        if (6 != this.state.oldPosition) {
          store.dispatch(setactivetabnumber(5));
          Navigator.resetNavigation('Home');
        }
      } else if (QUESTION == '0') {
        if (7 != this.state.oldPosition) {
          store.dispatch(setactivetabnumber(7));
          Navigator.resetNavigation('Home');
        }
      } else if (QUESTION == '2') {
        if (7 != this.state.oldPosition) {
          store.dispatch(setactivetabnumber(7));
          Navigator.resetNavigation('Home');
        }
      } else if (FIRSTSELFIES == '1' && QUESTION == '1' && pos == 1) {
        if (5 != this.state.oldPosition) {
          store.dispatch(setactivetabnumber(5));
          Navigator.resetNavigation('Home');
        }
      } else {
        if (pos != this.state.oldPosition) {
          store.dispatch(setactivetabnumber(pos));
          Navigator.resetNavigation('Home');
        }
      }
    } else {
      store.dispatch(setactivetabnumber(8));
      Navigator.navigate('Home');
      Navigator.push('Login');
    }
  }

  render() {
    this.state.oldPosition = store.getState().common.active_tab_number;
    return (
      <View
        style={{
          backgroundColor: Colors.FooterColor,
          height: DeviceInfo.hasNotch() ? 85 : 70,
          flexDirection: 'row',
          paddingEnd: 110,
          paddingStart: 15,
          paddingBottom: DeviceInfo.hasNotch() ? 20 : 5,
        }}>
        <Clickable
          style={{
            ...CommonStyles.flex1style,
            ...CommonStyles.ContentCenterstyle,
          }}
          onPress={() => {
            this.checkLogin(1);
          }}>
          <Image
            style={{alignSelf: 'center', width: 32, height: 32}}
            resizeMode={'contain'}
            source={this.state.homeIcon}></Image>
        </Clickable>
        <Clickable
          style={{
            ...CommonStyles.flex1style,
            ...CommonStyles.ContentCenterstyle,
          }}
          onPress={() => {
            this.checkLogin(2);
            console.log(
              'dsahbadjsab',
              store.getState().common.active_tab_number,
            );
          }}>
          <Image
            style={{alignSelf: 'center', width: 35, height: 28}}
            resizeMode={'stretch'}
            source={this.state.cameraIcon}></Image>
        </Clickable>
        <Clickable
          style={{
            ...CommonStyles.flex1style,
            ...CommonStyles.ContentCenterstyle,
          }}
          onPress={() => {
            this.checkLogin(4);
          }}>
          <Image
            style={{alignSelf: 'center', width: 32, height: 28}}
            resizeMode={'contain'}
            source={this.state.profileIcon}></Image>
        </Clickable>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RenderFooter);
