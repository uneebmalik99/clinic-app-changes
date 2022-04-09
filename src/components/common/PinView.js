import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { Colors } from '../../utils';


export default class PinView extends Component {

    componentDidMount() {

        const { text } = this.props.text

        if (text != null && text.length == 4) {


            this.setState({
                pin1: text.charAt(0),
                pin2: text.charAt(1),
                pin3: text.charAt(2),
                pin4: text.charAt(3),
            })
        } else {
            this.setState({
                pin1: '',
                pin2: '',
                pin3: '',
                pin4: '',
            })
        }
    }



    state = {
        pin1: '',
        pin2: '',
        pin3: '',
        pin4: '',
        textColor: Colors.grayColor,
        pinStyle: styles.pinStyle
    }

    focusNext = (value, nextRef = undefined, prevRef = undefined) => {


        if (nextRef && value.length >= 1) {
            nextRef.focus();
        } else if (prevRef && value.length === 0) {

            prevRef.focus();
        }
    }

    getValue = () => {

        const { pin1, pin2, pin3, pin4 } = this.state;
        const value = pin1.concat(pin2).concat(pin3).concat(pin4);

        this.props.onChange(value)
    }

    render() {

        const {
            textColor, lineColor
        } = this.props


        // this.setState({
        //     pinStyle: { ...styles.pinStyle, color: textColor }
        // })

        let pinStyle = { ...styles.pinStyle, color: textColor }
        let pinStyle2 = { ...styles.pinStyle, color: textColor }
        let pinStyle3 = { ...styles.pinStyle, color: textColor }
        return (
            <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'center' , alignItems: 'center' }}>

                <TextInput
                    ref='pin1'
                    maxLength={1}
                    keyboardType='numeric'
                    selectionColor={lineColor}
                    onChangeText={(value) => {
                        this.setState({ pin1: value }, () => {
                            this.getValue();

                        })
                        this.focusNext(value, nextRef = this.refs.pin2, null)

                    }}

                    style={pinStyle}
                />
                <TextInput
                    ref='pin2'
                    keyboardType='numeric'
                    onChangeText={(value) => {
                        this.setState({ pin2: value }, () => {
                            this.getValue();
                        })
                        this.focusNext(value, this.refs.pin3, this.refs.pin1)

                    }}
                    selectionColor={lineColor}
                    maxLength={1}
                    style={pinStyle2} />
                <TextInput
                    ref='pin3'
                    keyboardType='numeric'
                    onChangeText={(value) => {
                        this.setState({ pin3: value }, () => {
                            this.getValue();

                        })
                        this.focusNext(value, this.refs.pin4, this.refs.pin2)

                    }}
                    maxLength={1}
                    selectionColor={lineColor}
                    style={pinStyle3} />
                <TextInput
                    ref='pin4'
                    keyboardType='numeric'
                    maxLength={1}
                    selectionColor={lineColor}

                    onChangeText={(value) => {
                        this.setState({ pin4: value }, () => {
                            this.getValue();

                        })
                        this.focusNext(value, null, this.refs.pin3)

                    }}
                    onSubmitEditing={() => {
                        console.log("On Complete 2");
                        this.props.onSubmitEditing()
                    }}

                    style={pinStyle} />

            </View>

        )
    }
}

// const styles = {

//     pinStyle: { width: 50, height: 50, fontSize: 18, paddingTop: 8, paddingBottom: 8, marginEnd: 12, textAlign: 'center', borderBottomWidth: 2, borderBottomColor: Colors.btnGray }
// }

const styles = StyleSheet.flatten({
    pinStyle: { width: 70, 
        height: 50, 
        fontSize: 18, 
        paddingTop: 8, paddingBottom: 8, marginEnd: 12, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: Colors.Backgroundgrey },
    pinStyleEntered: { width: 70, height: 50, fontSize: 18, paddingTop: 8, paddingBottom: 8, marginEnd: 12, textAlign: 'center', borderBottomWidth: 1, borderBottomColor: Colors.secondaryColor }
});
