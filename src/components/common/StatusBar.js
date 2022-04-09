import {
    AppRegistry,
    StyleSheet,
    View,
    StatusBar,
    Platform,
    SafeAreaView
  } from 'react-native';

import React, {Component} from 'react'

export class StatusBar extends Component {
    render() {
        return (
            <View style={[styles.statusBar]}>
            <SafeAreaView>
              {this.props.children}
            </SafeAreaView>
          </View>)
          }
        
        }


export default StatusBar

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    statusBar: {
      height: STATUSBAR_HEIGHT,
      backgroundColor:'#79B45D',
    },
    appBar: {
      backgroundColor:'#79B45D',
      height: APPBAR_HEIGHT,
    },
    content: {
      flex: 1,
      backgroundColor: '#33373B',
    },
  });
