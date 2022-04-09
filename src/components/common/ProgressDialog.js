import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    ActivityIndicator
} from 'react-native';

import Dialog, { DialogContent } from 'react-native-popup-dialog'
import { Utils } from '../../utils';

const ProgressDialog = props => {
    const {
        loading,
        dialogTitle,
        ...attributes
    } = props;

    return (
        <Dialog
            dialogStyle={styles.styleDialogContent}
            footer={null}
            visible={loading}>

            <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator
                    style={{ alignSelf: 'center' }}
                    size='large' color='#111111' />
                {
                    dialogTitle && !Utils.isEmpty(dialogTitle)

                        ?
                        <View style={styles.declredView}>
                            <Text style={styles.declaredtitle}> {dialogTitle} </Text>
                        </View>

                        :

                        null

                }

            </View>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    styleDialogContent: {
        padding: 10,

        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    activityIndicatorWrapper: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    declredView: {
        backgroundColor: Colors.Defaultwhite,
        justifyContent: 'center',
        alignItems: 'center',
    },
    declaredtitle: {
        color: Colors.DarkGreyColor,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize17,
        marginTop: 24
    },
});

export default ProgressDialog;