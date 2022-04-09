import React, { Component ,useRef} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    TouchableOpacity,
    TextInput,
    FlatList,
    Dimensions,
    ImageBackground,
} from 'react-native';
import {
    MainContainer,
    ScrollContainer,
    FloatingEditText,
    Button,
    Clickable,
    EditText,
    ProgressDialog,
} from '../../common';
import { connect } from 'react-redux';

import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo
} from 'react-native-twilio-video-webrtc';
import { Images } from '../../../utils';
// import { NavigationEvents } from 'react-navigation';
import ApiService, { METHOD } from '../../../network/ApiService';
import { getItem } from '../../../data/PrefUtils';
import { USER } from '../../../data/PrefKeys';
import { END_VIDEO_CALL } from '../../../network/ApiConstants';


class DoctorVideoCall extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      isAudioEnable:true,
      isVideoEnable:true,
      status:"disconnected",
      participants:new Map(),
      videoTracks:new Map(),
      token:this.props.route.params.token,
      twilioRef:React.createRef()
    }
  
  }

    
    _setIsAudioEnabled(status){
      this.setState({
        isAudioEnable:status
      })
    }

    _setIsVideoEnable(status){
        this.setState({
          isVideoEnable:status
        })
    }

    _setStatus(status){
      this.setState({
        status:status
      })
    }

    _setVideoTrack(tracks){
      this.setState({
        videoTracks:tracks
      })
    }

    _setToken(token){
      this.setState({
        token:token
      })
    }

   _onConnectButtonPress = () => {
    
   this.state.twilioRef.current.connect({ accessToken: this.state.token});
    this._setStatus('connecting');
  }
  
   _onEndButtonPress = () => {
    this.videoCallCompletedApi()
    this.state.twilioRef.current.disconnect();
    this.props.navigation.goBack();
  };

   _onMuteButtonPress = () => {
    this.state.twilioRef.current
      .setLocalAudioEnabled(!this.state.isAudioEnable)
      .then(isEnabled => this._setIsAudioEnabled(isEnabled));
  };

   _onFlipButtonPress = () => {
    this.state.twilioRef.current.flipCamera();
  };

   _onRoomDidConnect = ({roomName, error}) => {
    console.log('onRoomDidConnect: ', roomName);
    this._setStatus('connected');
  };

   _onRoomDidDisconnect = ({ roomName, error }) => {
    console.log('[Disconnect]ERROR: ', error);

    this._setStatus('disconnected');
  };

   _onRoomDidFailToConnect = error => {
    console.log('[FailToConnect]ERROR: ', error);
    this._setStatus('disconnected');
  };

   _onParticipantAddedVideoTrack = ({ participant, track }) => {
    console.log('onParticipantAddedVideoTrack: ', participant, track);
    this._setVideoTrack(
      new Map([
        ...this.state.videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ]),
    );
  };

   _onParticipantRemovedVideoTrack = ({ participant, track }) => {
    console.log('onParticipantRemovedVideoTrack: ', participant, track);
    const videoTracksLocal = this.state.videoTracks;
    videoTracksLocal.delete(track.trackSid);
    this._setVideoTrack(videoTracksLocal);
  };


  componentDidMount = () => {
    // alert("frsf")
    if(this.state.status == "disconnected"){
      this.state.twilioRef.current.connect({ accessToken: this.state.token});
      this._setStatus('connecting');
    }
  }

  async videoCallCompletedApi (){
    let userInfo = JSON.parse(await getItem(USER))
     let param = { "user_id": userInfo.id }
      ApiService(END_VIDEO_CALL, param, (res) => {
        console.log("-------------->")
        console.log(res)
      }, (error) => {
     
  }, METHOD.POST
  )
   }

   componentWillUnmount() {  
    this.videoCallCompletedApi()
    this.state.twilioRef.current.disconnect();
   
   }

   
    render() {
      return (
       
     
        <View style={{
          flex: 1,
          backgroundColor: "black",
        }}>



        {
          this.state.status === 'disconnected' &&
          <View>
          
            <Button
              title="Connect"
              style={{
        marginTop: 100,
  
              }}
              onPress={
                          
                this._onConnectButtonPress}>
            </Button>
          </View>
        }
        {
          (this.state.status === 'connected' || this.state.status === 'connecting') &&
            <View style={{
              flex: 1,
              position: "absolute",
              bottom: 0,
              top: 0,
              left: 0,
              right: 0,
            }}>
            {
              this.state.status === 'connected' &&
              <View style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
              }}>
                {
                  Array.from(this.state.videoTracks, ([trackSid, trackIdentifier]) => {
                    return (
                      <TwilioVideoParticipantView
                        style={{
                         
                          width: "100%",
                          height: "100%",
                        }}
                        key={trackSid}
                        trackIdentifier={trackIdentifier}
                      />
                    )
                  })
                }
              </View>
            }
             <TwilioVideoLocalView
                enabled={true}
                style={{
                  flex: 1,
                  marginStart:10,
                  marginTop:10,
                  position: "absolute",
                  width: 100,
                  height: 160,
                  position: "absolute",
                  borderRadius:5,
                  shadowRadius:5,
                }}
              />
            <View
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                right: 0,
                height: 100,
                flexDirection: "row",
                alignItems: "center",
              }}>
              


<View
              style={{
                position: "absolute",
                height:100,
                bottom: 0,
                left:0,
                right:0,
                flex:2,flexDirection:"row",justifyContent:'space-between',padding:10,
                }}>
           
           <View style={{flex:2,padding:10,alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity
                style={{ width: 57, height: 57,}}
                onPress={this._onEndButtonPress}>
                    <Image source={Images.EndCall} style={{ width: 57, height: 57,  }} resizeMode='stretch' />
              </TouchableOpacity>
              </View>
              <View style={{flex:2,padding:10,alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity
                style={{
                  width: 57, height: 57,
                }}
                onPress={this._onMuteButtonPress}>
                    <Image source={this.state.isAudioEnable? Images.MuteCall:Images.UnmuteCall} style={{ width: 57, height: 57,  }} resizeMode='stretch' />
              </TouchableOpacity>
            </View>
            <View style={{flex:2,padding:10,alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity
                style={{
                  width: 57, height: 57,
                }}
                onPress={this._onFlipButtonPress}>
                     <Image source={Images.FlipCamera} style={{ width: 57, height: 57,  }} resizeMode='stretch' />
 </TouchableOpacity>
            </View>
            </View>
          </View>
            </View>
        }
  
        <TwilioVideo
        ref = {this.state.twilioRef}
        onRoomDidConnect={ this._onRoomDidConnect }
          onRoomDidDisconnect={ this._onRoomDidDisconnect }
          onRoomDidFailToConnect= { this._onRoomDidFailToConnect }
          onParticipantAddedVideoTrack={ this._onParticipantAddedVideoTrack }
          onParticipantRemovedVideoTrack= { this._onParticipantRemovedVideoTrack }
        />
        {/* <NavigationEvents onDidFocus={async () => {
          await this.componentDidMount()
      }} /> */}
      </View>
  
      )
    }
  }
  

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default DoctorVideoCall;
