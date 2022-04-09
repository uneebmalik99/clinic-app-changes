import React, { Component } from 'react'
import { Image,Dimensions,ScrollView, StatusBar, View, ImageBackground, Text, TouchableHighlight,SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../../actions/CommonActions'
import { Colors, Images, Utils } from '../../../utils';
import { Button, Clickable, EditText } from '../../common';
import { strings } from '../../../language/Language';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonStyles from '../../common/CommonStyles';
import styles from '../Style/Location.styles';
import ApiService, { METHOD } from '../../../network/ApiService';
import { setItem } from '../../../data/PrefUtils';
import { IS_LOCATION_VALID, ADDRESS } from '../../../data/PrefKeys';
import ImageSlider from 'react-native-image-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const deviceHeight = Dimensions.get("window").height;
export const deviceWidth = Dimensions.get("window").width;
import { Pages } from 'react-native-pages';

import { SliderBox } from "react-native-image-slider-box";
import { TouchableOpacity } from 'react-native-gesture-handler';

class TutorialScreen extends Component {


  state = {
    selectedIndex:0

};

  navigationLoginPage = () => {
    AsyncStorage.setItem('Firsttime', '1');
    // this.props.navigation.navigate("Welcome")
    this.props.navigation.navigate("ChooseLanguage")
    
 
  }

  componentDidMount() {

  }


  render() {

   
   
    const data = [
      {
        title: strings.tutorialTitle1,
        desc: strings.tutorialDesc1,
        image: Images.Tutorial1,
      },
      {
        title: strings.tutorialTitle2,
        desc: strings.tutorialDesc2,
        image: Images.Tutorial2,
      }, {
        title: strings.tutorialTitle3,
        desc: strings.tutorialDesc3,
        image: Images.Tutorial3,
      }
    ];
    const data2 = [
      
       Images.Tutorial1,
    
       Images.Tutorial2,
      
        Images.Tutorial3,
      
    ];
    return (

        <View style={{height:deviceHeight, width:deviceWidth}}>

        



       <ImageSlider 
          images={data}
          loop={false}
          style={{width:deviceWidth, height:'100%'}}
          
          customSlide={({ index, item, style, width, height }) => (
            // It's important to put style here because it's got offset inside
            <View key={index} style={[style, styles.customSlide],{width:width , height:height}}>
              <Image source={item.image} style={{width:deviceWidth, height:"100%"}} resizeMethod='resize' resizeMode='stretch' ></Image>
              <View style={{ position: 'absolute', justifyContent: 'flex-end', flex: 1, alignItems: 'center', bottom: 131,width:"100%", paddingStart: 31, paddingEnd: 31 }}>
                <Text style={styles.tutorialTitle}>{item.title}</Text>
                <Text style={styles.tutorialDesc}>{item.desc}</Text>
              </View>
            </View>
          )
        }
        
      
        onPositionChanged={(position)=>{

          this.setState({

            selectedIndex:position
          })
        }}

          customButtons={(position, move) => (
         

            <View style={styles.buttons}>
              {data.map((image, index) => {
              

                if (position === index) {
                  return (
                    <View style={styles.buttonSelected}>
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.buttonUnSelected}>
                    </View>
                  );
                };


              })}
            </View>
          )}
        /> 

     <View style={{...CommonStyles.topMargin, position: 'absolute',flexDirection:'row',width:deviceWidth ,justifyContent:'space-between', paddingHorizontal:20 }}>
       
       {this.state.selectedIndex == 1 ?
        <Clickable onPress={() => {
          this.props.navigation.push('TutorialScreen')
           
              }}>

                <Ionicons name='arrow-back-circle'color='white' style={{alignSelf:'center'}} size={45}/>
              
                    </Clickable>
            :
            this.state.selectedIndex == 2 ?
            <Clickable onPress={() => {
              this.props.navigation.push('TutorialScreen')

            }}>

              <Ionicons name='arrow-back-circle' style={{alignSelf:'center'}} color='white' size={45}/>
            
                  </Clickable>
                  :
            <View>
              </View>}


            {
              this.state.selectedIndex==2? 
              <Clickable onPress={() => {
                this.navigationLoginPage()
              }}>
              <Image
              source={Images.IcNext}
                    style={{
                        width: 40,
                        height: 40,
                      }}
                      resizeMode='contain'
                    />
                    </Clickable>
         
              :
              <Clickable onPress={() => {
                this.navigationLoginPage()
              }}>
              <Text style={styles.buttonSkip}>{ (this.state.selectedIndex==2?strings.next:strings.skip)}</Text>
              </Clickable>
            }
           
        </View> 
              </View>

    )
  }
}

const mapStateToProps = (state) => {

  return {
    maplatlongaddress: state.common.maplatlongaddress
  }
}

const mapDispatchToProps = {}

export default TutorialScreen

