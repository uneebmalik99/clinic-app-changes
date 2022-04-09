import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    ProgressBarAndroid,
    StyleSheet
} from 'react-native';
import {
    Clickable,
    Button,
    EditText,
    ScrollContainer,
} from '../../common';
import { connect } from 'react-redux';
import { Images, String } from '../../../utils';
// import { NavigationEvents } from 'react-navigation';
import RenderFooter from '../../Home/ChildComponent/RenderFooter';
import CommonStyles from '../../common/CommonStyles';
import Styles from '../Styles/Profile.styles'
import { GET_QUESTION } from '../../../network/ApiConstants';
import ApiService, { METHOD } from '../../../network/ApiService';
import ImagePicker from 'react-native-image-picker';
import { FlatList } from 'react-native-gesture-handler';
import { string } from 'prop-types';
import Animated from 'react-native-reanimated';
import { strings } from '../../../language/Language';
import { Colors, FontName } from '../../../utils';
import FloatingButton from '../../Home/ChildComponent/FloatingButton';

var VIEW_ADD = 1;
var VIEW_UPLOAD = 2;
var VIEW_NEXT = 3;


class EditProfile extends Component {




    render() {
        return (
            <View style={{ ...CommonStyles.flex1style, ...Styles.container }}>

                <ScrollView>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                            <Image source={Images.MenuIcon} style={{ marginTop: 20, marginStart: 20, height: 25, width: 25 }} ></Image>
                            <Text style={Styles.txtTitle}> {'Profile'}</Text>
                            <Image source={Images.close} style={{ marginTop: 20, marginEnd: 20, height: 40, width: 40 }} ></Image>
                        </View>
                        <View style={Styles.profileRound}>
                            <Image source={Images.Profile} style={{ height: 68, width: 68 }} ></Image>
                        </View>
                        <EditText
                            left={Images.user}
                            password
                            onChangeText={(text) => {
                            }}
                            style={{ borderWidth: 1, borderColor: Colors.PINK, alignSelf: 'center', borderRadius: 0, marginTop: 21, backgroundColor: Colors.WHITE_TRANSPARENT,marginHorizontal: 37  }}></EditText>
                         <EditText
                            left={Images.Email}
                            password
                            onChangeText={(text) => {
                            }}
                            style={{ borderWidth: 1, borderColor: Colors.PINK, alignSelf: 'center', borderRadius: 0, marginTop: 21, backgroundColor: Colors.WHITE_TRANSPARENT,marginHorizontal: 37  }}></EditText>
                     
                     <EditText
                            left={Images.Email}
                            password
                            onChangeText={(text) => {
                            }}
                            style={{ borderWidth: 1, borderColor: Colors.PINK, alignSelf: 'center', borderRadius: 0, marginTop: 21, backgroundColor: Colors.WHITE_TRANSPARENT,marginHorizontal: 37  }}></EditText>
                     
                        <Button style={{ marginTop: 41, marginHorizontal: 37 }}
                            onPress={() => { }}
                            title={'Edit Profile'}></Button>

                    </View>
                </ScrollView>
                <RenderFooter/>

                <FloatingButton>
                    
                    </FloatingButton>
            </View>
        )
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
