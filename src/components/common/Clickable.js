import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'

import { Images, FontName, FontSize, Colors } from '../../utils';

class Clickable extends Component {

    state = {
        disabled: false
    }

    _onPress = () => {

        this.setState({ disabled: true })
        if (this.props.onPress)
            this.props.onPress()
        setTimeout(() => {
            this.setState({ disabled: false })
        }, 1000)
    }

    render() {
        const { children, borderLess, rippleColor, style } = this.props
        return (

            // <ElementButton
            //     iconComponent={}
            //     title={title} textStyle={textStyles} raised={raised} onPress={onPress} outline={outline} containerViewStyle={{ marginLeft: 0, marginRight: 0, flex: flex }} backgroundColor={bgColor} buttonStyle={{ ...bgStyles, ...style, flex: 0 }} />

            Platform.select({
                ios: <TouchableOpacity 
                
                activeOpacity={1}
                disabled={this.state.disabled} style={style} onPress={this._onPress}>
                    {children}
                </TouchableOpacity>,
                android: <TouchableNativeFeedback 
                activeOpacity={1}
                    onPress={this._onPress}>
                    <View style={style}>
                        {children}
                    </View>
                </TouchableNativeFeedback>
            })

        );
    }
}

export default Clickable

