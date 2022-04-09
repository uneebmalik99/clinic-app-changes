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
    ScrollContainer,
} from '../../common';
import { connect } from 'react-redux';
import { Images, Colors, Utils } from '../../../utils';
// import { NavigationEvents } from 'react-navigation';
import CommonStyles from '../../common/CommonStyles';
import Styles from '../Styles/MyProgressSelfies.styles'
import { GETDAILYGOAL } from '../../../network/ApiConstants';
import ApiService, { METHOD } from '../../../network/ApiService';
import ImagePicker from 'react-native-image-picker';
import { FlatList } from 'react-native-gesture-handler';
import { string } from 'prop-types';
import Animated from 'react-native-reanimated';
import { getStatusName } from '../../../utils/Utils';
import { strings } from '../../../language/Language';

var VIEW_ADD = 1;
var VIEW_UPLOAD = 2;
var VIEW_NEXT = 3;

class MyProgressSelfies extends Component {
    state = {
        dailyGoalData: [],
        spinner: false,
        totalAligner: 0,
        currentAligner: 0,

    }

    _getStatusLabel(item){
        if(item.Today){
            if((item.goalmissed =='no' )){
                return strings.goalReached
            }else if(item.goalmissed =='stop'){
                return strings.treatmentStop
            }else{
                return strings.treatmentInProgres
            }
        }else{
            if(item.goalmissed.length == 0 || item.goalmissed == 'yes'){
                return strings.treatmentGoalMissed
            }else if(item.goalmissed =='stop'){
                return strings.treatmentStop
            }else {
                return strings.goalReached
            }
        }
    }

    _getWidth(item){

        if(item.percentage){

            if(item.percentage>100){
                return '100%'
            }else if(item.percentage<10){
                return '10%'

            } else{
            
        if(item.Today){
            if((item.goalmissed =='no' )){
                 return '100%'
            }else{
                return (item.percentage+'%')
            }
        }else {
            if((item.goalmissed =='no' )){
                return '100%'
            }else{
                return (item.percentage+'%')
            }
        }
    }
    }else{
        return '0%'
    }
    }


    _renderItems = ({ item, index }) => {
        return (
            <View style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text style={Styles.txtDateView} >{ Utils.formatCurrentObject(item.date) }</Text>
                    <Text style={Styles.txtMonthYearView} >{Utils.formatWeekCurrentObject(item.date)}</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center', marginStart: 10 }}>
                    <View style={{ flex: 1, width: 1, backgroundColor: 'black' }} />
                    <Image source={ ( item.Today ?(item.goalmissed =='no'?Images.CHECK: Images.progress):  ( 
                    ( Utils.isEmpty(item.goalmissed) || (item.goalmissed =='yes'))  ?Images.AlignerCross:  Images.tick))} style={{ height: 20, width: 20, resizeMode: 'center', }} ></Image>
                </View>
                <View style={{ flexDirection: 'column', marginHorizontal: 20, flex: 1, alignItems: 'flex-start' }}>
                    <Text style={Styles.txtGoalLabel}>{this._getStatusLabel(item)}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={Styles.progressBar}>
                            <Animated.View style={[StyleSheet.absoluteFill], { backgroundColor: Colors.PINK, width: 
                                this._getWidth(item), borderRadius: 20 / 2 }}>
                            </Animated.View>
                        </View>
                        <Text style={Styles.txtTimeLabel} >{item.time}</Text>
                    </View>
                </View>
            </View>
        );
    };


    componentDidMount() {
        this._apiMyProgressSelfies()
    }





    async _apiMyProgressSelfies() {
        this.setState({
            spinner: false
        })
        ApiService(GETDAILYGOAL, {}, (res) => {
            this.setState({
                dailyGoalData: res.data.data.aligner_records,
                spinner: false,
                currentAligner: res.data.data.aligner_info.current_aligner,
                totalAligner: res.data.data.aligner_info.total_jaw
            })
        }, (error) => {
            Utils.showDangerToast(error)
            this.setState({
                spinner: false
            });

        }, METHOD.GET
        )
    }



    render() {
        return (
            <View style={{ ...CommonStyles.flex1style, ...Styles.mainContainer }}>
             
          
                     <ScrollView>
                    <View style={{...Styles.container,}}>
                        <Text style={Styles.txtTitle}> {strings.myProgress}</Text>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
                            <Text style={{ ...Styles.txtSubTitle, flex: 1 }}> {strings.aligner}</Text>
                            <Text style={Styles.txtSubTitle}> {this.state.currentAligner + '/' + this.state.totalAligner}</Text>
                        </View>
                        {(this.state.dailyGoalData.length == 0 && !this.state.spinner) && (
                            <View style={{justifyContent:'center',alignItems:'center',flex:1,paddingVertical:20}}>
                                <Text style={Styles.txtNoRecord}> {strings.no_record_found}</Text>
                            </View>
                        )}
                        <FlatList
                            style={{ width: '100%',marginTop:15 }}
                            showsHorizontalScrollIndicator={false}
                            data={this.state.dailyGoalData}
                            renderItem={this._renderItems}
                            keyExtractor={(item, index) => "key" + index}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyProgressSelfies);
