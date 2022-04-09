import React, { Component } from 'react'
import { TextInput, View, Image, Platform, TouchableOpacity, Text } from 'react-native'
import { Icon } from 'native-base';
import { Colors, FontName } from '../../utils';
import { strings } from '../../language/Language';
import English from '../../language/English';


export default class EditText extends Component {

    state= {
        hasFocus: false
    };

    setFocus (hasFocus) {
        this.setState({hasFocus});
    }

    componentDidMount() {
        if (this.props.onRef != null) {
            this.props.onRef(this)
        }
    }

    onSubmitEditing() {
        if (this.props.onSubmitEditing)
            this.props.onSubmitEditing();
    }

    focus() {
        this.textInput.focus()
    }
    

    restrict(event) {
        const regex = new RegExp("^[a-zA-Z]+$");
        const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }

    render() {
        const ios = Platform.OS === 'ios'

        const { style, hint, hintColor, password, maxLength, onChangeText, left,
            right, inputType, textStyle, returnKeyType, blurOnSubmit, onFocus, value, multiline, editable, textAlign, minHeight, rightOnPress, optinal,autoCapitalize , isHashEnable } = this.props

        return (

            <View style={{ ...styles.coontainerStyle, ...style }} >
                {
                    this.renderIcon(left, { borderBottomLeftRadius: 5, borderTopLeftRadius: 5 })
                }

                {
                    isHashEnable && (
                    <Text style={{
                           color:Colors.PureBlack,
                    marginStart:23,
        alignSelf:'center',
        textAlignVertical:'center',
                    alignSelf:'center',
                            fontFamily:FontName.regular,
                                                }}>#</Text>
                                               
                    )
                }

                <TextInput style={{
                    ...styles.textInputStyle, 
                    marginStart:(isHashEnable?2:8),
                    minHeight: minHeight,
                    fontFamily:FontName.regular,
                    textAlignVertical: multiline ? textAlign || 'top' : textAlign || 'center',

                    ...textStyle,
                    borderColor:this.state.hasFocus ?Colors.PureBlack:Colors.PureBlack
                }}
                    onKeyPress={e => {  this.restrict(e) }}
                    placeholder={hint}
                    ref={input => this.textInput = input}
                    selectionColor={'orange'}
                    placeholderTextColor={hintColor ? hintColor : Colors.NormalGreyColor}
                    maxLength={maxLength}
                    value={value}
                    editable={editable}
                    onFocus={this.setFocus.bind(this, true)}
                    onBlur={this.setFocus.bind(this, false)}
                    onSubmitEditing={this.onSubmitEditing.bind(this)}
                    keyboardType={inputType || 'default'}
                    secureTextEntry={password}
                    returnKeyType = {"done"}
                
                    autoCapitalize={autoCapitalize|| 'none'}
                    blurSubmit={blurOnSubmit}
                    onChangeText={(value) => {

                        
                        onChangeText(value)
                    }}
                    multiline={multiline} />
               
               
            </View>


        );
    }

    renderIcon = (icon, radius, rightOnPress,isHashEnable ) => {
            return   (
                <View style={{
                     backgroundColor: icon.bgColor || 'transperant', justifyContent: 'center',
                    alignItems: 'center', ...radius
                }}>
                    <Image source={icon} resizeMode='contain'  style={{ marginStart:14,}} />
                  
              
                </View>
            );

        if (icon && icon.name) {

            return (
                <View style={{
                    width: 40, backgroundColor: icon.bgColor || "#FF000000", justifyContent: 'center',
                    alignItems: 'center', ...radius
                }}>
                    <Icon name={icon.name} style={{ color: icon.color || 'white', fontSize: 20 }} />
                </View>
            );
            // } else if (icon && icon.source) {
            //     return (
            //         <View style={{
            //             width: 40, backgroundColor: icon.bgColor || 'transperant', justifyContent: 'center',
            //             alignItems: 'center', ...radius
            //         }}>
            //             <Image source={icon.source} style={{ width: 10, height: 10 }} />
            //         </View>
            //     );
        } else if (icon && icon.source) {
            console.log("sjdnsjdnsjdnsd")
            return (
                <TouchableOpacity style={{
                    width: 40, backgroundColor: icon.bgColor || 'transperant', justifyContent: 'center',
                    alignItems: 'center', ...radius
                }} onPress={rightOnPress}>
                    <Image source={icon.source} style={{ width: 10, height: 10 }} />
                </TouchableOpacity>
            );
        }
    }
}


// const EditText = ({ style, hint, ref, hintColor, password, maxLength, onChangeText, left, right, inputType, value, multiline, minHeight }) => {

//     const ios = Platform.OS === 'ios'
//     return (



//         <View style={{ ...styles.coontainerStyle, ...style }} >



//             {
//                 renderIcon(left, { borderBottomLeftRadius: 5, borderTopLeftRadius: 5 })
//             }
//             <TextInput style={{ ...styles.textInputStyle, paddingTop: ios ? 12 : 8, paddingBottom: ios ? 12 : 8, minHeight: minHeight, textAlignVertical: multiline ? 'top' : 'center' }}
//                 placeholder={hint}
//                 ref={ref}
//                 selectionColor={'orange'}
//                 placeholderTextColor={hintColor}
//                 maxLength={maxLength}
//                 value={value}
//                 keyboardType={inputType || 'default'}
//                 secureTextEntry={password}
//                 onChangeText={onChangeText}
//                 multiline={multiline} />


//             {
//                 renderIcon(right, { borderBottomRightRadius: 5, borderTopRightRadius: 5 })
//             }
//         </View>


//     );

// }





const styles = {

    coontainerStyle: {
        flexDirection: 'row',
        marginTop: 21,
        height:55,
        justifyContent:'center',
        backgroundColor: '#FF000000',
        borderRadius: 5,

    },
    textInputStyle: {

        flex: 1,
        marginStart: 8
    },

  
}


