import React, {Component, Fragment} from 'react';

import {View, Text, Image, ScrollView, FlatList, StatusBar, TouchableOpacity} from 'react-native';
import {Clickable, Button, ScrollContainer} from '../../common';
import {connect} from 'react-redux';
import {strings} from '../../../language/Language';
import {Images, FontName, FontSize, Colors, Utils} from '../../../utils';
// import {NavigationEvents} from 'react-navigation';
import CommonStyles from '../../common/CommonStyles';
import Styles from '../Styles/ProgressSelfies.styles';
import {PROGRESS_SELFIES} from '../../../network/ApiConstants';
import {GET_TEETH_SELFIES} from '../../../network/ApiConstants';
import ApiService, {METHOD} from '../../../network/ApiService';
import ImagePicker from 'react-native-image-picker';
import {germanFormatDate, germanParseFormatDate} from '../../../utils/Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import FloatingButton from '../../Home/ChildComponent/FloatingButton';

var VIEW_ADD = 1;
var VIEW_UPLOAD = 2;
var VIEW_NEXT = 3;
var Lastitem = 0;
const data = [
  {
    title: 'Take your teeth selfies',
    desc:
      'Get ipsum is simply dummy text of the printing and typesetting industry.',
    image: Images.Tutorial1,
  },
];
class AlignerProgressSelfies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onPress: this.props,
      progressSelfiesData: [],
      spinner: false,
      currentAligner: 0,
      Lastitemtitle:0,
      uploadselfiescheck:0,
    };
  }

  componentDidMount() {
    this._apiMyProgressSelfies();
  }
  componentWillUnmount() {
    this.setState({
      progressSelfiesData: [],
    });
  }
  _renderFoot = ({item, index}) => {

    // console.log(item);
    return (
      <Clickable
        onPress={async () => {
          if (this.state.uploadselfiescheck  == 1) {
           this.props.navigation.navigate('SelfiesFrontView', {
              aligner: 'aligner',
              title: 'title',
            });
          } 
          else {
            Utils.showDangerToast('Cant upload before 4 Weeks')

            // this.props.navigation.navigate('ConfirmSelfies', {
            //   aligner: this.state.currentAligner,
            //   title: item.title,
            // });


          }
        }}>
        <View style={{marginHorizontal: 20, }}>
          <Text style={Styles.txtCellTitle}>{Lastitem + 4 + ' ' + strings.week}</Text>
          <View style={Styles.selfieItem}>
            <View>
              <Image
                source={Images.Selfie}
                style={{height: 60, width: 60, resizeMode: 'contain'}}
                resizeMode="contain"></Image>
            </View>

            <Text style={Styles.txtCellBoldName}>{strings.takeSelfie}</Text>
          </View>
        </View>
      </Clickable>
    );
  };
  
  _renderItems = ({item, index}) => {
  
    let i = item.title 
    if(i == 'before_treatment_selfies'){

    } else{
      // this.setState({Lastitemtitle : i})
      Lastitem = i
    }  
    // console.log(item, '-=-=-=-=-=-=');
    return (
      <Clickable
        onPress={async () => {
          
            if (
              item.upload_date.length != 0 &&
              item.status.toString() == '0' &&
              item.upload_date == Utils.progresscurrentDate()
            ) {
              this.props.navigation.navigate('ConfirmSelfies', {
              aligner: this.state.currentAligner,
              title: item.title,
            });
            } else {
              if (item.status == 1) {
                //   Utils.showDangerToast('')
              } else {
               
                if (item.teeth_selfies.length == 0) {
                  this.props.navigation.navigate('SelfiesFrontView', {
                    aligner: 'aligner',
                    title: 'title',
                  });
                  // console.error(item.upload_date);
                  // let date = germanParseFormatDate(item.upload_date);
                  // Utils.showDangerToast(
                  //   'You cannot upload the selfie before the date ' + date,
                  // );
                }
              }
            }
        }}>
      {/* <Clickable
      onPress={async () => {
        if (this.state.progressSelfiesData.length > 0) {
          Navigator.push('SelfiesFrontView', {
            aligner: 'aligner',
            title: 'title',
          });
        } else {
          Navigator.push('ConfirmSelfies', {
            aligner: this.state.currentAligner,
            title: item.title,
          });
        }
      }}> */}
        <View style={{marginHorizontal: 20,  }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={Styles.txtCellTitle}>
            {''}  {item.title == 'before_treatment_selfies'? strings.beforeTreatment:item.title + ' ' + strings.week}
            </Text>
          </View>
          <View style={Styles.selfieItem}>
            <View>
              <Image
                source={
                  item.teeth_selfies.length == 0 ? Images.Selfie : Images.tick
                }
                style={{height: 60, width: 60, resizeMode: 'contain'}}
                resizeMode="contain"></Image>
            </View>

            <Text
              style={
                item.teeth_selfies.length == 0
                  ? Styles.txtCellBoldName
                  : Styles.txtCellName
              }>
              {item.teeth_selfies.length == 0
                ? strings.takeSelfie
                : strings.selfieTaken}
            </Text>
          </View>
        </View>
      </Clickable>
    );
  };





  _apiMyProgressSelfies() {

    this.setState({
      spinner: true,
    });
    ApiService(
      PROGRESS_SELFIES,
      {},
      (res) => {
        // this.calltemp()
       
        console.log(JSON.stringify(res.data.data));
        this.state.progressSelfiesData = res.data.data;
        
        // alert(JSON.stringify(res.data))
        this.setState({
          progressSelfiesData: res.data.data,
          spinner: false,
          currentAligner: res.data.aligner.current_aligner,
        });
        // alert(JSON.stringify(res.data.data[0].teeth_selfies[0].created_at))
       
         date = res.data.data[0].teeth_selfies[0].created_at
        //  alert(date)

         var str = date
         var cyear = str.substring(0, 4); 
         var cday = str.substring(8, 10);
        var cmon = str.substring(5, 7); 

        // alert(cyear+''+cmon+''+cday)
        let month;
        if(cmon == 12){
          month = 'December'
        }else if(cmon == 11){
          month = 'November'

          
        }else if(cmon == 10){
          month = 'October'

          
        }else if(cmon == 9){
          month = 'September'

          
        }else if(cmon == 8){
          month = 'August'

          
        }else if(cmon == 7){
          month = 'July'

          
        }else if(cmon == 6){
          month = 'June'

          
        }else if(cmon == 5){
          month = 'May'

          
        }else if(cmon == 4){
          month = 'April'

          
        }else if(cmon == 3){
          month = 'March'

          
        }else if(cmon == 2){
          month = 'February'

          
        }else {
          month = 'January'

          
        }

          
        var msDiff =   new Date().getTime() -new Date(month+"-"+cday+"-"+cyear).getTime(); //Future date - current date
var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
console.log(daysTill30June2035);

if(daysTill30June2035 >= 28){
            this.setState({uploadselfiescheck:1})

}else{
            this.setState({uploadselfiescheck:0})
// Utils.showDangerToast('Cannot upload selfies before 4  Weeks')
}





        // AsyncStorage.getItem('Date').then((startdate)=>{
        //   // alert(startdate)
        //   let enddate  =  new Date();
       
        //   if(enddate >=  startdate){
            // this.setState({uploadselfiescheck:1})

      
        
   
   // res value is "ell"
        // alert(res4+'------'+ndate.getDay())
// alert(res5+ res3 + res4)


      
// const end   = new Date(2011, 5, 5);
// const range = moment.range(start, end);

// range.diff('months'); // 3
// range.diff('days');   // 92
        


        // this.setState({uploadselfiescheck: res.data.data})
        // for(var i=0 ; i<=this.state.progressSelfiesData.length;i++ ){
        //   let lastelement= this.state.progressSelfiesData[i].title;
        //   if(i == this.state.progressSelfiesData.length-1){
        //     this.setState({Lastitemtitle :lastelement+4})
      
        //   }
        // }
        // console.log(res.data.data);
      },
      (error) => {
        Utils.showDangerToast(error);
        this.setState({
          spinner: !this.state.spinner,
        });
      },
      METHOD.GET,
    );
  }
  render() {
    return (
      <View style={{...CommonStyles.flex1style, ...Styles.container}}>
        <ScrollContainer>
          <View style={{width: '100%'}}>
            <Text style={Styles.txtTitle}> {strings.progressSelfies}</Text>
            <Text style={Styles.txtDesc}> {strings.remindSelfiesWeeks}</Text>
            <Image
              source={Images.SELFIEICON}
              style={{flex: 1, height: 320, width: '100%'}}
              resizeMode={'cover'}></Image>
             
            <FlatList
              horizontal
              style={{marginTop: 20}}
              showsHorizontalScrollIndicator={false}
              data={this.state.progressSelfiesData}
              renderItem={this._renderItems}
              keyExtractor={(item, index) => 'key' + index}
              ListFooterComponent={this._renderFoot}
            />
          </View>
        </ScrollContainer>









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
            
            this.props.navigation.navigate('MainAligner' )

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
            // this.props.navigation.navigate('Login')


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
            // this.props.navigation.navigate('Login')

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
      </View>
    );
  }
}

export default AlignerProgressSelfies;
