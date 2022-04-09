import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StatusBar
} from 'react-native';
import {
    ScrollContainer,
    Button,
} from '../../common';
import { connect } from 'react-redux';
import { strings } from '../../../language/Language';

import { Colors, Images, } from '../../../utils';

// import { SafeAreaView } from 'react-navigation';
import CommonStyles from '../../common/CommonStyles';

import styles from '../Styles/Aligner.styles';
import { string } from 'prop-types';



//import PermissionWebview from '../../../webview/native/PermissionWebview';
import { videoLink } from '../../../network/ApiConstants';

/**
 * 
 *  <PermissionWebview 
        style={{flex: 1}}
        mediaPlaybackRequiresUserAction={false}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        source={{uri: videoLink}} 
        sourceUri={videoLink} 
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
      />
 */

class VideoCall extends Component {
   
    
    render() {
        return (
            <View style={CommonStyles.flex1style}>
                <ScrollContainer>
                    <View style={{ ...CommonStyles.flex1style, backgroundColor: Colors.Defaultwhite, }}>
                   
                    </View>
                </ScrollContainer>
            </View>
        )
    }
}


export default VideoCall;
