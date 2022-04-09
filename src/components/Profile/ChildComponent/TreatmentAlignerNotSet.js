import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
} from 'react-native';
import {
    ScrollContainer,
    Button,
} from '../../common';
import { connect } from 'react-redux';
import { strings } from '../../../language/Language';
import { Colors, Images, } from '../../../utils';
import CommonStyles from '../../common/CommonStyles';
import styles from '../Styles/Aligner.styles';
import { string } from 'prop-types';
class TreatmentAlignerNotSet extends Component {
    state = {
        routes: [
        ],
    };
    render() {
        return (
            <View style={CommonStyles.flex1style}>
                <ScrollContainer>
                    <View style={{ ...CommonStyles.flex1style, backgroundColor: Colors.Defaultwhite, }}>
                        <Text style={styles.txtAlignerCount}>{strings.aligner + ''} </Text>
                        <Text style={styles.txtDays} >{''}</Text>
                        <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center', marginHorizontal: 17, marginTop: 11 }}>
                            <Text style={styles.txtWeekName}>M</Text>
                            <Text style={styles.txtWeekName}>T</Text>
                            <Text style={styles.txtWeekName}>W</Text>
                            <Text style={styles.txtWeekName}>T</Text>
                            <Text style={styles.txtWeekName}>F</Text>
                            <Text style={styles.txtWeekName}>S</Text>
                            <Text style={styles.txtWeekName} >S</Text>
                        </View>
                        <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center', marginHorizontal: 17 }}>
                            <Text style={styles.txtWeekDays}>14</Text>
                            <Text style={styles.txtWeekDays}>15</Text>
                            <Text style={styles.txtWeekDays}>16</Text>
                            <Text style={styles.txtWeekDays}>17</Text>
                            <Text style={styles.txtWeekDays}>18</Text>
                            <Text style={styles.txtWeekDays}>19</Text>
                            <Text style={styles.txtWeekDays} >20</Text>
                        </View>
                        <View style={{ marginTop: 24, backgroundColor: Colors.LightBlue, flex: 1, flexDirection: 'column', paddingHorizontal: 37 }} >
                            <Text style={{ ...styles.txtDailyTracker }}>{strings.DailyTracker}</Text>
                            <Text style={{ ...styles.txtTimeCounter }}>00:00:00</Text>
                            <Text style={{ ...styles.txtTimeLeft }}>{strings.TimeLeftToday}</Text>
                            <View style={styles.outer_circle}>
                                <View style={styles.inner_circle}>
                                </View>
                            </View>
                           
                        </View>
                    </View>
                </ScrollContainer>
            </View>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TreatmentAlignerNotSet);
