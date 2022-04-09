import React, { Component } from 'react';

import {
    View,
    Text,
    StatusBar,

    Image,
    SafeAreaView,
} from 'react-native';
import {
    Clickable,
    Button,
    ScrollContainer,
} from '../../common';
import { connect } from 'react-redux';
import { strings } from '../../../language/Language'    ;
import { Images, FontName, FontSize, Colors, Utils } from '../../../utils';
// import { NavigationEvents } from 'react-navigation';
import CommonStyles from '../../common/CommonStyles';
import Styles from '../Styles/TeethSelfies.styles'
import { GET_QUESTION } from '../../../network/ApiConstants';
import ApiService, { METHOD } from '../../../network/ApiService';
import ImageSlider from 'react-native-image-slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { setItem } from '../../../data/PrefUtils';
import { store } from '../../../App';
import { setactivetabnumber } from '../../../actions/CommonActions';
import Navigator from '../../../navigation/Navigator';
import { string } from 'prop-types';
class ResetTeethSelfies extends Component {
    render() {
        return (
            <>
            <SafeAreaView style={{ ...CommonStyles.flex1style, ...Styles.mainContainer }}>
                <ScrollView>
              
                <Clickable style={{ marginStart: 20, height: 25, width: 25,marginTop:20, }} onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Image source={Images.BackIcon}   style={{width:25,height:25}} ></Image>
                        </Clickable>
                    <View style={Styles.container}>
                        <Text style={Styles.txtTitle}> {strings.teethSelfies}</Text>
                        <Text style={Styles.txtDesc}> {strings.teethSelfiesDesc}</Text>
                        <Image source={Images.SELFIEICON} style={{ flex: 1, height:320,  width: '100%' }} resizeMode={'cover'}></Image>
                        <Button style={{ marginTop: 26, marginHorizontal: 37 }}
                            onPress={() => {
                           this.props.navigation.navigate("ConfirmSelfies",{ 'aligner':1,
                                'title':'Before Treatment Selfies',
                               })
                            }}
                            title={strings.TakeASelfie}></Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
            </>
        )
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ResetTeethSelfies);
