import React from 'react';

import { Button as NativeButton, Body, Text } from 'native-base';
import { Colors, FontName, FontSize } from '../../utils';

export default ConfirmButton = (props) => {
    const { style, onPress, disabled, bordered, disableAllCaps,width } = props
    const button = {
        backgroundColor: bordered ? "#FF000000" : disabled ? Colors.BG_Pink : Colors.BG_Pink,
        height: 52,
        width:width ?width : null,
        borderColor: bordered ? Colors.PINK : Colors.PINK,
        borderRadius:0,
        borderWidth:1,
    }
    const textStyle = {
        color: bordered ? Colors.PINK : Colors.PINK,
        fontFamily: FontName.medium,
        fontSize: FontSize.fontSize16,
    }

    return (
        <NativeButton bordered={bordered} disabled={disabled} onPress={onPress} style={{ ...button, ...style, ...{ elevation: 0 } }}>
            <Body>
                <Text style={textStyle}>{disableAllCaps ? props.title : props.title}</Text>
            </Body>
        </NativeButton>
    );



}