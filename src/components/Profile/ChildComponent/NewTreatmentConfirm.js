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
import { strings } from '../../../language/Language';
import { Images, FontName, FontSize, Colors, Utils } from '../../../utils';
// import { NavigationEvents } from 'react-navigation';
import RenderFooter from '../../Home/ChildComponent/RenderFooter';
import CommonStyles from '../../common/CommonStyles';
import Styles from '../Styles/TeethSelfies.styles'
import {  SUBMIT_DENTIST_PAIN } from '../../../network/ApiConstants';
import ApiService, { METHOD } from '../../../network/ApiService';
import ImageSlider from 'react-native-image-slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FlatList } from 'react-native-gesture-handler';
import { getItem, setItem } from '../../../data/PrefUtils';
import { store } from '../../../App';
import { setactivetabnumber } from '../../../actions/CommonActions';
import Navigator from '../../../navigation/Navigator';
import { string } from 'prop-types';
import ConfirmButton from '../../common/ConfirmButton';
import { USER } from '../../../data/PrefKeys';
import FloatingButton from '../../Home/ChildComponent/FloatingButton';


class NewTreatmentConfirm extends Component {



    render() {
        return (
            <>
  
          

            <View  style={{ ...Styles.mainContainer, backgroundColor: Colors.BG_Pink }}>


            <View style={{ ...Styles.mainContainer, backgroundColor: Colors.BG_Pink }}>
                  <Clickable style={{ marginStart: 20, height: 25, width: 25, marginTop:20,}} onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Image source={Images.BackIcon}   style={{width:25,height:25}} ></Image>
                </Clickable>
               
                <View style={Styles.container}>
                    <Text style={Styles.txtTitle}> {strings.new_treatment}</Text>
                    <ConfirmButton style={{ marginTop: 26, marginHorizontal: 37 }}
                        onPress={() => {
                              this.props.navigation.navigate("TeethSelfies");
                        }}
                        title={strings.yes}></ConfirmButton>
                    <ConfirmButton style={{ marginTop: 26, marginHorizontal: 37 }}
                        onPress={() => {
                            Navigator.push("TeethSelfies",this.props.navigation.getParam("alignerQuestions"));
                        }}
                        title={strings.no}></ConfirmButton>
                </View>
             </View>
             <RenderFooter
                    typeImage={4}
                >
                </RenderFooter>

                <FloatingButton>
                    
                    </FloatingButton>
          
            </View>
            </>
        )
    }

}

export default NewTreatmentConfirm;
