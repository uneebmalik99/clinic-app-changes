import React, { Component } from 'react';

import {
    View,
    Text,
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
import RenderFooter from '../../Home/ChildComponent/RenderFooter';
import FloatingButton from '../../Home/ChildComponent/FloatingButton';
import {getItem} from '../../../data/PrefUtils';
import {
    FIRST_SELFIES_UPLOAD_STATUS,
    IS_LOGGED_IN,
    QUESTION_STATUS,
  } from '../../../data/PrefKeys';
class TeethSelfies extends Component {
    
  
      
      render() {
        return (
            
            <SafeAreaView style={{ ...CommonStyles.flex1style, ...Styles.mainContainer }}>
                <ScrollView>
                  
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
        )
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(TeethSelfies);
