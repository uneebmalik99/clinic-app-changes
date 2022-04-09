import React, { Component } from 'react'
import {  View } from 'react-native'
import RNKeyboardAvoidingView from './KeyboardAvoidingView';
import { CustomHeader } from '.';

export class ScrollContainer extends Component {
    render() {
        return (
            
            <RNKeyboardAvoidingView >
                {this.props.header?<CustomHeader {...this.props.header}/>:null}
               <View style={{flex:1}}>
                {this.props.children}
                </View>
            </RNKeyboardAvoidingView>
           
        )
    }
}

export default ScrollContainer
