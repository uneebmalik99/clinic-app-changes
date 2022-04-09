import React from 'react';

import { Button as NativeButton, Body, Text } from 'native-base';
import { Colors, FontName, FontSize } from '../../utils';


export default Button = (props) => {
    const { style, onPress, disabled, bordered, disableAllCaps,width } = props
    const button = {
        backgroundColor: bordered ? "#FF000000" : disabled ? Colors.NormalGreyColor : Colors.PINK,
        height: 52,
        
        width:width ?width : null,
        borderColor: bordered ? Colors.Defaultwhite : Colors.PINK,
        borderRadius:0,
    }
    const textStyle = {
        textAlign:'center',
        color: bordered ? Colors.Defaultwhite : Colors.Defaultwhite,
        fontFamily: FontName.medium,
        fontSize: FontSize.fontSize15,
    }

    return (
        <NativeButton bordered={bordered} disabled={disabled} onPress={onPress} style={{ ...button, ...style, ...{ elevation: 0 } }}>
            <Body>
                <Text style={textStyle}>{disableAllCaps ? props.title : props.title}</Text>
            </Body>
        </NativeButton>
    );



}