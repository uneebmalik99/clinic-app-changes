import React, { Component } from 'react';
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
    Button,
    Clickable,
    EditText,
    ProgressDialog,
} from '../../common';
import { connect } from 'react-redux';
import Navigator from '../../../navigation/Navigator';
import { strings } from '../../../language/Language';

import { Images, FontName, FontSize, Colors, Utils } from '../../../utils';

// import { NavigationEvents, SafeAreaView } from 'react-navigation';
import CommonStyles from '../../common/CommonStyles';
class RenderHeader extends Component {



    render() {

        return (
            <View style={{backgroundColor: Colors.providerBackgroundColor, height: 58,flexDirection:"row" }}>
                <Clickable style={{...CommonStyles.flex1style,flexDirection:"row",}} onPress = {this.props.onPress}>
                    <Image style={{marginLeft:20,alignSelf:'center' }} source={Images.Back_brown}></Image>
                    <Text style={{marginLeft:20,alignSelf:'center',fontSize:20,color:Colors.borderBottomColor}}>{ this.props.headerTitle} </Text>
                </Clickable>
              
            </View>

        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RenderHeader);
