import React, { Component } from 'react'
import { Text, View, Platform, KeyboardAvoidingView } from 'react-native'

export default class RNKeyboardAvoidingView extends Component {
    render() {
        return (

            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ android: undefined, ios: 'padding' })}>

                {this.props.children}
            </KeyboardAvoidingView>

        )
    }
}
