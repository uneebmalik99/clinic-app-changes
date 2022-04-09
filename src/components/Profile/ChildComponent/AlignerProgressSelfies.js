import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    Dimensions,
    Modal,
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
import CommonStyles from '../../common/CommonStyles';
import Styles from '../Styles/AlignerProgressSelfies.styles'
import { ALIGNERINFO_PROGRESS_SELFIES } from '../../../network/ApiConstants';
import ApiService, { METHOD } from '../../../network/ApiService';
import ImagePicker from 'react-native-image-picker';
import { FlatList } from 'react-native-gesture-handler';
import { string } from 'prop-types';
import RenderFooter from '../../Home/ChildComponent/RenderFooter';
import FloatingButton from '../../Home/ChildComponent/FloatingButton';
import {GET_TEETH_SELFIES} from '../../../network/ApiConstants';
import Slideshow from 'react-native-image-slider-show';
import AntDesign from 'react-native-vector-icons/AntDesign';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

var VIEW_ADD = 1;
var VIEW_UPLOAD = 2;
var VIEW_NEXT = 3;
const data = [
    {
        title: 'Take your teeth selfies',
        desc: 'Get ipsum is simply dummy text of the printing and typesetting industry.',
        image: Images.Tutorial1,
    }
];
class AlignerProgressSelfies extends Component {

    state = {
        progressSelfiesData: [],
        spinner: false,
        imagesmodal: false,
        images:[],
    }
    componentDidMount(){
     this._calltemp()


       
        
    }

    componentWillUnmount() {
        this.setState({
            progressSelfiesData: [],
        })
    }

    _renderItems = ({ item, index }) => {
        return (        
                <View style={{ marginHorizontal: 20 }} >
                    <Text style={Styles.txtCellTitle}>{  (4*(index+1))+' '+strings.week }</Text>
                    <Clickable 
                    onPress={()=>  {   
                        this.setState({images:d})                  
                        let d = []
                        for(var v= 0; v < item.progress_selfies.length ; v++){
                            d.push({ url:item.progress_selfies[v].image})
                        }
                        this.setState({ images: d})
                        this.setState({ imagesmodal:true})
                    }}
                    style={Styles.selfieItem}>
                    <Text style={(Styles.txtCellName)}>{(item.progress_selfies.length==0? '0 photos':"Selfies Taken")}</Text>
                        <View style={{marginTop:5,}}>
                            {/* <Image source={ (item.progress_selfies.length==0? Images.FontTeethSelfies:item.progress_selfies.image)} style={{ height:   100, width:  (item.progress_selfies.length==0? 100: 60), resizeMode: 'contain' }} resizeMode='contain' ></Image> */}
                            <Image  source={{uri: item.progress_selfies.length > 0 ? item.progress_selfies[0].image:Images.FontTeethSelfies}} style={{ height:   100, width:  (item.progress_selfies.length==0? 100: 60), resizeMode: 'contain' }} resizeMode='contain' ></Image>
                        </View>
                    </Clickable>
                </View>
        );
    };

    _calltemp(){
        ApiService(
          GET_TEETH_SELFIES,
          {},
          (res) => {
              let data1 = res.data.data
              alert(JSON.stringify(res.data.data))
            //   alert(JSON.stringify(data1))
                //   for (var i = 1 ; i< this.state.progressSelfiesData.length+1 ; i++){
                //     if(this.state.progressSelfiesData[i-1].aligner == 'Aligner '+i){
                //         let img = [];
                //         for(var o = 0; o< data1.length; o++){
                //             if(data1[o].aligner == i){
                //               let h =  data1[o];
                //               console.log(h);
                //               img.push(h)
                //             }
                //         }
                //         this.state.progressSelfiesData[i-1].progress_selfies = img
                //     }
                //   }        
            // console.log('-----'+JSON.stringify(this.state.progressSelfiesData));  
            
            
            this._apiMyProgressSelfies(data1)

          },
          (error) => {
            alert(error)
    
            Utils.showDangerToast(error);
            this.setState({
              spinner: !this.state.spinner,
            });
          },
          METHOD.GET,
        );
    
      }

    _apiMyProgressSelfies(data1) {
        this.setState({
            spinner: false
        })
        ApiService(ALIGNERINFO_PROGRESS_SELFIES, {}, (res) => {
            let progressData=[];
            if(progressData.length==0){
                for(var i =0; i< res.data.aligner.total_aligner; i++ ){              
                    let progressSelfiesData=[];
                    for(var j =0; j< res.data.data.length; j++){
                        if(res.data.data[j].aligner == (i+1).toString()){
                            progressSelfiesData.push(res.data.data[j])
                        }
                    }
                    let data={
                        'aligner':('Aligner '+(i+1)),
                        'progress_selfies':progressSelfiesData,
                    }        
                    progressData.push(data)
                }
            }
            // console.log(progressData);
            // console.log(JSON.stringify(res.data))
// alert(progressData.length)
// else
// {
    for (var i = 1 ; i< progressData.length+1 ; i++){
                    if(progressData[i-1].aligner == 'Aligner '+i){
                        let img = [];
                        for(var o = 0; o< data1.length; o++){
                            if(data1[o].aligner == i){
                              let h =  data1[o];
                              console.log(h);
                              img.push(h)
                            }
                        }
                        progressData[i-1].progress_selfies = img
                    }
                  }   
                // }   

            this.setState({
                progressSelfiesData: progressData,
                spinner: false
            })
        }, (error) => {
            Utils.showDangerToast(error)
            this.setState({
                spinner: !this.state.spinner
            });
        }, METHOD.GET
        )

    }
    render() {
        return (
                            
            <>
  
         <View style={{ ...CommonStyles.flex1style, ...Styles.container }}>
                {/* <NavigationEvents onDidFocus={async () => {
                    await this.componentDidMount()
                }} /> */}
                <ScrollContainer>

 <Modal
  transparent={false}
  visible={this.state.imagesmodal}

 >

     <View style={{backgroundColor:'black',paddingVertical:50,}}>

         <Clickable 
         onPress={()=> {this.setState({imagesmodal:false})}}
         style={{marginHorizontal:20, alignSelf:'flex-end', }}>
                <AntDesign  name='closecircleo'  size={30} color={'red'}/>
     </Clickable>

<View style={{justifyContent:'center',height:'100%',width:'100%', backgroundColor:'black',
 alignSelf:'center', alignItems:'center'}}>

 

<Slideshow 
height={deviceHeight*0.85}
    //   dataSource={[
    //     { url:'http://placeimg.com/640/480/any' },
    //     { url:'http://placeimg.com/640/480/any' },
    //     { url:'http://placeimg.com/640/480/any' }
    // ]}
    dataSource={this.state.images}
    
    />

</View>
</View>

</Modal>
                <Clickable style={{ marginStart: 20, height: 25, width: 25,marginTop:51, }} onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Image source={Images.BackIcon}   style={{width:25,height:25}} ></Image>
                        </Clickable>
                   <Text style={Styles.txtTitle}> {strings.progressSelfies}</Text>
                        <Text style={Styles.txtDesc}> {strings.remindSelfiesWeeks}</Text>
                      
                    <View >
                            <FlatList
                                style={{ marginTop:20 }}
                                showsHorizontalScrollIndicator={false}
                                data={this.state.progressSelfiesData}
                                renderItem={this._renderItems}
                                extraData={this.state.progressSelfiesData}
                                keyExtractor={(item, index) => "key" + index}
                            />
                    </View>

                </ScrollContainer>
               
            </View>
            </>
        )
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default AlignerProgressSelfies;
