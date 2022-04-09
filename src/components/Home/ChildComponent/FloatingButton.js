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
  Linking,
  Dimensions,
  ImageBackground,
  Platform,
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
import {strings} from '../../../language/Language';
import {FloatingMenu} from 'react-native-floating-action-menu';
import ActionButton from 'react-native-action-button';

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
import { FloatingAction } from 'react-native-floating-action';

const actions = [{
  text: '',
  icon: Images.ContactMessenger,
  name: 'bt_accessibility',
  position: 1
},
{
  text: '',
  icon:  Images.ContactWhatsapp,
  name: 'bt_accessibility',
  position: 2
},
{
  text: '',
  icon: Images.ContactEmail,
  name: 'bt_accessibility',
  position: 3
},

 ]

const items = [
  {label: '', image: Images.ContactMessenger},
  {label: '', image: Images.ContactWhatsapp},
  {label: '', image: Images.ContactEmail},
];
class FloatingButton extends Component {
  state = {
    isMenuOpen: false,
  };

  handleMenuToggle = (isMenuOpen) => this.setState({isMenuOpen});

  handleItemPress = (item, index) => {
    if (index == 0) {
      Linking.openURL('mailto:info@smileunion.de');
    } else if (index == 1) {
      Linking.openURL('whatsapp://send?phone=+4915792453234');
    } else if (index == 2) {
      Linking.openURL('fb-messenger://user-thread/104163511228899/');
    }

    this.setState({
      isMenuOpen: false,
    });
    console.log('pressed item', item);
  };

  renderMenuIcon = (menuState) => {
    return this.state.isMenuOpen ? (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          // backgroundColor:'green',
          backgroundColor: Colors.FooterColor,
          borderRadius: Platform.OS == 'ios'?  60 / 2: 500/2,
          height: 70,
          width: 70,
          marginBottom:Platform.OS == 'android'? 10:0
        }}>
        <Image
          style={{
            height: 25,
            width: 60,
            marginBottom:6,
            resizeMode: 'cover',
          }}
          resizeMode="contain"
          source={Images.ContactCross}
        />
      </View>
    ) : (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: Colors.PINK,
          justifyContent: 'center',
          height: 65,
          width: 75,
          resizeMode: 'contain',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          paddingBottom:15,
          marginBottom:-5,
        }}>
        <Image
          style={{
            height: 32,
            width: 75,
            backgroundColor: Colors.PINK,
            resizeMode: 'contain',
          }}
          resizeMode="contain"
          source={Images.ContactMessages}
        />
      </View>
    );
  };



  renderItemIcon = (item, index, menuState) => {
    return (
      <Image
        style={{
          height:60,
          
          width: 60,
          resizeMode:'contain',
        }}
        source={item.image}
        resizeMode="contain"
      />
    );
  };

  render() {
    return (
      <View
        style={{
          ...CommonStyles.containerMainDropDownBg,
          width: '100%',
          ...Platform.select({
            ios: {
              flex: 1,
            },
            android: {
              height: '100%',
            },
          }),
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          paddingBottom: 3,
          marginBottom:Platform.OS == 'ios'? 0:6,
          
        }}>

   
   
        <FloatingMenu
          isOpen={this.state.isMenuOpen}
          items={items}
          backgroundUpColor='#0001'
          borderColor='#0001'
          position={'bottom-right'}
                // overlayColor={'#00FF00'}
                dimmerStyle={{backgroundColor:'#00001'}}
            
          bottom={DeviceInfo.hasNotch() ? 16 : -1}
          renderMenuIcon={this.renderMenuIcon}
          renderItemIcon={this.renderItemIcon}
          onMenuToggle={this.handleMenuToggle}
          onItemPress={this.handleItemPress}
        />
      
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default FloatingButton;
