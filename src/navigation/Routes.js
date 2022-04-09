import wrapNavigator from './wrapNavigator';
import React, {Component} from 'react';

import Splash from '../components/Splash/Splash'; //1
import ChooseLanguage from '../components/Intro/ChildComponent/ChooseLanguage'; //2
import TutorialScreen from '../components/Intro/ChildComponent/TutorialScreen'; //3

import Login from '../components/Home/ChildComponent/Login';
import Register from '../components/Home/ChildComponent/Register';
import ForgotPassword from '../components/Home/ChildComponent/ForgotPassword';
import VerificationCode from '../components/Home/ChildComponent/VerificationCode';
import Home from '../components/Home/ChildComponent/Home';
import Aligner from '../components/Profile/ChildComponent/Aligner';
import PatientQuestion from '../components/Profile/ChildComponent/PatientQuestion';
import ConfirmSelfies from '../components/Profile/ChildComponent/ConfirmSelfies';
import SelfiesFrontView from '../components/Profile/ChildComponent/teeth_selfie/SelfiesClosedTeeth';
import ContactDentist from '../components/Profile/ChildComponent/ContactDentist';
import ProgressSelfies from '../components/Profile/ChildComponent/ProgressSelfies';
import TeethSelfies from '../components/Profile/ChildComponent/TeethSelfies';
import SelfiesFrontViewSlightlyOpen from '../components/Profile/ChildComponent/teeth_selfie/SlightlyOpen';
import SelfieFrontUpperJawSupervision from '../components/Profile/ChildComponent/teeth_selfie/UpperJaw';
import SelfiesFrontViewMandilarSupervision from '../components/Profile/ChildComponent/teeth_selfie/MandibularSupervision';
import LaterallyClosedLeftSide from '../components/Profile/ChildComponent/teeth_selfie/LaterallyClosedLeftSide';
import LaterallyClosedRightSide from '../components/Profile/ChildComponent/teeth_selfie/LaterallyClosedRightSide';
import UploadSuccessTeethSelfies from '../components/Profile/ChildComponent/teeth_selfie/UploadSuccessTeethSelfies';
import EditProfile from '../components/Profile/ChildComponent/EditProfile';
import Setting from '../components/Profile/ChildComponent/Setting';
import NotificationSetting from '../components/Profile/ChildComponent/NotificationSetting';
import NewTreatmentConfirm from '../components/Profile/ChildComponent/NewTreatmentConfirm';
import UpdateQuestion from '../components/Home/ChildComponent/UpdateQuestion';
import ProfileUpdate from '../components/Home/ChildComponent/ProfileUpdate';
import AlignerProgressSelfies from '../components/Profile/ChildComponent/AlignerProgressSelfies';
import DoctorChat from '../components/Home/ChildComponent/DoctorChat';
import VideoCall from '../components/Profile/ChildComponent/VideoCall';
import ResetTeethSelfies from '../components/Profile/ChildComponent/ResetTeethSelfies';
import UserDrawerNavigator from '../components/Home/ChildComponent/UserDrawerNavigator';
import MandibularSupervisionMenu from '../components/Profile/ChildComponent/teeth_selfie/MandibularSupervisionMenu';
import UpperJawMenu from '../components/Profile/ChildComponent/teeth_selfie/UpperJawMenu';
import LaterallyClosedLeftSideNavigatorMenu from '../components/Profile/ChildComponent/teeth_selfie/LaterallyClosedLeftSideMenu';
import SlightlyOpenMenu from '../components/Profile/ChildComponent/teeth_selfie/SlightlyOpenMenu';
import LaterallyClosedRightSideNavigatorMenu from '../components/Profile/ChildComponent/teeth_selfie/LaterallyClosedRightSideMenu';
import SelfiesClosedTeethMenu from '../components/Profile/ChildComponent/teeth_selfie/SelfiesClosedTeethMenu';
import UploadSuccessTeethSelfiesMenu from '../components/Profile/ChildComponent/teeth_selfie/UploadSuccessTeethSelfiesMenu';
import ContactDentistNavigator from '../components/Profile/ChildComponent/ContactDentistNavigator';
import DoctorVideoCall from '../components/Home/ChildComponent/DoctorVideoCall';
import SelfiesClosedTeeth from '../components/Profile/ChildComponent/teeth_selfie/SelfiesClosedTeeth';
import UpperJaw from '../components/Profile/ChildComponent/teeth_selfie/UpperJaw';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from '../components/Profile/ChildComponent/Welcome';
import Theethselfies from '../components/Profile/ChildComponent/Theethselfies';
import MainAligner from '../components/Profile/ChildComponent/MainAligner';
import Incomingnotification from '../components/Profile/ChildComponent/Incomingnotification';

const Stack = createStackNavigator();

const Navigator =() => {
  return (

    <Stack.Navigator>
      <Stack.Screen name="splash" component={Splash} options={{headerShown:false}} />
      <Stack.Screen name="ChooseLanguage" component={ChooseLanguage} options={{headerShown:false,  gestureEnabled:false}} />
      <Stack.Screen name="TutorialScreen" component={TutorialScreen} options={{headerShown:false ,        animationEnabled: false, gestureEnabled:false}} />
      <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false ,gestureEnabled:false}} />

      <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
      <Stack.Screen name="Register" component={Register} options={{headerShown:false}} />

      <Stack.Screen name="VerificationCode" component={VerificationCode} options={{headerShown:false, gestureEnabled:false}} />
      <Stack.Screen name="Theethselfies" component={Theethselfies} options={{headerShown:false, gestureEnabled:false}} />
      <Stack.Screen name="ConfirmSelfies" component={ConfirmSelfies} options={{headerShown:false}} />


      <Stack.Screen name="ContactDentist" component={ContactDentist} options={{headerShown:false}} />
      <Stack.Screen name="SelfiesFrontView" component={SelfiesFrontView} options={{headerShown:false , gestureEnabled:false}} />
      <Stack.Screen name="SelfiesFrontViewSlightlyOpen" component={SelfiesFrontViewSlightlyOpen} options={{headerShown:false, gestureEnabled:false}} />
      <Stack.Screen name="SelfieFrontUpperJawSupervision" component={SelfieFrontUpperJawSupervision} options={{headerShown:false,  gestureEnabled:false}} /> 
      <Stack.Screen name="SelfiesFrontViewMandilarSupervision" component={SelfiesFrontViewMandilarSupervision} options={{headerShown:false,  gestureEnabled:false}} /> 
      <Stack.Screen name="LaterallyClosedLeftSide" component={LaterallyClosedLeftSide} options={{headerShown:false,  gestureEnabled:false}} /> 
      <Stack.Screen name="LaterallyClosedRightSide" component={LaterallyClosedRightSide} options={{headerShown:false,  gestureEnabled:false}} /> 

      <Stack.Screen name="UploadSuccessTeethSelfies" component={UploadSuccessTeethSelfies} options={{headerShown:false , gestureEnabled:false}} /> 
      <Stack.Screen name="MainAligner" component={MainAligner} options={{headerShown:false, gestureEnabled:false}} /> 
      <Stack.Screen name="PatientQuestion" component={PatientQuestion} options={{headerShown:false}} /> 
      <Stack.Screen name="ProgressSelfies" component={ProgressSelfies} options={{headerShown:false}} /> 


      <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:false}} /> 
      <Stack.Screen name="Setting" component={Setting} options={{headerShown:false}} /> 
      <Stack.Screen name="DoctorChat" component={DoctorChat} options={{headerShown:false}} /> 

      <Stack.Screen name="NotificationSetting" component={NotificationSetting} options={{headerShown:false}} /> 
      <Stack.Screen name="UpdateQuestion" component={UpdateQuestion} options={{headerShown:false}} /> 
      <Stack.Screen name="AlignerProgressSelfies" component={AlignerProgressSelfies} options={{headerShown:false}} /> 
      <Stack.Screen name="DoctorVideoCall" component={DoctorVideoCall} options={{headerShown:false}} /> 
      <Stack.Screen name="VideoCall" component={VideoCall} options={{headerShown:false}} /> 
      <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} options={{headerShown:false}} /> 
      <Stack.Screen name="NewTreatmentConfirm" component={NewTreatmentConfirm} options={{headerShown:false}} /> 
      <Stack.Screen name="Incomingnotification" component={Incomingnotification} options={{headerShown:false}} /> 

      
      
      
      
      
      
    </Stack.Navigator>

  );
}


// const Navigator = createStackNavigator({
//   splash: { screen: Splash },
//   //Intro Part
//   ChooseLanguage: { screen: ChooseLanguage },
//   TutorialScreen: { screen: TutorialScreen },
//   //Home
//   Login: { screen: Login },
//   Register: { screen: Register },
//   VerificationCode: { screen: VerificationCode },
//   ForgotPassword: { screen: ForgotPassword },
//   Home: { screen: Home },
//   StartAligner: { screen: Aligner },
//   PatientQuestion: { screen: PatientQuestion },
//   ConfirmSelfies: { screen: ConfirmSelfies },
//   SelfiesFrontView: { screen: SelfiesClosedTeeth },
//   ContactDentist:{screen: ContactDentist},
//   ProgressSelfies:{screen: ProgressSelfies},
//   TeethSelfies:{screen:ResetTeethSelfies},
//   SelfiesFrontViewSlightlyOpen:{screen:SelfiesFrontViewSlightlyOpen},
//   SelfieFrontUpperJawSupervision:{screen:UpperJaw},
//   SelfiesFrontViewMandilarSupervision:{screen:SelfiesFrontViewMandilarSupervision},
//   LaterallyClosedLeftSide:{screen:LaterallyClosedLeftSide},
//   LaterallyClosedRightSide:{screen:LaterallyClosedRightSide},
//   UploadSuccessTeethSelfies:{screen: UploadSuccessTeethSelfies},
//   EditProfile:{screen:EditProfile},
//   NotificationSetting:{screen:NotificationSetting},
//   NewTreatmentConfirm:{screen:NewTreatmentConfirm},
//   UpdateQuestion:{screen:UpdateQuestion},
//   ProfileUpdate:{screen:ProfileUpdate},
//   AlignerProgressSelfies:{screen:AlignerProgressSelfies},
//   DoctorChat:{screen : DoctorChat},
//   VideoCall:{screen:VideoCall},
//   DoctorVideoCall:{screen:DoctorVideoCall}
// },

//   {
//     initialRouteName: 'ChooseLanguage',
//     headerMode: 'none'
//   });


export default (Navigator);
