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
import {  SUBMIT_DENTIST_PAIN, GET_QUIZ,SAVE_QUIZ } from '../../../network/ApiConstants';
import ApiService, { METHOD } from '../../../network/ApiService';
import ImageSlider from 'react-native-image-slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FlatList } from 'react-native-gesture-handler';
import { getItem, getLanugageName, setItem } from '../../../data/PrefUtils';
import { store } from '../../../App';
import { setactivetabnumber } from '../../../actions/CommonActions';
import Navigator from '../../../navigation/Navigator';
import { string } from 'prop-types';
import ConfirmButton from '../../common/ConfirmButton';
import { USER } from '../../../data/PrefKeys';
import ProgressLoader from 'react-native-loading-spinner-overlay';
import FloatingButton from '../../Home/ChildComponent/FloatingButton';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ConfirmSelfies extends Component {


    constructor(props){
        super(props)
        this.state={
            spinner:false,
            aligner:this.props.route.params.aligner,
            title:this.props.route.params.title,
            questions :[],
            selectedPos:-1,
            selectedQuestion:[],
           }
    }
    
    componentDidMount(){
        this._componentgetQuestionRequest() 
    }


   async _componentgetQuestionRequest(){
       let url =  GET_QUIZ 
        ApiService(url , {}, (res) => {
            this.setState({
                questions:res.data.data,
                selectedPos:0,
                spinner: false
            });
           }, (error) => {
            this.setState({
                spinner: false
            });
                Utils.showDangerToast(error)
            }, METHOD.GET
            )



    }
  
    async _apiStopTreatment() {
        this.setState({
            spinner: true
        });
        let params =
        {
            'pain': 'yes',
        }
        ApiService(SUBMIT_DENTIST_PAIN, params, (res) => {
           this.props.navigation.navigate('ContactDentist');
            this.setState({
                spinner: !this.state.spinner
            });
        }, (error) => {
       
            Utils.showDangerToast(error)
            this.setState({
                
                spinner: !this.state.spinner
            });

        }, METHOD.POST
        )
    }

    async _apiNoTreatment() {
        this.setState({
            spinner: true
        });
        let params =
        {
            'pain': 'no',
        }
        ApiService(SUBMIT_DENTIST_PAIN, params, (res) => {
            Navigator.push('SelfiesFrontView',{
                'aligner':this.state.aligner,
                'title':this.state.title,
            });

            this.setState({
                spinner: !this.state.spinner
            });
        }, (error) => {
            Utils.showDangerToast(error)
            this.setState({
                spinner: !this.state.spinner
            });
        }, METHOD.POST
        )
    }

  async  _setValue(selectedValue){
        if(this.state.selectedPos< this.state.questions.length-1){
         console.log("POSITION")
         console.log(this.state.selectedPos.toString())
         var selectedQuestion=this.state.questions[this.state.selectedPos];
        var obj={"type":selectedQuestion.type,"answer":selectedValue,"question_id":selectedQuestion.id}
        this.state.selectedQuestion.push(obj)
        this.setState({
            selectedPos:this.state.selectedPos+1
        })
    }else{
        var selectedQuestion=this.state.questions[this.state.selectedPos];
        var obj={"type":selectedQuestion.type,"answer":selectedValue,"question_id":selectedQuestion.id}
        this.state.selectedQuestion.push(obj)

        console.log("NOT POSITION")
         console.log(this.state.selectedPos.toString())
         let userInfo = JSON.parse(await getItem(USER))
         var params={"user_quiz":JSON.stringify(this.state.selectedQuestion),"user_id": userInfo.id}
      console.log(userInfo)
      let param = {  }
    console.log(params.toString())
        ApiService(SAVE_QUIZ, params, (res) => {
            if(res.data.message == 'Added Successfully'){
                AsyncStorage.setItem('Question','1')
                this.props.navigation.navigate('SelfiesFrontView',{
                    'aligner':this.state.aligner,
                    'title':this.state.title,
                });
                // Navigator.push('SelfiesFrontView',{
                //     'aligner':this.state.aligner,
                //     'title':this.state.title,
                // });
            }else{

              this.props.navigation.navigate('ContactDentist',{"message":res.data.message});  
            }
       
            this.setState({
                spinner: false
            });
        }, (error) => {
            Utils.showDangerToast(error)
            this.setState({
                spinner: false
            });
        }, METHOD.POST
        )

    }
    }
    render() {
        return (
        


            <>

        <View style={{ ...Styles.mainContainer, backgroundColor: Colors.BG_Pink }}>
         
         <View style={{ ...Styles.mainContainer, backgroundColor: Colors.BG_Pink }}>
                
                <Clickable style={{ marginStart: 20, height: 25, width: 25,marginTop:51, }} onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Image source={Images.BackIcon}   style={{width:25,height:25}} ></Image>
                        </Clickable>
               
                {
                    this.state.selectedPos >=0 && (
                   
                   <View style={{ ...Styles.mainContainer, backgroundColor: Colors.BG_Pink }}>

                        <View style={Styles.container}>
                        <Text style={Styles.txtTitle}> {this.state.questions[this.state.selectedPos].question}</Text>
                        <ConfirmButton style={{ marginTop: 26, marginHorizontal: 37 }}
                            onPress={() => {
                                    
                                this._setValue(this.state.questions[this.state.selectedPos].eng_option_a)
                            }}
                            title={this.state.questions[this.state.selectedPos].option_a}></ConfirmButton>
    
                        <ConfirmButton style={{ marginTop: 26, marginHorizontal: 37 }}
                            onPress={() => {
                                this._setValue(this.state.questions[this.state.selectedPos].eng_option_b)
                            }}
                            title={this.state.questions[this.state.selectedPos].option_b}></ConfirmButton>
                    </View>
                    <View style={{ flex: 1, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                        <ProgressLoader
                            style={{ fontFamily: FontName.simibold }}
                            visible={this.state.spinner}
                            textContent={''}
                        />
                    </View>
                    </View>
                    )
                }
               

            </View>
           
                 
            </View>

            <View
        style={{
          backgroundColor: Colors.FooterColor,
          height: DeviceInfo.hasNotch() ? 85 : 70,
          flexDirection: 'row',
         
         paddingHorizontal:5,
          paddingBottom: DeviceInfo.hasNotch() ? 20 : 5,
        }}>

        <Clickable
          style={{
            ...CommonStyles.flex1style,
            ...CommonStyles.ContentCenterstyle,
          }}
          onPress={() => {
            
            this.props.navigation.navigate('Theethselfies', )

            // this.checkLogin(1);
          }}>
          <Image
            style={{alignSelf: 'center', width: 32, height: 32}}
            resizeMode={'contain'}
            source={Images.MenuHomeUnselect}></Image>
        </Clickable>
        <Clickable
          style={{
            ...CommonStyles.flex1style,
            ...CommonStyles.ContentCenterstyle,
          }}
          onPress={() => {
            this.props.navigation.navigate('ConfirmSelfies')


            // this.checkLogin(2);
            // console.log(
            //   'dsahbadjsab',
            //   store.getState().common.active_tab_number,
            // );
          }}>
          <Image
            style={{alignSelf: 'center', width: 35, height: 28}}
            resizeMode={'stretch'}
            source={Images.MenuCameraSelected}></Image>
        </Clickable>
        <Clickable
          style={{
            ...CommonStyles.flex1style,
            ...CommonStyles.ContentCenterstyle,
          }}
          onPress={() => {
            AsyncStorage.getItem('ISUSERLOGIN').then((login)=>{
              if(login == '1'){
                this.props.navigation.navigate('Setting')
              }else{
                this.props.navigation.navigate('Login')
              }
            })
            // this.checkLogin(4);
          }}>
          <Image
            style={{alignSelf: 'center', width: 32, height: 28}}
            resizeMode={'contain'}
            source={Images.MenuUser}></Image>
        </Clickable>

        <Clickable
          style={{
            ...CommonStyles.flex1style,
            ...CommonStyles.ContentCenterstyle,
          }}
          onPress={() => {
            // this.props.navigation.navigate('Login')

            // this.checkLogin(4);
          }}>
          <Image
            style={{alignSelf: 'center', width: 32, height: 28}}
            resizeMode={'contain'}
            source={Images.MenuUser}></Image>
        </Clickable>

        <FloatingButton/>
   
   
   
      </View>
            </>
        )
    }

}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default ConfirmSelfies;
